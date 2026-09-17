"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import type { ActivityTab } from "@/content/home";
import { cn } from "@/lib/cn";

/** Webflow tabs: the old pane fades out (100ms), then the new one fades in (300ms). */
const FADE_OUT = 100;

export function ActivityTabs({ tabs }: { tabs: ActivityTab[] }) {
  const id = useId();
  const [selected, setSelected] = useState(0); // the tab marked current
  const [shown, setShown] = useState(0); // the pane on screen
  const [visible, setVisible] = useState(true);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const select = (index: number) => {
    if (index === selected) return;
    setSelected(index);
    setVisible(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShown(index);
      // Let the new pane paint at opacity 0 before fading it in.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, FADE_OUT);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (selected + step + tabs.length) % tabs.length;
    select(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <Reveal
        delay={150}
        role="tablist"
        aria-label="Tour activities"
        onKeyDown={onKeyDown}
        className="relative mb-20 flex items-center justify-center gap-[5px] max-lg:mb-10 max-md:mb-5 max-md:gap-1.5 max-sm:flex-wrap"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-controls={`${id}-panel`}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "relative block max-w-full cursor-pointer rounded-full px-[18px] py-3 text-left align-top max-md:px-[15px] max-md:py-2.5 max-md:text-[14px] max-sm:px-3 max-sm:py-2 max-sm:text-[12px]",
              i === selected ? "bg-navy text-white" : "bg-surface-2 text-navy",
            )}
          >
            {tab.label}
          </button>
        ))}
      </Reveal>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${shown}`}
        className={cn(
          "relative w-full transition-opacity ease-[ease]",
          visible ? "opacity-100 duration-300" : "opacity-0 duration-100",
        )}
      >
        <Marquee key={shown} tab={tabs[shown]} />
      </div>
    </div>
  );
}

/** Two copies of the photo strip sliding left forever: one full run every 40s. */
function Marquee({ tab }: { tab: ActivityTab }) {
  return (
    <div className="flex w-full items-center justify-start overflow-x-clip">
      <div className="flex w-max flex-none animate-marquee [--marquee-duration:40s] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex flex-none items-center justify-start max-lg:pl-[15px]"
          >
            {tab.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={copy === 0 ? `${tab.label} tour activity ${i + 1}` : ""}
                loading="lazy"
                className="mr-2.5 block w-[220px] max-w-full rounded-card max-lg:w-[180px] max-sm:w-[140px] max-sm:rounded-[14px]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
