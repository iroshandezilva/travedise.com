"use client";

import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/v2/section";
import { regions } from "@/content/v2/home";
import { cn } from "@/lib/cn";

import { IntroText, SectionIntro } from "./section-intro";

/**
 * "Five corners of a small island" — a row of region pills, and the picked region's
 * photos and facts beneath them.
 *
 * Both photos of every region are stacked and cross-faded by opacity, like the package
 * hero, so switching never waits on a download and a quick second click picks up where
 * the fade was. The text panel is remounted per region and enters from @starting-style.
 */
export function Regions() {
  const [current, setCurrent] = useState(0);
  const region = regions[current];

  return (
    <Section id="regions" className="py-[90px] max-md:py-14">
      <SectionIntro
        heading="Five corners of a small island."
        headingClassName="max-w-[760px]"
        className="mb-11 max-md:mb-7"
        aside={
          <IntroText>
            These five are where most routes are built, not the whole island. Pick one to see what
            it is for, when to go and how long to give it.
          </IntroText>
        }
      />

      <div
        role="group"
        aria-label="Regions"
        className="v2-rail mb-9 flex flex-wrap gap-2.5 max-md:-mx-5 max-md:mb-7 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-5"
      >
        {regions.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-pressed={i === current}
            onClick={() => setCurrent(i)}
            className={cn(
              "shrink-0 rounded-full border px-[22px] py-[13px] text-[15px]/[20px] transition-[background-color,color,border-color,scale] duration-200 ease-out-quart active:scale-[0.97] motion-reduce:transition-none max-md:px-[18px] max-md:py-[11px] max-md:text-[14px]",
              i === current
                ? "border-v2-navy bg-v2-navy text-white"
                : "border-v2-navy/22 bg-white text-v2-navy hover:border-v2-navy/50",
            )}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-16 max-xl:gap-12 max-lg:flex-col max-md:gap-12">
        <div className="relative h-[520px] w-[720px] shrink-0 max-xl:w-[56%] max-lg:h-[440px] max-lg:w-full max-md:h-[280px]">
          {regions.map((r, i) => (
            <img
              key={r.image}
              src={r.image}
              alt={i === current ? r.alt : ""}
              aria-hidden={i !== current}
              loading="lazy"
              className={cn(
                "absolute inset-0 block size-full object-cover transition-opacity duration-300 ease-out-quart motion-reduce:transition-none",
                i === current ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="absolute -right-7 -bottom-9 h-[170px] w-[236px] border-8 border-white bg-white max-md:right-3 max-md:-bottom-7 max-md:h-[96px] max-md:w-[132px] max-md:border-[5px]">
            {regions.map((r, i) => (
              <img
                key={r.inset}
                src={r.inset}
                alt=""
                aria-hidden
                loading="lazy"
                className={cn(
                  "absolute inset-0 block size-full object-cover transition-opacity duration-300 ease-out-quart motion-reduce:transition-none",
                  i === current ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>

        <div
          key={region.name}
          className="flex min-w-0 flex-1 flex-col gap-[26px] pt-1.5 transition-[opacity,translate] duration-300 ease-out-quint motion-reduce:transition-none starting:translate-y-2.5 starting:opacity-0 max-md:gap-5 max-md:pt-0"
        >
          <h3 className="m-0 text-[32px]/[40px] font-semibold tracking-[-0.01em] text-v2-navy max-md:text-[24px]/[32px]">
            {region.name}
          </h3>
          <p className="m-0 text-[17px]/[27px] text-[#344458] max-md:text-[15px]/[24px]">
            {region.body}
          </p>
          <dl className="m-0 grid grid-cols-[130px_1fr] gap-x-6 gap-y-4 pt-1.5 max-md:grid-cols-[112px_1fr] max-md:gap-x-4 max-md:gap-y-3">
            {(
              [
                ["Best months", region.months],
                ["Give it", region.nights],
                ["Known for", region.known],
                ["Getting there", region.access],
              ] as const
            ).map(([term, value]) => (
              <div key={term} className="contents">
                <dt className="text-[14px]/[22px] text-[#8192a3]">{term}</dt>
                <dd className="m-0 text-[16px]/[22px] text-v2-navy max-md:text-[15px]/[22px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/v2/packages"
            className="mt-2 inline-flex items-center gap-2.5 self-start rounded-full border border-v2-navy/30 px-[22px] py-[13px] text-[15px]/[20px] text-v2-navy transition-[border-color,scale] duration-150 ease-out-quad hover:border-v2-navy active:scale-[0.97] motion-reduce:transition-none"
          >
            See {region.short} on the map <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
