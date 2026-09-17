"use client";

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type Rgba = readonly [number, number, number, number];

const CLEAR: Rgba = [255, 255, 255, 0];
/** Background / bottom border the bar fills to once the page is 3% scrolled. */
const FILLED: Record<"light" | "transparent", { bg: Rgba; border: Rgba }> = {
  light: { bg: [255, 255, 255, 1], border: [158, 167, 184, 0.3] },
  transparent: { bg: [9, 23, 51, 1], border: CLEAR },
};
/** Webflow IX2 "smoothing: 92" — measured as an exponential approach with a ~100ms time constant. */
const SMOOTHING_MS = 100;
/** How long the mobile menu takes to slide in / out. */
const MENU_MS = 400;

const mix = (a: Rgba, b: Rgba, t: number) =>
  `rgba(${a.map((v, i) => {
    const x = v + (b[i] - v) * t;
    return i === 3 ? x.toFixed(3) : Math.round(x);
  })})`;

/**
 * The interactive shell of <Navbar>: the fixed bar with its scroll behaviour, the ≤991px
 * dropdown menu and the hamburger toggle. Content (brand, links, buttons) comes in as slots.
 */
export function NavbarFrame({
  variant,
  fillOnScroll,
  hideOnScroll,
  brand,
  menu,
  actions,
}: {
  variant: "light" | "transparent";
  fillOnScroll: boolean;
  hideOnScroll: boolean;
  brand: ReactNode;
  menu: ReactNode;
  actions: ReactNode;
}) {
  const transparent = variant === "transparent";
  const rootRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Scroll: fill the background over the first 3% of the page, hide on scroll down.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || (!fillOnScroll && !hideOnScroll)) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const to = FILLED[variant];
    // Like IX2, smooth the raw scroll progress (0–1 of the page), then map 0–3% onto the fill.
    const target = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    };
    let value = target();
    let lastY = scrollY;
    let raf = 0;
    let prev = 0;

    const paint = () => {
      const t = Math.min(1, value / 0.03);
      el.style.backgroundColor = mix(CLEAR, to.bg, t);
      el.style.borderBottomColor = mix(CLEAR, to.border, t);
    };
    const tick = (now: number) => {
      const goal = target();
      const k = reduce.matches ? 1 : 1 - Math.exp(-(prev ? now - prev : 0) / SMOOTHING_MS);
      value += (goal - value) * k;
      if (Math.abs(goal - value) < 0.0002) {
        value = goal;
        raf = prev = 0;
      } else {
        prev = now;
        raf = requestAnimationFrame(tick);
      }
      paint();
    };
    const onScroll = () => {
      const y = Math.max(0, scrollY);
      if (hideOnScroll && y !== lastY) el.toggleAttribute("data-hidden", y > lastY);
      lastY = y;
      if (fillOnScroll && !raf) raf = requestAnimationFrame(tick);
    };

    if (fillOnScroll) paint();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [variant, fillOnScroll, hideOnScroll]);

  // Mobile menu. `open` is the toggle state; `mounted` keeps the dropdown layer displayed
  // while the menu slides out; `shown` puts the menu at its open position a frame after
  // mounting so the slide-in transitions from the hidden offset.
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      let inner = 0;
      const outer = requestAnimationFrame(
        () => (inner = requestAnimationFrame(() => setShown(true))),
      );
      return () => (cancelAnimationFrame(outer), cancelAnimationFrame(inner));
    }
    setShown(false);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setMounted(false), reduce ? 0 : MENU_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: globalThis.MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const desktop = matchMedia("(min-width: 992px)");
    const onDesktop = () => {
      if (desktop.matches) (setOpen(false), setMounted(false));
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const toggle = () => {
    if (open) return setOpen(false);
    setMounted(true);
    setOpen(true);
  };
  const closeOnLink = (e: MouseEvent) => {
    if (open && (e.target as Element).closest("a")) setOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={cn(
        "fixed inset-x-0 top-0 z-99 w-full border-b border-transparent py-2 transition-[translate] duration-300 ease-linear data-hidden:-translate-y-full motion-reduce:transition-none max-lg:py-4",
        !fillOnScroll && "bg-white",
        // Webflow's hide-on-scroll interaction leaves `transform-style: preserve-3d` on the bar,
        // which (in Chromium) switches off every backdrop blur inside it. Kept for parity —
        // drop this line to get the blurred glass the design intended.
        hideOnScroll && "transform-3d",
      )}
    >
      <div className="container-site">
        <div
          className={cn(
            "flex items-center justify-between",
            "max-lg:relative max-lg:rounded-full max-lg:border max-lg:border-white/30 max-lg:py-[5px] max-lg:pr-4 max-lg:pl-5 max-lg:backdrop-blur-[20px] max-sm:rounded-[18px] max-sm:pr-5 max-sm:pl-2.5",
            transparent
              ? "max-lg:bg-black/16 max-sm:bg-black/32"
              : "max-lg:bg-white max-lg:shadow-[0_2px_5px_#0003]",
          )}
        >
          {brand}
          {/* Desktop: the menu sits inline. ≤991px: a clipping layer under the bar the menu drops into. */}
          <div
            className={cn(
              "lg:contents max-lg:absolute max-lg:-inset-x-4 max-lg:top-[calc(100%+17px)] max-lg:h-screen max-lg:overflow-hidden",
              mounted ? "max-lg:block" : "max-lg:hidden",
            )}
          >
            <nav
              ref={navRef}
              id={menuId}
              onClick={closeOnLink}
              className={cn(
                "ml-8 max-lg:mr-[15px] max-lg:ml-auto max-lg:w-[200px] max-lg:rounded-xl max-lg:transition-[translate] max-lg:duration-400 max-lg:ease-[ease] motion-reduce:transition-none max-md:overflow-auto",
                !shown &&
                  "max-lg:translate-y-[calc(-100%-84px)] max-sm:translate-y-[calc(-100%-67px)]",
              )}
            >
              {menu}
            </nav>
          </div>
          {actions}
          <button
            ref={buttonRef}
            type="button"
            aria-label="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={toggle}
            className="group hidden size-10 cursor-pointer items-center justify-center self-center rounded-full bg-white [-webkit-tap-highlight-color:transparent] max-lg:flex max-sm:size-[30px]"
          >
            <Hamburger className={transparent ? "max-md:w-5 max-sm:w-4" : undefined} />
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * The Webflow Lottie hamburger ("Menu-Black-Hamburger.json", 430×350) redrawn as SVG: the
 * outer bars pivot on their left end into an X while the middle bar collapses. Timings are
 * the Lottie frames IX2 played (0→45% in 500ms): bars 333ms, middle 222ms; on close the
 * reverse starts after the held frames (167ms / 278ms).
 */
function Hamburger({ className }: { className?: string }) {
  const bar =
    "transition-[translate,rotate] duration-333 ease-[cubic-bezier(0.333,0,0.667,1)] delay-167 group-aria-expanded:translate-x-[40px] group-aria-expanded:delay-0 motion-reduce:transition-none";
  return (
    <svg
      viewBox="0 0 430 350"
      aria-hidden
      className={cn("block h-full w-[22px]", className)}
      fill="none"
      stroke="#111"
      strokeWidth={45}
    >
      <path
        d="M45 52H403"
        className={cn(bar, "origin-[53px_50px] group-aria-expanded:rotate-45")}
      />
      <path
        d="M45 172H403"
        className="origin-[217px_170px] transition-[scale] delay-278 duration-222 ease-[cubic-bezier(0.333,0,0.667,1)] group-aria-expanded:scale-x-0 group-aria-expanded:delay-0 motion-reduce:transition-none"
      />
      <path
        d="M45 292H403"
        className={cn(bar, "origin-[53px_290px] group-aria-expanded:-rotate-45")}
      />
    </svg>
  );
}
