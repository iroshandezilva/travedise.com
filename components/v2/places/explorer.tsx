"use client";

import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/v2/section";
import { islandPath } from "@/content/v2/journeys";
import {
  placeRegions,
  places,
  placesGrid,
  placesMap,
  regionByKey,
  type RegionKey,
} from "@/content/v2/places";
import { cn } from "@/lib/cn";

type Pick = RegionKey | "all";

/**
 * The two halves of the places index, sharing one choice of region. Pick a region on the
 * dark map section and its places light up on the island and the grid below narrows to
 * them; the chips above the grid make the same choice from the other end.
 *
 * Only opacity and colour change on the map, so switching regions cross-fades.
 */
export function PlacesExplorer() {
  const [current, setCurrent] = useState<Pick>("all");
  const shown = places.filter((p) => current === "all" || p.region === current);

  return (
    <>
      <section
        id="map"
        className="w-full shrink-0 bg-[#0c1526] py-[110px] gutter-v2 max-md:py-14"
        style={{
          backgroundImage:
            "radial-gradient(900px 520px at 12% 4%, rgba(71,205,255,0.16), rgba(0,0,0,0) 60%), radial-gradient(700px 480px at 88% 70%, rgba(196,175,140,0.14), rgba(0,0,0,0) 62%)",
        }}
      >
        <div className="container-v2 flex flex-col">
          <div className="mb-[52px] flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-4 max-md:mb-8">
            <h2 className="m-0 max-w-[620px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-white max-md:text-[30px]/[38px]">
              {placesMap.heading}
            </h2>
            <p className="m-0 w-[380px] shrink-0 text-[16px]/[25px] text-[#b8c8d1] max-lg:w-full max-md:text-[15px]/[24px]">
              {placesMap.lede}
            </p>
          </div>

          <div className="flex items-start gap-16 max-lg:flex-col max-lg:gap-10">
            <div className="w-[520px] shrink-0 max-lg:mx-auto max-lg:w-full max-lg:max-w-[420px]">
              <IslandMap current={current} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 max-lg:w-full">
              {placeRegions.map((r) => {
                const on = r.key === current;
                const lit = on || current === "all";
                return (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCurrent(on ? "all" : r.key)}
                    className={cn(
                      "flex w-full items-center justify-between gap-[30px] border-0 border-l-[3px] px-[26px] py-[22px] text-left transition-[background-color,border-color] duration-300 ease-out-quart motion-reduce:transition-none max-md:gap-4 max-md:px-4 max-md:py-4",
                      on
                        ? "border-v2-sky bg-white/9"
                        : "border-transparent bg-white/2 hover:bg-white/6",
                    )}
                  >
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span
                        className={cn(
                          "text-[24px]/[32px] font-semibold tracking-[-0.01em] transition-colors duration-300 max-md:text-[19px]/[26px]",
                          lit ? "text-white" : "text-white/72",
                        )}
                      >
                        {r.name}
                      </span>
                      <span
                        className={cn(
                          "text-[14px]/[21px] transition-colors duration-300 max-md:text-[13px]/[19px]",
                          lit ? "text-[#b8c8d1]" : "text-[#b8c8d1]/55",
                        )}
                      >
                        {places
                          .filter((p) => p.region === r.key)
                          .map((p) => p.name)
                          .join(", ")}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-6 max-md:gap-3">
                      <span className="flex flex-col gap-[3px] text-right">
                        <span
                          className={cn(
                            "text-[13px]/[18px]",
                            lit ? "text-[#b8c8d1]" : "text-[#b8c8d1]/55",
                          )}
                        >
                          At its best
                        </span>
                        <span
                          className={cn(
                            "text-[15px]/[21px] max-md:text-[13px]/[18px]",
                            lit ? "text-white" : "text-white/72",
                          )}
                        >
                          {r.best}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "text-[17px]/[1] transition-colors duration-300 max-md:hidden",
                          on ? "text-v2-sky" : "text-white/30",
                        )}
                      >
                        →
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="mt-8 flex items-center justify-between gap-7 bg-white/6 px-7 py-[26px] max-md:mt-5 max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5 max-md:py-5">
                <p
                  aria-live="polite"
                  className="m-0 text-[16px]/[25px] text-[#c4d2db] max-md:text-[15px]/[24px]"
                >
                  {current === "all" ? placesMap.blurb : regionByKey[current].blurb}
                </p>
                <Link
                  href="/when-to-go"
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/40 px-5 py-[11px] text-[15px] text-white transition-colors duration-150 hover:bg-white/8"
                >
                  Month guide <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="py-[110px] max-md:py-14">
        <div className="mb-11 flex items-end justify-between gap-[60px] border-b border-v2-navy/12 pb-7 max-lg:flex-col max-lg:items-start max-lg:gap-5 max-md:mb-8 max-md:pb-5">
          <div className="flex flex-col gap-[22px] max-md:gap-4">
            <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
              {placesGrid.heading}
            </h2>
            <div
              role="group"
              aria-label="Filter places by region"
              className="v2-rail flex flex-wrap gap-2 max-md:-mx-5 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-5"
            >
              {[{ key: "all" as const, name: "All places" }, ...placeRegions].map((r) => {
                const on = r.key === current;
                return (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCurrent(r.key)}
                    className={cn(
                      "h-11 shrink-0 rounded-full border px-5 text-[15px]/[1] transition-[background-color,color,border-color,scale] duration-200 ease-out-quart active:scale-[0.97] motion-reduce:transition-none max-md:h-10 max-md:px-4 max-md:text-[14px]",
                      on
                        ? "border-v2-navy bg-v2-navy text-white"
                        : "border-v2-navy/20 bg-white text-v2-navy hover:border-v2-navy/50",
                    )}
                  >
                    {r.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div aria-live="polite" className="shrink-0 text-[15px]/[22px] text-[#65788c]">
            {shown.length} places
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[34px] max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5">
          {shown.map((p) => {
            const region = regionByKey[p.region];
            return (
              <Link
                key={p.slug}
                href={`/places/${p.slug}`}
                className="group flex flex-col bg-v2-cream"
              >
                <div className="relative h-[300px] w-full overflow-clip bg-[#e9e5da] max-md:h-[240px]">
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    loading="lazy"
                    className="v2-card-img block size-full object-cover"
                    style={{ objectPosition: p.image.position }}
                  />
                  <span className="absolute top-4 left-4 border border-white/24 bg-v2-navy/72 px-3.5 py-2 text-[13px]/[17px] text-white backdrop-blur-[12px]">
                    {region.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-7 pt-[26px] pb-7 max-md:px-5 max-md:pt-5 max-md:pb-6">
                  <h3 className="m-0 text-[28px]/[34px] font-medium tracking-[-0.005em] text-v2-navy transition-colors duration-300 group-hover:text-[#344458] max-md:text-[24px]/[30px]">
                    {p.name}
                  </h3>
                  <p className="m-0 text-[15px]/[24px] text-[#52687b]">{p.line}</p>
                  <div className="mt-auto flex items-center justify-between gap-[18px] pt-[18px]">
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-[13px]/[18px] text-[#65788c]">At its best</span>
                      <span className="text-[16px]/[22px] font-semibold text-v2-navy">
                        {region.best}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-v2-navy/25 text-[15px] text-v2-navy transition-colors duration-200 group-hover:border-v2-navy group-hover:bg-v2-navy group-hover:text-white"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}

/** Every place as a dot; the picked region's get the accent ring and a full label. */
function IslandMap({ current }: { current: Pick }) {
  const label = current === "all" ? "every region" : regionByKey[current].name;
  return (
    <svg
      viewBox="-95 -10 570 700"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Map of Sri Lanka with the places in ${label} highlighted`}
      className="block h-[700px] w-full max-lg:h-[560px] max-md:h-[440px]"
    >
      <path
        d={islandPath}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.4"
      />
      {places.map((p) => (
        <circle key={p.slug} cx={p.map.cx} cy={p.map.cy} r="3" fill="rgba(255,255,255,0.3)" />
      ))}
      {places.map((p) => {
        const on = current === "all" || p.region === current;
        return (
          <g key={p.slug}>
            <g
              opacity={on ? 1 : 0}
              className="transition-opacity duration-[450ms] ease-out-quart motion-reduce:transition-none"
            >
              <circle
                cx={p.map.cx}
                cy={p.map.cy}
                r="13"
                fill="var(--color-v2-sky)"
                opacity="0.16"
              />
              <circle
                cx={p.map.cx}
                cy={p.map.cy}
                r="5.5"
                fill="var(--color-v2-sky)"
                stroke="#0c1526"
                strokeWidth="2"
              />
            </g>
            <text
              x={p.map.tx}
              y={p.map.ty}
              textAnchor={p.map.anchor}
              fontSize="13"
              fontWeight="500"
              fill="#fff"
              opacity={on ? 1 : 0.32}
              className="font-heading transition-opacity duration-[450ms] ease-out-quart motion-reduce:transition-none"
            >
              {p.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
