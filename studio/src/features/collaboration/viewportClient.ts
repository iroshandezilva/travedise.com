export function installViewportPresence(post: (message: unknown) => void, origin: string) {
  let enabled = false;
  let following = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let target: { left: number; top: number } | undefined;
  const publish = () => {
    clearTimeout(timer);
    timer = undefined;
    if (!enabled || following) {
      return;
    }
    const root = document.documentElement;
    post({
      type: 'studio:viewport',
      x: Math.max(0, Math.min(1, scrollX / Math.max(1, root.scrollWidth - innerWidth))),
      y: Math.max(0, Math.min(1, scrollY / Math.max(1, root.scrollHeight - innerHeight))),
      left: Math.max(0, scrollX),
      top: Math.max(0, scrollY),
    });
  };
  const apply = () => {
    if (enabled && following && target) {
      window.scrollTo({ ...target, behavior: 'instant' });
    }
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!timer && enabled && !following) {
        timer = setTimeout(publish, 50);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', () => {
    apply();
    publish();
  });
  // Images, fonts and later renders can extend the page after a follow packet
  // was clamped by the initial height. Keep the requested position until unfollow.
  new ResizeObserver(apply).observe(document.body);
  window.addEventListener('message', (event: MessageEvent<unknown>) => {
    if (event.source !== parent || event.origin !== origin) {
      return;
    }
    const data = event.data;
    if (!data || typeof data !== 'object' || !('type' in data)) {
      return;
    }
    if (data.type === 'studio:viewport-config') {
      enabled = 'enabled' in data && data.enabled === true;
      following = 'following' in data && data.following === true;
      if (!enabled || !following) {
        target = undefined;
      }
      publish();
    }
    if (
      enabled &&
      following &&
      data.type === 'studio:follow-viewport' &&
      'x' in data &&
      'y' in data &&
      valid(data.x, 1) &&
      valid(data.y, 1)
    ) {
      target = followPosition(data, data.x, data.y);
      apply();
    }
  });
  // Preview modules load asynchronously; iframe load alone is not a handshake.
  post({ type: 'studio:viewport-ready' });
}
function valid(value: unknown, maximum: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= maximum;
}

function followPosition(data: object, x: number, y: number) {
  const root = document.documentElement;
  return {
    left:
      'left' in data && valid(data.left, 10_000_000)
        ? data.left
        : x * Math.max(0, root.scrollWidth - innerWidth),
    top:
      'top' in data && valid(data.top, 10_000_000)
        ? data.top
        : y * Math.max(0, root.scrollHeight - innerHeight),
  };
}
