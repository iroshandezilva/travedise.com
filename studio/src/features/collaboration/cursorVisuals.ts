import { record, string } from '../../shared/validation';

export interface CursorVisual {
  readonly x: number;
  readonly y: number;
  readonly labelX: number;
  readonly labelY: number;
  readonly name: string;
  readonly text: string;
  readonly color: string;
  readonly textColor: string;
  readonly local: boolean;
  readonly typing: boolean;
  readonly peer: string;
}
export function parseCursorVisuals(input: unknown): {
  width: number;
  height: number;
  views: readonly CursorVisual[];
} {
  const value = record(input);
  const views = value['views'];
  if (!Array.isArray(views) || views.length > 32) {
    throw new Error('Invalid cursor layer');
  }
  return {
    width: Math.max(1, coordinate(value['width'])),
    height: Math.max(1, coordinate(value['height'])),
    views: views.map((item: unknown) => {
      const view = record(item);
      return {
        x: coordinate(view['x']),
        y: coordinate(view['y']),
        labelX: coordinate(view['labelX']),
        labelY: coordinate(view['labelY']),
        name: string(view['name'], 100),
        text: string(view['text'], 200),
        peer: string(view['peer'], 100),
        color: color(view['color']),
        textColor: color(view['textColor']),
        local: view['local'] === true,
        typing: view['typing'] === true,
      };
    }),
  };
}
function coordinate(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 10000000) {
    throw new Error('Invalid cursor coordinates');
  }
  return value;
}
function color(value: unknown): string {
  if (typeof value !== 'string' || !/^(#[0-9a-f]{3,8}|white|black)$/i.test(value)) {
    throw new Error('Invalid cursor color');
  }
  return value;
}
// Keep input/focus in the preview, but composite visuals above the parent outlines.
export function mirrorCursorVisuals(
  host: HTMLElement,
  root: ShadowRoot,
  post: (message: unknown) => void,
) {
  let frame = 0;
  let active = false;
  const send = () => {
    frame = 0;
    if (!active) {
      return;
    }
    const views: CursorVisual[] = [];
    if (!host.hidden) {
      for (const element of root.querySelectorAll<HTMLElement>('.collaborator-cursor')) {
        if (element.hidden) {
          continue;
        }
        const label = element.querySelector<HTMLElement>('.cursor-label');
        if (!label) {
          continue;
        }
        const rect = element.getBoundingClientRect();
        const box = label.getBoundingClientRect();
        const input = element.querySelector('textarea');
        views.push({
          x: rect.x,
          y: rect.y,
          labelX: box.x,
          labelY: box.y,
          name: element.querySelector('.cursor-name')?.textContent ?? '',
          text: input
            ? input.value || input.placeholder
            : (element.querySelector('.cursor-text')?.textContent ?? ''),
          color: element.style.getPropertyValue('--peer-color') || '#333333',
          textColor: element.style.getPropertyValue('--peer-text-color') || 'white',
          local: element.classList.contains('local-cursor') || !!input,
          typing: !!input,
          peer: element.dataset['peer'] ?? '',
        });
      }
    }
    post({ type: 'studio:cursor-visuals', width: innerWidth, height: innerHeight, views });
  };
  const schedule = () => {
    if (active && !frame) {
      frame = requestAnimationFrame(send);
    }
  };
  const observer = new MutationObserver(schedule);
  observer.observe(root, { subtree: true, childList: true, attributes: true, characterData: true });
  observer.observe(host, { attributes: true });
  return {
    enable: () => {
      active = true;
      host.style.opacity = '0';
      host.setAttribute('data-composite', '');
      schedule();
    },
    dispose: () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    },
  };
}
