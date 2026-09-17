"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { Reveal } from "@/components/ui/reveal";
import type { FeaturedStay } from "@/content/about";
import { cn } from "@/lib/cn";

/*
 * Behaviour, measured on the Webflow slider (`.featured-stays-slider`):
 * - one arched photo per slide in a centred 608 / 500 / 400px mask; neighbours stay visible
 *   (the page wrapper clips them at the viewport edge), 16px apart
 * - slides move 500ms `ease`; autoplay advances once, 4s after load, then stops
 * - infinite: arrows / swipes wrap around (the slide you wrapped from stays alongside)
 * - the hotel card under the slider swaps instantly with the active slide
 */
const AUTOPLAY_DELAY = 4000;
const SWIPE_THRESHOLD = 40;

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="w-6">
      <path
        d={
          direction === "prev"
            ? "M13.5005 19C13.6235 19 13.7455 18.955 13.8415 18.865C14.0435 18.677 14.0535 18.36 13.8655 18.158L9.72347 13.728C9.25247 13.257 9.00047 12.648 9.00047 11.999C9.00047 11.35 9.25247 10.741 9.71147 10.282L13.8655 5.841C14.0535 5.639 14.0435 5.322 13.8415 5.134C13.6405 4.947 13.3235 4.955 13.1345 5.157L8.99247 9.587C8.35647 10.223 7.99947 11.083 7.99947 11.999C7.99947 12.915 8.35647 13.775 9.00347 14.423L13.1335 18.841C13.2325 18.946 13.3655 18.999 13.4985 18.999L13.5005 19Z"
            : "M10.4995 19C10.3765 19 10.2545 18.955 10.1585 18.865C9.95653 18.677 9.94653 18.36 10.1345 18.158L14.2765 13.728C14.7475 13.257 14.9995 12.648 14.9995 11.999C14.9995 11.35 14.7475 10.741 14.2885 10.282L10.1345 5.841C9.94653 5.639 9.95653 5.322 10.1585 5.134C10.3595 4.947 10.6765 4.955 10.8655 5.157L15.0075 9.587C15.6435 10.223 16.0005 11.083 16.0005 11.999C16.0005 12.915 15.6435 13.775 14.9965 14.423L10.8665 18.841C10.7675 18.946 10.6345 18.999 10.5015 18.999L10.4995 19Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

const arrowClass =
  "absolute bottom-[-200px] z-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-surface text-navy transition-all duration-250 ease-[ease] hover:bg-navy hover:text-white max-sm:bottom-[-300px]";

/** Arched photo carousel of hotels, with the active hotel's name, blurb and price below it. */
export function FeaturedStaysSlider({ stays }: { stays: FeaturedStay[] }) {
  // `wrapped` is set when the last move crossed the end of the list (see `shiftOf`).
  const [{ index, wrapped }, setState] = useState({ index: 0, wrapped: false });
  const autoplay = useRef<ReturnType<typeof setTimeout>>(undefined);
  const swipeStart = useRef<number | null>(null);
  const count = stays.length;

  const move = useCallback(
    (step: 1 | -1) =>
      setState(({ index: i }) => ({
        index: (i + step + count) % count,
        wrapped: step === 1 ? i === count - 1 : i === 0,
      })),
    [count],
  );

  useEffect(() => {
    autoplay.current = setTimeout(() => move(1), AUTOPLAY_DELAY);
    return () => clearTimeout(autoplay.current);
  }, [move]);

  const go = (step: 1 | -1) => {
    clearTimeout(autoplay.current);
    move(step);
  };

  /**
   * Slides to move left, in slide widths. After a wrap Webflow keeps the slide you came from
   * next to the new one: the first slide parks right of the last, the last left of the first.
   */
  const shiftOf = (i: number) => {
    if (wrapped && count > 1) {
      if (index === count - 1 && i === 0) return -1;
      if (index === 0 && i === count - 1) return count;
    }
    return index;
  };

  const onPointerDown = (e: PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <Reveal
        delay={150}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured stays"
        // `isolate` keeps the arrows' z-index inside the slider, so on narrow screens a tall
        // hotel card below paints over them, as on the reference.
        className="relative isolate w-full text-center"
      >
        <div
          className="relative z-1 mx-auto flex w-full max-w-[608px] touch-pan-y gap-4 select-none max-lg:max-w-[500px] max-md:max-w-[400px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {stays.map((stay, i) => {
            const shift = shiftOf(i);
            return (
              <div
                key={stay.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                style={{ "--shift": shift } as CSSProperties}
                className="relative w-full shrink-0 translate-x-[calc(var(--shift)_*_(-100%_-_16px))] text-left transition-transform duration-500 ease-[ease] motion-reduce:transition-none"
              >
                <div className="relative flex h-[540px] w-full items-end justify-center overflow-clip rounded-[1000px_1000px_25px_25px] max-lg:h-[440px]">
                  <img
                    src={stay.image}
                    loading="lazy"
                    alt={stay.name}
                    draggable={false}
                    className="absolute inset-0 size-full object-cover object-left-top"
                  />
                  <div className="relative flex w-full items-end justify-center gap-5 bg-[linear-gradient(#0000,#000000b3)] pt-8 pb-[26px] max-lg:gap-4 max-sm:flex-wrap max-sm:gap-y-2.5 max-sm:pb-5">
                    {stay.features.map(({ icon, label }, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <img
                          src={icon}
                          loading="lazy"
                          alt=""
                          draggable={false}
                          className="block w-6 max-md:w-[18px]"
                        />
                        <div className="text-body-lg/[155%] text-white max-md:text-sm/[155%]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Previous stay"
          onClick={() => go(-1)}
          className={cn(arrowClass, "left-[18%] max-lg:left-[5%] max-md:left-0 max-sm:left-[35%]")}
        >
          <Arrow direction="prev" />
        </button>
        <button
          type="button"
          aria-label="Next stay"
          onClick={() => go(1)}
          className={cn(
            arrowClass,
            "right-[18%] z-4 max-lg:right-[5%] max-md:right-0 max-sm:right-[35%]",
          )}
        >
          <Arrow direction="next" />
        </button>
      </Reveal>

      <Reveal
        delay={200}
        aria-live="polite"
        className="relative mx-auto flex h-[225px] w-[550px] flex-col items-center justify-center max-md:w-[450px] max-sm:-mt-2.5 max-sm:h-60 max-sm:w-auto"
      >
        {stays.map((stay, i) => (
          <div
            key={stay.name}
            hidden={i !== index}
            // On the reference only the first card is vertically centred; the others are
            // pinned to the top of the box (≥480px).
            className={cn(i === 0 ? "w-full" : "absolute inset-0 max-sm:static max-sm:w-full")}
          >
            <div className="flex flex-col items-center justify-center gap-6 max-sm:w-full max-sm:gap-4">
              <div className="flex flex-col items-center justify-center gap-2.5">
                <div className="text-center text-h4 font-medium text-navy">{stay.name}</div>
                <p className="m-0 w-full max-w-[440px] text-center text-body-lg/[155%]">
                  {stay.description}
                </p>
              </div>
              <div className="flex items-center justify-center gap-[5px] rounded-full bg-navy px-[21px] py-[13px] text-white">
                <div>From</div>
                <div>{stay.price}</div>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </>
  );
}
