import { createCursorLayer, createRemoteCursor } from './cursorElements';
import { parseCursorVisuals } from './cursorVisuals';
import { RemoteCursors } from './remoteCursors';
import type { CursorPacket, CursorPosition } from './cursorPresence';
import { surfaceElement, surfacePath } from './workspaceScroll';

type View = ReturnType<typeof createRemoteCursor>;
export class EditorCursorLayer {
  private readonly layer = createCursorLayer();
  private readonly remote = new RemoteCursors(this.layer.root, editorCursorPoint);
  private readonly views: View[] = [];
  private visuals: ReturnType<typeof parseCursorVisuals> | undefined;
  private readonly redraw = () => this.draw();
  private readonly observer = new ResizeObserver(this.redraw);
  constructor(private readonly frame: () => HTMLIFrameElement | null) {
    window.addEventListener('resize', this.redraw);
    document.addEventListener('scroll', this.redraw, true);
    this.observer.observe(document.body);
  }
  receive(input: unknown) {
    this.visuals = parseCursorVisuals(input);
    this.draw();
  }
  peer(packet: CursorPacket) {
    this.remote.update(packet);
  }
  private draw() {
    this.remote.draw();
    const frame = this.frame();
    const packet = this.visuals;
    const rect = frame?.getBoundingClientRect();
    const visible = rect && frame?.getClientRects().length ? (packet?.views ?? []) : [];
    while (this.views.length > visible.length) {
      this.views.pop()?.element.remove();
    }
    if (!rect || !packet) {
      return;
    }
    for (const [index, visual] of visible.entries()) {
      let view = this.views[index];
      if (!view) {
        view = createRemoteCursor(this.layer.root);
        this.views.push(view);
      }
      const x = rect.left + (visual.x * rect.width) / packet.width;
      const y = rect.top + (visual.y * rect.height) / packet.height;
      view.element.hidden = x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
      view.element.classList.toggle('local-cursor', visual.local);
      view.element.classList.toggle('cursor-typing', visual.typing);
      view.element.dataset['peer'] = visual.peer;
      view.element.style.transition = visual.local ? 'none' : 'transform 70ms linear';
      view.element.style.transform = `translate(${x}px, ${y}px)`;
      view.element.style.setProperty('--peer-color', visual.color);
      view.element.style.setProperty('--peer-text-color', visual.textColor);
      view.label.style.left = ((visual.labelX - visual.x) * rect.width) / packet.width + 'px';
      view.label.style.top = ((visual.labelY - visual.y) * rect.height) / packet.height + 'px';
      view.name.textContent = visual.name;
      view.text.textContent = visual.text;
    }
  }
  clear() {
    this.visuals = undefined;
    this.draw();
  }
  dispose() {
    this.observer.disconnect();
    this.remote.clear();
    this.layer.host.remove();
    window.removeEventListener('resize', this.redraw);
    document.removeEventListener('scroll', this.redraw, true);
  }
}
export function editorCursorAt(event: PointerEvent): CursorPosition {
  const target = event.target instanceof Element ? event.target : undefined;
  const root = target?.closest('[data-follow-surface]');
  const rect = target?.getBoundingClientRect();
  return {
    surface: 'editor',
    x: clamp(event.clientX / innerWidth),
    y: clamp(event.clientY / innerHeight),
    ...(root && target && rect?.width && rect.height
      ? {
          editorAnchor: {
            surface: root.getAttribute('data-follow-surface') ?? '',
            path: surfacePath(target, root),
            x: clamp((event.clientX - rect.x) / rect.width),
            y: clamp((event.clientY - rect.y) / rect.height),
          },
        }
      : {}),
  };
}
function editorCursorPoint(cursor: CursorPosition) {
  const anchor = cursor.editorAnchor;
  const rect = anchor
    ? surfaceElement(anchor.surface, anchor.path)?.getBoundingClientRect()
    : undefined;
  return rect && anchor
    ? { x: rect.x + anchor.x * rect.width, y: rect.y + anchor.y * rect.height }
    : { x: cursor.x * innerWidth, y: cursor.y * innerHeight };
}
const clamp = (value: number) => Math.max(0, Math.min(1, value));
