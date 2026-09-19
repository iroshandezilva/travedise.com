import Link from "next/link";

import { PillLink } from "@/components/v2/buttons";
import { Section } from "@/components/v2/section";
import { team, teamFrames } from "@/content/v2/home";

/**
 * Who plans your trip: four narrow photos that widen under the cursor (see `.v2-reveal`
 * in globals.css), beside a note about the team. On a phone the photos sit in a 2×2
 * grid with their notes showing.
 */
export function Team() {
  return (
    <Section
      id="about"
      className="py-[90px] max-lg:py-16 max-md:py-14"
      innerClassName="flex items-center gap-24 max-xl:gap-16 max-lg:flex-col max-lg:items-start max-lg:gap-12 max-md:gap-8"
    >
      <div className="v2-reveal h-[520px] w-[560px] shrink-0 max-lg:h-[440px] max-lg:w-full max-md:h-auto">
        {teamFrames.map((frame) => (
          <figure key={frame.src} className="v2-reveal-col">
            <img src={frame.src} alt={frame.alt} loading="lazy" />
            <figcaption>
              <span className="v2-reveal-place">{frame.place}</span>
              <span className="v2-reveal-note">{frame.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-7 max-md:gap-5">
        <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          {team.heading}
        </h2>
        {team.paragraphs.map((p) => (
          <p key={p} className="m-0 text-[17px]/[27px] text-[#344458] max-md:text-[15px]/[24px]">
            {p}
          </p>
        ))}
        <div className="flex items-center gap-[26px] pt-2 max-md:flex-col max-md:items-stretch max-md:gap-3">
          <PillLink
            href="/about"
            variant="navy"
            className="h-auto gap-2.5 rounded-full px-6 py-3.5 font-normal max-md:h-[52px] max-md:py-0"
          >
            Read our story <span aria-hidden>↗</span>
          </PillLink>
          <Link
            href="/contact"
            className="text-[15px]/[20px] text-v2-navy hover:opacity-80 max-md:text-center"
          >
            Talk to Chamara ↗
          </Link>
        </div>
      </div>
    </Section>
  );
}
