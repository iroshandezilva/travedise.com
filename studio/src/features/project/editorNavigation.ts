import { prepareDocument, discardDocument } from '../collaboration/preparedDocument';
import { useEffect, useState, useRef } from 'react';
import { useEditorRole } from '../roles/useEditorRole';
import type { Peer } from '../collaboration/presence';
import { sameCollaborator, type FollowTarget } from '../collaboration/useFollow';
import { clearAssetRequest, getPendingAsset } from '../../../vendor/stacki/src/ui/assetPick';

export interface ComponentFocus {
  readonly path: string;
  readonly occurrence: number;
}
export type OpenFile = (file: string, focus?: ComponentFocus) => void;

export function useEditorNavigation() {
  const role = useEditorRole();
  const [file, setFile] = useState('src/pages/index.astro');
  const [previewFile, setPreviewFile] = useState(file);
  const { change, error, cancel } = usePreparedNavigation(file);
  const [focus, setFocus] = useState<ComponentFocus>();
  const [followTarget, setFollowTarget] = useState<FollowTarget>();
  useEffect(() => {
    if (role === 'client' && file.endsWith('.astro') && !file.startsWith('src/pages/')) {
      setFile(previewFile);
      setFocus(undefined);
      setFollowTarget(undefined);
    }
  }, [role, file, previewFile]);
  const open: OpenFile = (file, focus) => {
    if (role === 'client' && file.endsWith('.astro') && !file.startsWith('src/pages/')) {
      return;
    }
    clearPendingAsset();
    setFollowTarget(undefined);
    change(file, () => {
      setFocus(focus);
      setFile(file);
      if (file.startsWith('src/pages/')) {
        setPreviewFile(file);
      }
    });
  };
  const trackFollow = (peer: Peer) => {
    if (role === 'client' && peer.file.endsWith('.astro') && !peer.file.startsWith('src/pages/')) {
      return;
    }
    clearPendingAsset();
    change(peer.file, () => {
      setFocus(undefined);
      setFile(peer.file);
      setPreviewFile(peer.page);
      setFollowTarget({ ...peer, request: Date.now() });
    });
  };
  const follow = (peer: Peer) => {
    if (followTarget && sameCollaborator(followTarget, peer)) {
      cancel();
      setFollowTarget(undefined);
    } else {
      trackFollow(peer);
    }
  };
  return { file, previewFile, focus, followTarget, open, follow, trackFollow, error };
}
function clearPendingAsset() {
  if (getPendingAsset()) {
    clearAssetRequest();
  }
}

function usePreparedNavigation(file: string) {
  const request = useRef(0);
  const pending = useRef<string>();
  const [error, setError] = useState('');
  const cancel = () => {
    request.current++;
    if (pending.current) {
      discardDocument(pending.current);
      pending.current = undefined;
    }
  };
  useEffect(() => cancel, []);
  const change = (next: string, commit: () => void) => {
    const token = ++request.current;
    if (pending.current && pending.current !== next) {
      discardDocument(pending.current);
    }
    pending.current = next;
    setError('');
    if (next === file) {
      pending.current = undefined;
      commit();
      return;
    }
    void prepareDocument(next)
      .then(() => {
        if (token === request.current) {
          pending.current = undefined;
          commit();
        }
      })
      .catch((problem: unknown) => {
        if (token === request.current) {
          pending.current = undefined;
          setError(String(problem));
        }
      });
  };
  return { change, error, cancel };
}
