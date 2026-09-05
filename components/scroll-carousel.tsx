"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import styles from "./scroll-carousel.module.css";

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  scrollByCard: (direction: -1 | 1) => void;
  /** Both fractions of the scrollable width, so a progress bar can size and place itself. */
  progress: { size: number; offset: number };
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel(part: string) {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(`<ScrollCarousel.${part}> must be rendered inside <ScrollCarousel>`);
  }
  return context;
}

const cx = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

function Root({ className, children, ...rest }: React.ComponentProps<"div">) {
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
    next?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, []);

  return (
    <CarouselContext.Provider value={{ viewportRef, scrollByCard, progress }}>
      <div className={className} {...rest}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function Viewport({ className, children }: { className?: string; children: ReactNode }) {
  const { viewportRef } = useCarousel("Viewport");
  return (
    <div ref={viewportRef} className={cx(styles.viewport, className)}>
      {children}
    </div>
  );
}

/**
 * Rendered as a div rather than a button so the Webflow arrow classes style it
 * exactly as they did before, with the button semantics added back by hand.
 */
function Arrow({
  direction,
  className,
  label,
  children,
}: {
  direction: -1 | 1;
  className?: string;
  label: string;
  children: ReactNode;
}) {
  const { scrollByCard } = useCarousel(direction === -1 ? "Prev" : "Next");
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      className={className}
      onClick={() => scrollByCard(direction)}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        scrollByCard(direction);
      }}
    >
      {children}
    </div>
  );
}

function Prev(props: Omit<React.ComponentProps<typeof Arrow>, "direction">) {
  return <Arrow direction={-1} {...props} />;
}

function Next(props: Omit<React.ComponentProps<typeof Arrow>, "direction">) {
  return <Arrow direction={1} {...props} />;
}

/** The thumb tracks how much of the deck is on screen and how far it has scrolled. */
function Progress({ className, barClassName }: { className?: string; barClassName?: string }) {
  const { progress } = useCarousel("Progress");
  return (
    <div className={className}>
      <div
        className={barClassName}
        style={{
          width: `${progress.size * 100}%`,
          transform: `translateX(${(progress.offset / progress.size) * 100}%)`,
        }}
      />
    </div>
  );
}

/*
 * Exported individually rather than as `ScrollCarousel.Viewport` and friends:
 * a Server Component cannot read static properties off a client component's
 * module reference, so dot notation resolves to undefined at render time.
 */
export {
  Root as ScrollCarousel,
  Viewport as CarouselViewport,
  Prev as CarouselPrev,
  Next as CarouselNext,
  Progress as CarouselProgress,
};
