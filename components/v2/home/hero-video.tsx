"use client";

import { useEffect, useRef } from "react";

/**
 * The homepage film. The poster paints first. The file itself loads only on a wide
 * screen, and only after the browser is idle enough to start playback, so a phone
 * keeps the still and never downloads the video.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const wide = window.matchMedia("(min-width: 768px)");

    function sync() {
      if (!video) return;
      if (!wide.matches) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        return;
      }
      if (!video.currentSrc) {
        video.preload = "metadata";
        video.src = src;
        video.load();
      }
      void video.play().catch(() => {});
    }

    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label="Sri Lankan landscapes in motion"
      className="absolute inset-0 block size-full object-cover"
    />
  );
}
