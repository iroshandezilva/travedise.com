import Link from "next/link";

import { Section } from "@/components/v2/section";
import { journeyPhotos } from "@/content/v2/home";
import { journeys } from "@/content/v2/journeys";

import { IntroText, SectionIntro } from "./section-intro";

/**
 * The six journeys as cards carrying the same facts, so they can be compared without
 * opening six pages. On a phone the grid becomes a snapping rail.
 */
export function Journeys() {
  return (
    <Section id="journeys" surface="cream" bleed className="py-[90px] max-md:py-14">
      <SectionIntro
        heading="Start with the one that sounds like you."
        headingClassName="max-w-[620px]"
        className="mb-[42px] max-md:mb-7 max-md:px-5"
        aside={
          <div className="flex w-[400px] shrink-0 flex-col items-start gap-4 max-lg:w-full max-lg:max-w-[520px]">
            <IntroText className="w-auto max-lg:w-auto">
              Six routes, shaped around who is travelling. Same facts on every card so you can
              compare them without opening six pages. All of them can be changed.
            </IntroText>
            <Link href="/v2/packages" className="text-[16px]/[1.2] text-v2-navy hover:opacity-80">
              All six journeys, in detail ↗
            </Link>
          </div>
        }
      />

      <div className="v2-rail grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-lg:gap-6 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-5">
        {journeys.map((journey) => {
          const photo = journeyPhotos[journey.key];
          return (
            <Link
              key={journey.key}
              href={journey.href}
              className="group flex flex-col bg-white max-md:w-[280px] max-md:shrink-0 max-md:snap-start"
            >
              <div className="h-[200px] w-full overflow-clip max-md:h-[180px]">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="v2-card-img block size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-[26px] max-md:px-5 max-md:pt-5 max-md:pb-[22px]">
                <span className="text-[13px]/[18px] text-[#8192a3]">{journey.theme}</span>
                <h3 className="m-0 text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[21px]/[28px]">
                  {journey.name}
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-[16px]/[22px] text-v2-navy">{journey.nights}</span>
                  <span aria-hidden className="text-[14px] text-v2-sand">
                    ·
                  </span>
                  <span className="text-[16px]/[24px] font-semibold text-v2-navy">
                    {journey.price}
                  </span>
                </div>
                <p className="m-0 text-[14px]/[21px] text-[#65788c]">{journey.route}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-[18px]">
                  <span className="text-[15px]/[20px] text-v2-navy">See the itinerary</span>
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-v2-navy/25 text-[14px] text-v2-navy transition-colors duration-150 group-hover:border-v2-navy motion-reduce:transition-none"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="m-0 mt-[42px] text-[14px]/[22px] text-[#65788c] max-md:mt-7 max-md:px-5">
        Prices are a starting point for two people sharing, and every route can be shortened,
        stretched or joined to another.{" "}
        <a href="#how" className="text-v2-navy hover:opacity-80">
          How a quote is built ↗
        </a>
      </p>
    </Section>
  );
}
