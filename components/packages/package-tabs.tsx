"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export type PackageTab = { label: string; content: ReactNode };

/** Webflow tabs (`data-duration-out="100"`, `data-duration-in="300"`, `data-easing="ease"`). */
const FADE_OUT_MS = 100;

/**
 * The /packages category tabs (Webflow `.tour-activities-tabs`): a row of pills and one
 * visible panel. Like Webflow's tabs, switching highlights the new pill at once, fades the
 * old panel out over 100ms, then swaps in the new one and fades it in over 300ms.
 *
 * WAI-ARIA tabs with automatic activation: roving tabindex, ←/→ (wrapping), Home/End.
 * The pill row slides in from the bottom (150ms delay) when it scrolls into view.
 */
export function PackageTabs({
  tabs,
  label,
  className,
}: {
  tabs: PackageTab[];
  /** Accessible name of the tab list. */
  label: string;
  className?: string;
}) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (index: number) => {
    if (index === selected) return;
    setSelected(index);
    setInteracted(true);
    clearTimeout(timer.current);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => setShown(index), reduce ? 0 : FADE_OUT_MS);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowLeft: selected === 0 ? last : selected - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cn("flex w-full flex-col items-center justify-center", className)}>
      <Reveal
        role="tablist"
        aria-label={label}
        delay={150}
        onKeyDown={onKeyDown}
        className="mb-20 flex items-center justify-center gap-[5px] max-lg:mb-10 max-md:mb-5 max-md:gap-1.5 max-sm:flex-wrap"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-controls={`${id}-panel-${i}`}
            aria-selected={i === selected}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => select(i)}
            className="max-w-full cursor-pointer rounded-[300px] bg-surface-2 px-[18px] py-3 text-left text-base/6 text-navy outline-offset-2 outline-navy focus-visible:outline-2 aria-selected:bg-navy aria-selected:text-white max-md:px-[15px] max-md:py-2.5 max-md:text-sm/6 max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[10px]/6"
          >
            {tab.label}
          </button>
        ))}
      </Reveal>
      <div className="relative w-full">
        {tabs.map((tab, i) => (
          <div
            key={tab.label}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            hidden={i !== shown}
            className={cn(
              "relative",
              interacted &&
                "transition-opacity duration-300 ease-[ease] starting:opacity-0 motion-reduce:transition-none",
              i !== selected && "opacity-0 duration-100",
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
