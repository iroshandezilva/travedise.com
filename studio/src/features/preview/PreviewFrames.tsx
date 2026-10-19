import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { usePreview } from './usePreview';
import { cachedPreviewTarget } from './previewTargetCache';
import { routeFor } from '../project/projectClient';

// Two live previews bound memory and sockets while keeping a recently visited
// or hovered page ready. Cached frames still receive authoritative Astro renders.
export function PreviewFrames({
  preview,
  loaded,
}: {
  readonly preview: ReturnType<typeof usePreview>;
  readonly loaded: () => void;
}) {
  const [cached, setCached] = useState<readonly string[]>([]);
  const refs = useRef(new Map<string, HTMLIFrameElement>());
  const ready = useRef(new Set<string>());
  const current = useRef(loaded);
  current.current = loaded;
  const url = preview.url;
  const previous = useRef(url);
  const urls = retainFrames(cached, url, previous.current);
  previous.current = url;
  const key = urls.join('\n');
  useEffect(() => {
    setCached(key ? key.split('\n') : []);
  }, [key]);
  useWarmPage(url, setCached);
  useLayoutEffect(() => {
    preview.frame.current = url ? (refs.current.get(frameKey(url)) ?? null) : null;
    if (url && ready.current.has(frameKey(url))) {
      current.current();
    }
  }, [url, preview.frame]);
  return (
    <>
      {urls.map((entry) => (
        <Frame
          key={frameKey(entry)}
          url={entry}
          active={frameKey(entry) === frameKey(url)}
          attach={(node) => {
            if (node) {
              refs.current.set(frameKey(entry), node);
            } else {
              refs.current.delete(frameKey(entry));
              ready.current.delete(frameKey(entry));
            }
            if (frameKey(entry) === frameKey(url)) {
              preview.frame.current = node;
            }
          }}
          loaded={() => {
            ready.current.add(frameKey(entry));
            if (frameKey(entry) === frameKey(url)) {
              current.current();
            }
          }}
        />
      ))}
    </>
  );
}
function Frame({
  url,
  active,
  attach,
  loaded,
}: {
  readonly url: string;
  readonly active: boolean;
  readonly attach: (node: HTMLIFrameElement | null) => void;
  readonly loaded: () => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const current = useRef(attach);
  current.current = attach;
  useLayoutEffect(() => {
    current.current(frame.current);
    return () => current.current(null);
  }, []);
  useLayoutEffect(() => {
    if (active) {
      current.current(frame.current);
    }
  }, [active]);
  return (
    <iframe
      ref={frame}
      src={url}
      onLoad={loaded}
      title={active ? 'Site preview' : 'Cached site preview'}
      aria-hidden={!active}
      tabIndex={active ? undefined : -1}
      style={
        active
          ? undefined
          : { position: 'absolute', inset: 0, visibility: 'hidden', pointerEvents: 'none' }
      }
    />
  );
}

function useWarmPage(
  url: string | undefined,
  setCached: React.Dispatch<React.SetStateAction<readonly string[]>>,
) {
  useEffect(() => {
    const warm = (event: Event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const file = event.target.closest('.page-menu-item[data-file]')?.getAttribute('data-file');
      if (!file || !file.startsWith('src/pages/') || /[\[\]]/.test(file)) {
        return;
      }
      const target = cachedPreviewTarget(routeFor(file));
      if (target && frameKey(target.url) !== frameKey(url)) {
        setCached((cached) =>
          cached.some((entry) => frameKey(entry) === frameKey(target.url))
            ? cached
            : cached.length < 2
              ? [...cached, target.url]
              : cached.map((entry) => (frameKey(entry) === frameKey(url) ? entry : target.url)),
        );
      }
    };
    document.addEventListener('pointerover', warm);
    document.addEventListener('focusin', warm);
    return () => {
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
    };
  }, [url, setCached]);
}

function retainFrames(
  cached: readonly string[],
  url: string | undefined,
  previous: string | undefined,
) {
  if (!url) {
    return [];
  }
  if (cached.some((entry) => frameKey(entry) === frameKey(url))) {
    return cached;
  }
  if (cached.length < 2) {
    return [...cached, url];
  }
  return cached.map((entry) => (frameKey(entry) === frameKey(previous) ? entry : url));
}

function frameKey(url: string | undefined): string {
  if (!url) {
    return '';
  }
  const parsed = new URL(url, location.href);
  if (parsed.pathname !== '/__studio-entry') {
    return parsed.href;
  }
  const page = new URL(parsed.searchParams.get('page') ?? '/', parsed.origin);
  if (page.origin !== parsed.origin) {
    return parsed.href;
  }
  page.hash = 'avb-design';
  return page.href;
}
