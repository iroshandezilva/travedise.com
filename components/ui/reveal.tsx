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
  /** Where the element slides in from. Webflow's slideInBottom / slideInLeft presets. */
  from?: "bottom" | "left" | "fade";
  /** Milliseconds before the animation starts once in view. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

let observer: IntersectionObserver | undefined;

function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        observer!.unobserve(entry.target);
      }
    },
    // Webflow fires when the element is 10% into the viewport.
    { rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(el);
  return () => observer!.unobserve(el);
}

/**
 * Fades an element in (and slides it 100px) the first time it scrolls into view —
 * 1s, ease-out-quart, like the Webflow site. Renders the element itself, no wrapper:
 * `<Reveal as="h2" delay={100} className="…">`. Styles live in globals.css (`[data-reveal]`).
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
