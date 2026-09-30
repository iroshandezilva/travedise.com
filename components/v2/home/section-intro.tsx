import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/**
 * The heading row most home sections open with: a display heading on the left and a
 * short paragraph (or a link) bottom-aligned on the right. On narrower screens the two
 * stack.
 *
 * The row rises into place the first time it is scrolled to, which is what tells the
 * reader a new section has started — the section that follows it comes in just behind.
 */
export function SectionIntro({
  heading,
  aside,
  className,
  headingClassName,
}: {
  heading: ReactNode;
  aside: ReactNode;
  className?: string;
  headingClassName?: string;
}) {
  return (
    <Reveal
      from="rise"
      className={cn(
        "flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-4",
        className,
      )}
    >
      <h2
        className={cn(
          "m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {aside}
    </Reveal>
  );
}

/** The paragraph that usually sits opposite a section heading. */
export function IntroText({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        "m-0 w-[400px] shrink-0 text-[16px]/[25px] text-[#52687b] max-lg:w-full max-lg:max-w-[520px] max-md:text-[15px]/[24px]",
        className,
      )}
    >
      {children}
    </p>
  );
}
