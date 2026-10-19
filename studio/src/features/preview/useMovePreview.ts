import { useEffect, useRef } from 'react';
import type { SharedDocument } from '../collaboration/useDocument';
import type { ParserNode, TreeAction } from '../source/source';
import type { usePreview } from './usePreview';
import { structurePreview } from './structurePreview';

export function useMovePreview(
  document: SharedDocument | undefined,
  file: string,
  _nodes: readonly ParserNode[],
  preview: ReturnType<typeof usePreview>,
  report: (error: unknown) => void,
) {
  const current = useRef(preview);
  current.current = preview;
  useEffect(() => {
    const seen = new Set<string>();
    return document?.structures.subscribe((event) => {
      if (event.file !== file || seen.has(event.token)) {
        return;
      }
      seen.add(event.token);
      if (seen.size > 100) {
        const first = seen.values().next().value;
        if (first) {
          seen.delete(first);
        }
      }
      try {
        current.current.send(structurePreview(event.source, file, event.action, event.token));
      } catch {
        /* Unsupported source forms wait for the authoritative render. */
      }
    });
  }, [document, file]);
  const error = document?.error;
  useEffect(() => {
    if (error) {
      current.current.send({ type: 'studio:move-reset' });
    }
  }, [error]);
  return (action: TreeAction) => {
    void document?.action(action).catch(report);
  };
}
