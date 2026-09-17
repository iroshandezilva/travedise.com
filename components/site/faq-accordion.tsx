"use client";

import { useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

import type { Faq } from "@/content/faqs";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/reveal";

/*
 * Motion, measured on the Webflow site ("FAQ Opens"/"FAQ Closes" IX2 + the Plus-to-minus Lottie):
 * - answer height 0 ↔ auto and the paragraph's -20px → 0 slide: 300ms linear, both directions
 * - icon: the vertical bar rotates 90° → 0° (plus → minus), 300ms, the Lottie's own
 *   cubic-bezier(0.75, 0, 0.25, 1)
 * Items open independently; all start closed.
 */
const MOTION = "duration-300 motion-reduce:transition-none";

/**
 * The plus → minus icon, rebuilt from the Lottie: a 32×32 canvas with two 21.75-unit bars,
 * stroke 2, butt caps, black. Put it inside an `AccordionItem` — it follows the item's state.
 */
export function PlusMinusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      aria-hidden
      className={cn("size-[22px] shrink-0 max-sm:size-5", className)}
    >
      <path d="M5.125 16h21.75" />
      <path
        d="M5.125 16h21.75"
        className={cn(
          "origin-center rotate-90 transition-[rotate] ease-[cubic-bezier(0.75,0,0.25,1)] group-data-open/accordion:rotate-0",
          MOTION,
        )}
      />
    </svg>
  );
}

type HeadingTag = "h2" | "h3" | "h4" | "h5" | "h6" | "div";

export type AccordionItemProps = {
  /** Content of the trigger row (the question). Phrasing content only — it sits in a <button>. */
  header: ReactNode;
  /** The panel. Use `group-data-open/accordion:` to animate children with the item's state. */
  children: ReactNode;
  defaultOpen?: boolean;
  /** Element wrapping the trigger button. */
  headingAs?: HeadingTag;
  /** The card (Webflow `.faq-list-wrap`). */
  className?: string;
  /** The heading element around the trigger. */
  headingClassName?: string;
  /** The panel's outer box (sizing — e.g. max width). */
  panelClassName?: string;
  /** Replace the default plus/minus icon, or `null` for none. */
  icon?: ReactNode;
  /** Scroll-in reveal of the card; `false` to render it statically. */
  reveal?: false | { from?: "bottom" | "left" | "fade"; delay?: number };
};

/**
 * One collapsible card. Like the Webflow original, a click anywhere on the card toggles it;
 * the accessible control is the <button> in the heading (aria-expanded / aria-controls).
 */
export function AccordionItem({
  header,
  children,
  defaultOpen = false,
  headingAs: Heading = "h6",
  className,
  headingClassName,
  panelClassName,
  icon = <PlusMinusIcon />,
  reveal = { delay: 100 },
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  // The trigger's own clicks (mouse, Enter, Space) bubble here too. Ignore other controls
  // that may live inside the panel.
  const onClick = (event: MouseEvent<HTMLElement>) => {
    const control = (event.target as Element).closest(
      "a, button, input, select, textarea, label, [role='button']",
    );
    if (control && control !== trigger.current) return;
    setOpen((o) => !o);
  };

  const props = {
    "data-open": open ? "" : undefined,
    onClick,
    className: cn("group/accordion flex w-full cursor-pointer flex-col", className),
    children: (
      <>
        <Heading className={cn("m-0", headingClassName)}>
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-panel`}
            className="flex w-full cursor-pointer items-center justify-between text-left"
          >
            <span className="min-w-0">{header}</span>
            {icon}
          </button>
        </Heading>
        <div
          // No role="region": with 9+ panels per list, landmarks would be noise (APG advice).
          id={`${id}-panel`}
          inert={!open}
          className={cn(
            "grid w-full grid-rows-[0fr] transition-[grid-template-rows] ease-linear group-data-open/accordion:grid-rows-[1fr]",
            MOTION,
            panelClassName,
          )}
        >
          <div className="min-h-0 overflow-clip">{children}</div>
        </div>
      </>
    ),
  };

  return reveal ? <Reveal {...reveal} {...props} /> : <div {...props} />;
}

/** The FAQ list (Webflow `.faq-all-lists`). `bordered` is the `/faq` page style (`.faq-list-wrap.faq`). */
export function FaqAccordion({
  items,
  bordered = false,
  defaultOpen = [],
  className,
}: {
  items: Faq[];
  bordered?: boolean;
  /** Indices of items that start open (the site starts with all closed). */
  defaultOpen?: number[];
  className?: string;
}) {
  return (
    <div className={cn("flex w-full max-w-[713px] flex-col gap-4", className)}>
      {items.map((faq, i) => (
        <AccordionItem
          key={faq.question}
          header={faq.question}
          defaultOpen={defaultOpen.includes(i)}
          className={cn(
            "rounded-[15px] bg-white px-[25px] py-5 max-lg:p-[30px] max-md:p-5 max-sm:px-4",
            bordered && "border border-line",
          )}
          headingClassName="font-heading font-medium text-navy max-sm:text-[20px]"
          panelClassName="max-w-[700px]"
        >
          <p
            className={cn(
              "m-0 -translate-y-5 pt-5 transition-[translate] ease-linear group-data-open/accordion:translate-y-0",
              MOTION,
            )}
          >
            {faq.answer}
          </p>
        </AccordionItem>
      ))}
    </div>
  );
}
