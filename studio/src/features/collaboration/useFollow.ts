import { useEffect, useRef } from 'react';
import type { SharedDocument } from './useDocument';
import type { usePreview } from '../preview/usePreview';
import type { Peer } from './presence';
import { followedPeer } from './followedPeer';
import { parseViewport } from './viewportPresence';

export interface FollowTarget extends Peer {
  readonly request: number;
}
export function sameCollaborator(first: Peer, second: Peer): boolean {
  if (first.participant && second.participant) {
    return first.participant === second.participant && first.githubId === second.githubId;
  }
  return first.id === second.id;
}
export function useFollowNavigation(
  shared: SharedDocument | undefined,
  target: FollowTarget | undefined,
  track: (peer: Peer) => void,
) {
  const current = useRef(track);
  current.current = track;
  const peers = shared?.peers;
  useEffect(() => {
    if (!target || !shared?.ready || shared.status !== 'Saved') {
      return;
    }
    const peer = followedPeer(peers ?? [], target);
    if (
      peer &&
      peer.page.startsWith('src/pages/') &&
      (peer.id !== target.id || peer.file !== target.file || peer.page !== target.page)
    ) {
      current.current(peer);
    }
  }, [peers, shared, shared?.ready, shared?.status, target]);
}
export function useViewportPresence(
  shared: SharedDocument | undefined,
  page: string,
  preview: ReturnType<typeof usePreview>,
  target: FollowTarget | undefined,
) {
  const current = useRef(preview);
  current.current = preview;
  const { subscribeLoad } = preview;
  const targetId = target?.id;
  useEffect(() => {
    if (!shared?.ready || !preview.url) {
      return;
    }
    const origin = new URL(preview.url, location.href).origin;
    let unsubscribe = () => {};
    const loaded = () => {
      current.current.send({
        type: 'studio:viewport-config',
        enabled: true,
        following: !!targetId,
      });
      unsubscribe();
      unsubscribe = shared.viewports.subscribe((packet) => {
        if (targetId === packet.id && packet.page === page) {
          current.current.send({ type: 'studio:follow-viewport', ...packet });
        }
      });
    };
    const receive = (event: MessageEvent<unknown>) => {
      if (event.source !== preview.frame.current?.contentWindow || event.origin !== origin) {
        return;
      }
      receiveViewport(event.data, page, shared, loaded);
    };
    window.addEventListener('message', receive);
    const stopLoading = subscribeLoad(loaded);
    return () => {
      unsubscribe();
      stopLoading();
      window.removeEventListener('message', receive);
      current.current.send({ type: 'studio:viewport-config', enabled: false });
    };
  }, [
    shared,
    shared?.ready,
    shared?.selfId,
    page,
    preview.url,
    preview.frame,
    subscribeLoad,
    targetId,
  ]);
}

function receiveViewport(data: unknown, page: string, shared: SharedDocument, loaded: () => void) {
  if (!data || typeof data !== 'object' || !('type' in data)) {
    return;
  }
  if (data.type === 'studio:viewport-ready') {
    loaded();
  } else if (data.type === 'studio:viewport') {
    try {
      shared.viewports.publish(parseViewport({ ...data, page }));
    } catch {
      /* Ignore malformed preview messages. */
    }
  }
}
