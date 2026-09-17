"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "@/lib/cn";

/*
 * A native horizontal scroller: the browser supplies trackpad panning, touch swipe,
 * momentum, rubber-banding and keyboard scrolling, and scroll-snap settles each card.
 * Nothing here is animated by hand. Slides are the viewport's direct children and
 * should carry `shrink-0 snap-start`.
 */

type CarouselContextValue = {
  viewportRef: RefObject<HTMLDivElement | null>;
  scrollByCard: (direction: -1 | 1) => void;
  /** Both fractions of the scrollable width, so a progress bar can size and place itself. */
  progress: { size: number; offset: number };
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel(part: string) {
  const context = useContext(CarouselContext);
  if (!context) throw new Error(`<${part}> must be rendered inside <ScrollCarousel>`);
  return context;
}

/** Shares scroll state between the parts. Renders no box of its own. */
export function ScrollCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ size: 1, offset: 0 });

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el || el.scrollWidth === 0) return;
    const size = el.clientWidth / el.scrollWidth;
    const offset = el.scrollLeft / el.scrollWidth;
    setProgress((prev) => (prev.size === size && prev.offset === offset ? prev : { size, offset }));
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = viewportRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    // The first slide at or past the scroll position is the one currently in view.
    const current = slides.findIndex((slide) => slide.offsetLeft >= el.scrollLeft - 1);
    const from = current === -1 ? slides.length - 1 : current;
    const next = slides[Math.min(Math.max(from + direction, 0), slides.length - 1)];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next?.offsetLeft ?? 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <CarouselContext.Provider value={{ viewportRef, scrollByCard, progress }}>
      {children}
    </CarouselContext.Provider>
  );
}

export function CarouselViewport({
  className,
  children,
  ...props
}: Omit<ComponentProps<"div">, "ref">) {
  const { viewportRef } = useCarousel("CarouselViewport");
  return (
    <div
      ref={viewportRef}
      className={cn(
        // The progress bar under the deck is the affordance, so the scrollbar is hidden.
        "relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ArrowProps = { className?: string; label: string; children: ReactNode };

function Arrow({ direction, className, label, children }: ArrowProps & { direction: -1 | 1 }) {
  const { scrollByCard } = useCarousel(direction === -1 ? "CarouselPrev" : "CarouselNext");
  return (
    <button
      type="button"
      aria-label={label}
      className={cn("cursor-pointer", className)}
      onClick={() => scrollByCard(direction)}
    >
      {children}
    </button>
  );
}

export function CarouselPrev(props: ArrowProps) {
  return <Arrow direction={-1} {...props} />;
}

export function CarouselNext(props: ArrowProps) {
  return <Arrow direction={1} {...props} />;
}

/** The thumb tracks how much of the deck is on screen and how far it has scrolled. */
export function CarouselProgress({
  className,
  thumbClassName,
}: {
  className?: string;
  thumbClassName?: string;
}) {
  const { progress } = useCarousel("CarouselProgress");
  return (
    <div aria-hidden className={className}>
      <div
        className={thumbClassName}
        style={{
          width: `${progress.size * 100}%`,
          transform: `translateX(${(progress.offset / progress.size) * 100}%)`,
        }}
      />
    </div>
  );
}
