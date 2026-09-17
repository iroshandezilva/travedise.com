"use client";

import Link from "next/link";
import { useState } from "react";

import { HeroScrim, SiteNav } from "@/components/v2/site-nav";
import type { Shot } from "@/content/v2/packages";
import { cn } from "@/lib/cn";

/**
 * The package hero: one large photo with a thumbnail carousel in the bottom corner.
 * Picking a thumbnail swaps the photo, which fades in rather than cutting.
 *
 * On a phone the thumbnails become a swipeable strip under the title.
 */
export function PackageHero({
  title,
  summary,
  shots,
}: {
  title: string;
  summary: string;
  shots: Shot[];
}) {
  const [current, setCurrent] = useState(0);
  const shot = shots[current];

  return (
    <header className="relative h-[760px] w-full shrink-0 overflow-clip gutter-v2 max-lg:h-[700px] max-md:h-auto max-md:px-0 max-md:pb-8">
      {/* The photo and its wash fill the header on desktop. On a phone they are a band
          at the top, with the title and thumbnails reading on white beneath. */}
      <div className="absolute inset-0 max-md:relative max-md:h-[420px]">
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.label}
          className="v2-hero-shot absolute inset-0 block size-full object-cover"
        />
        <HeroScrim desktop="linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.8) 0%, oklab(0 0 0 / 0) 56%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.52) 0%, oklab(0 0 0 / 0) 30%)" />
      </div>

      {/* Anchored to the header so it stays over the photo once the column below it
          stops filling the frame on a phone. */}
      <div className="absolute inset-x-0 top-0 z-10 gutter-v2 max-md:px-0">
        <div className="relative mx-auto h-[92px] w-full max-w-[1280px] max-md:h-[74px]">
          <SiteNav />
        </div>
      </div>

      <div className="relative mx-auto h-full w-full max-w-[1280px] max-md:h-auto">
        <Link
          href="/packages"
          className="absolute top-[124px] left-0 inline-flex h-10 items-center rounded-full bg-white/18 px-[18px] text-[14px]/[20px] text-white backdrop-blur-[14px] max-md:hidden"
        >
          ← All journeys, Sri Lanka
        </Link>

        <div className="absolute bottom-[58px] left-0 flex w-[700px] flex-col gap-[18px] max-lg:w-[60%] max-md:static max-md:mt-6 max-md:w-auto max-md:gap-3 max-md:px-5">
          <h1 className="m-0 font-soul text-[68px]/[74px] font-medium tracking-[-0.02em] text-white max-lg:text-[52px]/[58px] max-md:text-[38px]/[44px] max-md:text-v2-navy">
            {title}
          </h1>
          <p className="m-0 text-[20px]/[29px] text-[#e8eef1] max-md:text-[16px]/[25px] max-md:text-v2-body">
            {summary}
          </p>
        </div>

        <div className="absolute right-0 bottom-[58px] flex flex-col items-end gap-3 max-md:static max-md:mt-6 max-md:items-stretch max-md:gap-2.5">
          <div className="text-[13px]/[18px] tracking-[0.04em] text-white/72 max-md:px-5 max-md:text-v2-body">
            {shot.label}
          </div>
          <div className="v2-rail flex gap-2.5 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-5">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={s.label}
                aria-pressed={i === current}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-[74px] w-[104px] shrink-0 overflow-hidden rounded-md border-2 p-0 transition-colors duration-200 max-md:snap-start",
                  i === current ? "border-white/90 max-md:border-v2-navy" : "border-white/28",
                )}
              >
                <img
                  src={s.src}
                  alt=""
                  className={cn(
                    "block size-full object-cover transition-opacity duration-200",
                    i === current ? "opacity-100" : "opacity-70",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
