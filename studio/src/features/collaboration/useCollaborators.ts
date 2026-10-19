import { useEffect, useRef } from 'react';
import type { SharedDocument } from './useDocument';
import { peerPath } from './presence';
import { otherPresenceUsers } from './presenceUsers';
import type { Session } from '../auth/useSession';
import type { usePreview } from '../preview/usePreview';
export function useCollaborators(
  document: SharedDocument | undefined,
  page: string,
  preview: ReturnType<typeof usePreview>,
  session: Session | undefined,
) {
  const { subscribeLoad } = preview;
  const others = session
    ? otherPresenceUsers(
        document?.peers ?? [],
        document?.selfId ?? '',
        session.kind === 'github' ? session.id : undefined,
      )
    : [];
  const peers = others
    .filter(
      (peer) =>
        !peer.observing && peer.page === page && /^(layout|n\d+(\.\d+)*)$/.test(peer.selection),
    )
    .slice(0, 30);
  const paths = JSON.stringify(peers.map(peerPath));
  const send = useRef(preview.send);
  send.current = preview.send;
  useEffect(() => {
    const message = { type: 'studio:collaborators', paths: JSON.parse(paths) as unknown };
    return subscribeLoad(() => send.current(message));
  }, [paths, preview.url, preview.frame, subscribeLoad]);
  return peers;
}
