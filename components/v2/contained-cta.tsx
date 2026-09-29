import type { ReactNode } from "react";

import { BadgeLink } from "@/components/v2/buttons";
import { Section } from "@/components/v2/section";

/**
 * A navy panel inset in the white page, asking whether this route is the right one.
 * Shared by the journeys index and each journey's own page.
 */
export function ContainedCta({
  heading = (
    <>
      Does this sound like <em className="italic">your kind</em> of journey?
    </>
  ),
  body = "Tell us your dates and what you hope to see. We will shape the rest around you.",
}: {
  heading?: ReactNode;
  body?: string;
} = {}) {
  return (
    <Section className="py-30 max-md:py-14">
      <div className="flex items-center justify-between gap-20 bg-v2-navy px-16 py-[62px] max-lg:flex-col max-lg:items-start max-lg:gap-8 max-md:px-6 max-md:py-10">
        <div className="flex flex-col gap-[18px]">
          <h2 className="m-0 font-display text-[40px]/[48px] font-normal tracking-[-0.01em] text-white max-md:text-[28px]/[36px]">
            {heading}
          </h2>
          <p className="m-0 text-[17px]/[26px] text-v2-muted max-md:text-[15px]/[24px]">{body}</p>
        </div>
        <BadgeLink href="/plan-your-trip" className="max-md:w-full max-md:justify-between">
          Let’s get planning
        </BadgeLink>
      </div>
    </Section>
  );
}
