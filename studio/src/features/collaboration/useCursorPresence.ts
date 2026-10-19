import { useEffect, useRef } from 'react';
import type { SharedDocument } from './useDocument';
import type { usePreview } from '../preview/usePreview';
import type { Session } from '../auth/useSession';
import { parseCursorState, type CursorPacket, type CursorPosition } from './cursorPresence';
import { EditorCursorLayer, editorCursorAt } from './editorCursorLayer';

type Preview = ReturnType<typeof usePreview>;
interface Context {
  shared: SharedDocument;
  page: string;
  preview: Preview;
  session: Session | undefined;
  targetId: string | undefined;
}
export function useCursorPresence(
  shared: SharedDocument | undefined,
  page: string,
  preview: Preview,
  session: Session | undefined,
  targetId?: string,
) {
  const chat = useRef({ text: '', typing: false });
  const current = useRef(preview);
  current.current = preview;
  const subscribeLoad = preview.subscribeLoad;
  useEffect(() => {
    if (!shared || !preview.url) {
      return;
    }
    const bridge = new CursorBridge(
      { shared, page, preview: current.current, session, targetId },
      chat.current,
      (message) => current.current.send(message),
    );
    const off = subscribeLoad(() => bridge.loaded());
    return () => {
      off();
      bridge.dispose();
    };
  }, [shared, page, preview.url, preview.frame, subscribeLoad, session, targetId]);
}
class CursorBridge {
  private readonly layer: EditorCursorLayer;
  private readonly origin: string;
  private readonly events = new AbortController();
  private off = () => {};
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly heartbeat: ReturnType<typeof setInterval>;
  private editorPosition: CursorPosition | undefined;
  constructor(
    private readonly context: Context,
    private readonly chat: { text: string; typing: boolean },
    private readonly send: (message: unknown) => void,
  ) {
    this.layer = new EditorCursorLayer(() => context.preview.frame.current);
    this.origin = new URL(context.preview.url ?? '', location.href).origin;
    const signal = this.events.signal;
    window.addEventListener('message', (event: MessageEvent<unknown>) => this.receive(event), {
      signal,
    });
    window.addEventListener(
      'pointermove',
      (event) => {
        if (!this.editorPosition) {
          this.send({ type: 'studio:cursor-leave' });
        }
        this.editorPosition = editorCursorAt(event);
        if (!this.timer) {
          this.timer = setTimeout(() => this.publish(), 50);
        }
      },
      { signal, passive: true },
    );
    document.documentElement.addEventListener('pointerleave', () => this.leave(), { signal });
    window.addEventListener('blur', () => this.leave(), { signal });
    this.heartbeat = setInterval(() => this.publish(), 5000);
  }
  loaded() {
    this.layer.clear();
    this.send({ type: 'studio:cursor-config', enabled: true, composite: true, ...this.chat });
    this.off();
    this.off = this.context.shared.cursors.subscribe((packet) => this.peer(packet));
  }
  private peer(packet: CursorPacket) {
    const { shared, session, page, targetId } = this.context;
    if (
      packet.id === shared.selfId ||
      (session?.kind === 'github' &&
        shared.peers.some((peer) => peer.id === packet.id && peer.githubId === session.id))
    ) {
      return;
    }
    const editor = packet.cursor?.surface === 'editor';
    this.layer.peer({ ...packet, cursor: editor && packet.id === targetId ? packet.cursor : null });
    this.send({
      type: 'studio:cursor-peer',
      ...packet,
      cursor: !editor && packet.page === page ? packet.cursor : null,
    });
  }
  private receive(event: MessageEvent<unknown>) {
    if (
      event.source !== this.context.preview.frame.current?.contentWindow ||
      event.origin !== this.origin
    ) {
      return;
    }
    const data = event.data;
    if (!data || typeof data !== 'object' || !('type' in data)) {
      return;
    }
    try {
      if (data.type === 'studio:cursor-ready') {
        this.loaded();
      }
      if (data.type === 'studio:cursor-visuals') {
        this.layer.receive(data);
      }
      if (data.type !== 'studio:cursor') {
        return;
      }
      const state = parseCursorState({ ...data, page: this.context.page });
      Object.assign(this.chat, { text: state.text, typing: state.typing });
      if (state.cursor) {
        this.editorPosition = undefined;
      }
      if (!this.editorPosition) {
        this.context.shared.cursors.publish(state);
      }
    } catch {
      /* Ignore malformed preview presence. */
    }
  }
  private publish() {
    clearTimeout(this.timer);
    this.timer = undefined;
    if (this.editorPosition) {
      this.context.shared.cursors.publish({
        page: this.context.page,
        cursor: this.editorPosition,
        ...this.chat,
      });
    }
  }
  private leave() {
    this.editorPosition = undefined;
    this.context.shared.cursors.publish({ page: this.context.page, cursor: null, ...this.chat });
  }
  dispose() {
    this.leave();
    this.off();
    this.events.abort();
    this.layer.dispose();
    clearTimeout(this.timer);
    clearInterval(this.heartbeat);
    this.send({ type: 'studio:cursor-config', enabled: false });
  }
}
