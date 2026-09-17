"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

const INTERVAL = 4000;

/**
 * The hero's full-bleed photo slider (Webflow `.hero-slider`): every 4s the next photo
 * slides in from the right (500ms, ease), looping forever, with round dots at the bottom.
 * A copy of the first photo sits after the last so the loop keeps sliding left; once the
 * copy has arrived the track jumps back to the real first photo without a transition.
 */
export function HeroBackground({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const count = images.length;

  // Restart the countdown whenever the slide changes (autoplay or a dot click).
  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, INTERVAL);
    return () => window.clearTimeout(timer.current);
  }, [index, paused]);

  // Browsers throttle timers in background tabs; don't pile up slides meanwhile.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Arriving on the copy of the first slide: snap back to the real one.
  useEffect(() => {
    if (index !== count) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(
      () => {
        setAnimate(false);
        setIndex(0);
      },
      reduce ? 0 : 500,
    );
    return () => window.clearTimeout(id);
  }, [index, count]);

  const active = index % count;
  const slides = [...images, images[0]];

  return (
    <div className="relative min-h-screen bg-[#ddd] text-center">
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div
          className={cn(
            "flex h-full motion-reduce:transition-none",
            animate && "transition-transform duration-500 ease-[ease]",
          )}
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              aria-hidden={i % count !== active || i === count}
              className="relative size-full shrink-0"
            >
              <img
                src={src}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 block size-full max-w-none object-cover"
              />
              <div className="absolute inset-0 bg-black/10 bg-[linear-gradient(#ffffffba_13%,#fff0_66%)]" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-2 h-10 pt-2.5 text-center">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1} of ${count}`}
            aria-current={i === active}
            onClick={() => {
              setAnimate(true);
              setIndex(i);
            }}
            className={cn(
              "relative mx-[3px] mb-2 inline-block size-4 cursor-pointer rounded-full transition-colors duration-100",
              i === active ? "bg-white" : "bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
