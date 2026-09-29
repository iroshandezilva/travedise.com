"use client";

import Link from "next/link";
import { useState } from "react";

import { islandPath, journeys, mapLandmarks, mapStops } from "@/content/v2/journeys";
import { cn } from "@/lib/cn";

/**
 * Pick a route and the map draws it: the line joins that journey's stops in order,
 * and only those stops light up. Everything that changes is opacity, so switching
 * routes cross-fades rather than redrawing.
 */
export function MapExplorer() {
  const [selected, setSelected] = useState(0);
  const active = journeys[selected];
  const stopKeys = Object.keys(mapStops);

  return (
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
          <h2 className="m-0 max-w-[620px] font-display text-[46px]/[55px] font-medium tracking-[-0.01em] text-white max-md:text-[30px]/[38px]">
            See where each journey goes.
          </h2>
          <p className="m-0 w-[380px] shrink-0 text-[16px]/[25px] text-[#b8c8d1] max-lg:w-full max-md:text-[15px]/[24px]">
            Pick a route and it draws itself across the island. The marked places are where you
            actually sleep, not every town you pass through.
          </p>
        </div>

        <div className="flex items-start gap-16 max-lg:flex-col max-lg:gap-10">
          <div className="w-[520px] shrink-0 max-lg:mx-auto max-lg:w-full max-lg:max-w-[420px]">
            <svg
              viewBox="-95 -10 570 700"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={`Map of Sri Lanka showing the ${active.name} route`}
              className="block h-[760px] w-full max-lg:h-[560px] max-md:h-[440px]"
            >
              <path
                d={islandPath}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1.4"
              />

              {journeys.map((journey) => (
                <polyline
                  key={journey.key}
                  points={journey.stops.map((k) => `${mapStops[k].cx},${mapStops[k].cy}`).join(" ")}
                  fill="none"
                  stroke="var(--color-v2-sky)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="7 8"
                  className="transition-opacity duration-[450ms] ease-out-quart motion-reduce:transition-none"
                  opacity={journey.key === active.key ? 1 : 0}
                />
              ))}

              {mapLandmarks.map((place) => (
                <g key={place.label}>
                  <circle cx={place.cx} cy={place.cy} r="3" fill="rgba(255,255,255,0.28)" />
                  <text
                    x={place.tx}
                    y={place.ty}
                    textAnchor="start"
                    fontSize="12"
                    fill="rgba(255,255,255,0.3)"
                  >
                    {place.label}
                  </text>
                </g>
              ))}

              {/* Every stop is drawn faintly; the active route's stops fade up over it. */}
              {stopKeys.map((key) => (
                <circle
                  key={`dot-${key}`}
                  cx={mapStops[key].cx}
                  cy={mapStops[key].cy}
                  r="3"
                  fill="rgba(255,255,255,0.3)"
                />
              ))}
              {stopKeys.map((key) => {
                const stop = mapStops[key];
                return (
                  <g
                    key={`on-${key}`}
                    className="transition-opacity duration-[450ms] ease-out-quart motion-reduce:transition-none"
                    opacity={active.stops.includes(key) ? 1 : 0}
                  >
                    <circle
                      cx={stop.cx}
                      cy={stop.cy}
                      r="13"
                      fill="var(--color-v2-sky)"
                      opacity="0.16"
                    />
                    <circle
                      cx={stop.cx}
                      cy={stop.cy}
                      r="5.5"
                      fill="var(--color-v2-sky)"
                      stroke="#0c1526"
                      strokeWidth="2"
                    />
                    <text
                      x={stop.tx}
                      y={stop.ty}
                      textAnchor={stop.anchor}
                      fontSize="13"
                      fontWeight="500"
                      fill="#fff"
                    >
                      {stop.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {journeys.map((journey, i) => {
              const on = i === selected;
              return (
                <button
                  key={journey.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex w-full items-center justify-between gap-[30px] border-0 border-l-[3px] px-[26px] py-5 text-left transition-colors duration-300 max-md:gap-4 max-md:px-4 max-md:py-4",
                    on
                      ? "border-l-v2-sky bg-white/9"
                      : "border-l-transparent bg-white/2 hover:bg-white/6",
                  )}
                >
                  <span className="flex min-w-0 flex-col gap-[5px]">
                    <span
                      className={cn(
                        "text-[25px]/[32px] font-medium max-md:text-[19px]/[26px]",
                        on ? "text-white" : "text-white/72",
                      )}
                    >
                      {journey.name}
                    </span>
                    <span
                      className={cn(
                        "text-[14px]/[21px] max-md:text-[13px]/[19px]",
                        on ? "text-[#b8c8d1]" : "text-[#b8c8d1]/55",
                      )}
                    >
                      {journey.route}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-6 max-md:gap-3">
                    <span className="flex flex-col gap-[3px] text-right">
                      <span
                        className={cn("text-[15px]/[21px]", on ? "text-white" : "text-white/72")}
                      >
                        {journey.nights}
                      </span>
                      <span
                        className={cn(
                          "text-[14px]/[20px] max-md:hidden",
                          on ? "text-[#b8c8d1]" : "text-[#b8c8d1]/55",
                        )}
                      >
                        {journey.price}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn("text-[17px]/none", on ? "text-v2-sky" : "text-white/30")}
                    >
                      →
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="mt-10 flex items-center gap-7 bg-white/6 p-[22px] max-md:mt-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <img
                key={active.image}
                src={active.image}
                alt={active.alt}
                className="block h-[170px] w-[230px] shrink-0 object-cover max-md:h-[180px] max-md:w-full"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="text-[14px]/[20px] text-v2-sky">{active.theme}</span>
                <span className="text-[27px]/[34px] font-medium text-white max-md:text-[22px]/[28px]">
                  {active.name}
                </span>
                <p className="m-0 text-[15px]/[23px] text-[#c4d2db]">{active.blurb}</p>
                <Link
                  href={active.href}
                  className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/40 px-5 py-[11px] text-[15px] text-white transition-colors duration-200 hover:bg-white/8 max-md:self-stretch max-md:justify-center"
                >
                  {active.href.startsWith("/packages/")
                    ? "Read the full itinerary"
                    : "Ask us about this route"}{" "}
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
