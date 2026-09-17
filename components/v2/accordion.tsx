"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * One-at-a-time disclosure, shared by the FAQ lists and the day-by-day itinerary.
 *
 * `initial` is the index open on load; -1 opens nothing. Clicking the open row closes it,
 * so a reader can collapse everything.
 */
export function useAccordion(initial = 0) {
  const [open, setOpen] = useState(initial);
  return {
    isOpen: (i: number) => i === open,
    toggle: (i: number) => setOpen((cur) => (cur === i ? -1 : i)),
  };
}

/**
 * A disclosure row: a full-width button that reveals `children` beneath it.
 *
 * `head` is whatever sits left of the sign — a plain question, or a stacked
 * label-and-title for an itinerary day.
 */
export function AccordionRow({
  head,
  aside,
  open,
  onToggle,
  className,
  buttonClassName,
  panelClassName,
  children,
}: {
  head: ReactNode;
  /** Sits between the head and the +/− sign, e.g. an itinerary day's numeral. */
  aside?: ReactNode;
  open: boolean;
  onToggle: () => void;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-10 border-0 bg-none text-left max-md:gap-4",
          buttonClassName,
        )}
      >
        {head}
        <span className="flex shrink-0 items-center gap-[22px] max-md:gap-3">
          {aside}
          <span aria-hidden className="text-[22px]/[25px] text-v2-navy max-md:text-[20px]/[24px]">
            {open ? "−" : "+"}
          </span>
        </span>
      </button>
      {open && (
        <div id={id} className={cn("v2-row-open", panelClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
