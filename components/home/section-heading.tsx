import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/cn";

/** The serif section title size used across the home page (Webflow `.text-5xl.center-align`). */
export const sectionTitle =
  "m-0 text-center font-serif text-[48px]/[112%] max-lg:text-[40px] max-md:text-[32px]";

/**
 * "✦ Tag" pill over a centred serif h2 (Webflow `.tour-activities-top`). Both slide in
 * from the bottom (50ms / 100ms); pass `revealTitle={false}` for a title that doesn't.
 */
export function SectionHeading({
  tag,
  title,
  tone = "navy",
  revealTitle = true,
  className,
  titleClassName,
}: {
  tag: ReactNode;
  title: ReactNode;
  tone?: "navy" | "white";
  revealTitle?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  const titleClass = cn(sectionTitle, tone === "white" && "text-white", titleClassName);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4",
        className,
      )}
    >
      <Reveal delay={50}>
        <SectionTag tone={tone}>{tag}</SectionTag>
      </Reveal>
      {revealTitle ? (
        <Reveal as="h2" delay={100} className={titleClass}>
          {title}
        </Reveal>
      ) : (
        <h2 className={titleClass}>{title}</h2>
      )}
    </div>
  );
}
