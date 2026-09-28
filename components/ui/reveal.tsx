"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  /**
   * Which preset to arrive on. `bottom` / `left` are Webflow's slideInBottom and
   * slideInLeft (1s, 100px), used across the original site; `rise` is the shorter,
   * closer one the v2 pages use; `fade` only fades.
   */
  from?: "bottom" | "left" | "rise" | "fade";
  /** Milliseconds before the animation starts once in view. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

let observer: IntersectionObserver | undefined;
/** Everything still waiting to be shown, so a jump can be swept up — see below. */
const pending = new Set<Element>();

function show(el: Element) {
  el.setAttribute("data-shown", "");
  pending.delete(el);
  observer!.unobserve(el);
}

function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target);
      }
      // An element only reports as intersecting if the observer samples it while it is
      // on screen. Jump past one — an anchor link, a restored scroll position, a fast
      // drag of the scrollbar — and it goes from below the fold to overhead between two
      // samples, crosses no threshold, and is never reported at all: it would sit at
      // opacity 0 for good, leaving a blank section to scroll back up into. So on every
      // callback, take in anything that is now above the viewport as well.
      for (const el of pending) {
        if (el.getBoundingClientRect().bottom < 0) show(el);
      }
    },
    // Webflow fires when the element is 10% into the viewport.
    { rootMargin: "0px 0px -10% 0px" },
  );
  pending.add(el);
  observer.observe(el);
  return () => {
    pending.delete(el);
    observer!.unobserve(el);
  };
}

/**
 * Fades an element in (and slides it) the first time it scrolls into view. Renders the
 * element itself, no wrapper: `<Reveal as="h2" delay={100} className="…">`. The distance,
 * duration and curve belong to the preset — see `[data-reveal]` in globals.css.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  from = "bottom",
  delay = 0,
  style,
  ...props
}: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);

  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      ref={ref}
      data-reveal={from}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      {...props}
    />
  );
}
