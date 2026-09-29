"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { levelLabels, monthPicker, months, regions, type Level } from "@/content/v2/when-to-go";

/** Label colour per rating: sky for the best, sand for good, a quiet white for wet. */
const levelText: Record<Level, string> = {
  3: "text-v2-sky",
  2: "text-v2-sand",
  1: "text-white/45",
};
const levelDot: Record<Level, string> = {
  3: "bg-v2-sky",
  2: "bg-v2-sand",
  1: "bg-white/45",
};

/**
 * Twelve month pills over a verdict for the chosen month and how each corner of the
 * island fares in it. The verdict card is keyed on the month, so each pick rises in as
 * a fresh element rather than the text swapping in place.
 */
export function MonthPicker() {
  const [index, setIndex] = useState(monthPicker.initial);
  const month = months[index];

  return (
    <section
      id="when"
      className="w-full shrink-0 bg-[#0c1526] py-[90px] gutter-v2 max-md:py-14"
      style={{
        backgroundImage:
          "radial-gradient(900px 520px at 10% 0%, rgba(71,205,255,0.16), rgba(0,0,0,0) 60%), radial-gradient(700px 480px at 90% 80%, rgba(196,175,140,0.14), rgba(0,0,0,0) 62%)",
      }}
    >
      <div className="container-v2 flex flex-col">
        <div className="mb-11 flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-4 max-md:mb-8">
          <h2 className="m-0 max-w-[640px] font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-white max-md:text-[30px]/[38px]">
            {monthPicker.heading}
          </h2>
          <p className="m-0 w-[400px] shrink-0 text-[16px]/[25px] text-[#b8c8d1] max-lg:w-full max-lg:max-w-[560px] max-md:text-[15px]/[24px]">
            {monthPicker.lede}
          </p>
        </div>

        <div
          role="group"
          aria-label="Month"
          className="mb-12 grid grid-cols-12 gap-2 max-lg:grid-cols-6 max-md:mb-8"
        >
          {months.map((m, i) => {
            const selected = i === index;
            return (
              <button
                key={m.name}
                type="button"
                aria-pressed={selected}
                aria-label={m.name}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-[50px] cursor-pointer rounded-full border text-[15px]/[20px] transition-[background-color,border-color,color,scale] duration-[250ms] ease-out-quad active:scale-[0.97] motion-reduce:transition-none max-md:h-11 max-md:text-[14px]",
                  selected
                    ? "border-v2-sky bg-v2-sky text-[#10212b]"
                    : "border-white/22 bg-white/4 text-white hover:border-white/45",
                )}
              >
                {m.name.slice(0, 3)}
              </button>
            );
          })}
        </div>

        <div className="flex items-stretch gap-16 max-xl:gap-10 max-lg:flex-col max-lg:gap-8">
          <div
            key={month.name}
            aria-live="polite"
            className="v2-step-in flex w-[560px] shrink-0 max-xl:w-[46%] flex-col gap-[18px] bg-white/6 p-8 max-lg:w-full max-md:gap-3.5 max-md:p-6"
          >
            <div className="text-[14px]/[20px] text-v2-sky">{month.name} in Sri Lanka</div>
            <h3 className="m-0 font-heading text-[28px]/[36px] font-semibold tracking-[-0.01em] text-white max-md:text-[22px]/[30px]">
              {month.title}
            </h3>
            <p className="m-0 text-[16px]/[26px] text-[#c4d2db] max-md:text-[15px]/[24px]">
              {month.body}
            </p>
            <Link
              href="/packages"
              className="mt-auto inline-flex items-center gap-2.5 self-start rounded-full border border-white/40 px-5 py-3 text-[15px] text-white hover:bg-white/8 max-md:mt-2"
            >
              Journeys for {month.name} <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
            {regions.map((region, i) => {
              const level = month.ratings[i];
              return (
                <div
                  key={region.name}
                  className={cn(
                    "flex items-center justify-between gap-6 px-[22px] py-3.5 transition-colors duration-[250ms] motion-reduce:transition-none max-md:gap-4 max-md:px-4",
                    level === 3 ? "bg-white/8" : "bg-white/3",
                  )}
                >
                  <div className="flex min-w-0 flex-col gap-[3px]">
                    <h3 className="m-0 font-heading text-[18px]/[26px] font-semibold text-white max-md:text-[16px]/[23px]">
                      {region.name}
                    </h3>
                    <div className="text-[14px]/[20px] text-[#b8c8d1] max-md:text-[13px]/[18px]">
                      {region.note}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 max-md:flex-col-reverse max-md:items-end max-md:gap-1.5">
                    <div className={cn("text-[14px]/[20px] max-md:text-[13px]/[18px]", levelText[level])}>
                      {levelLabels[level]}
                    </div>
                    <div aria-hidden className="flex gap-[5px]">
                      {[1, 2, 3].map((n) => (
                        <span
                          key={n}
                          className={cn(
                            "size-[9px] rounded-full transition-colors duration-[250ms] motion-reduce:transition-none",
                            n <= level ? levelDot[level] : "bg-white/14",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="mt-3.5 mb-0 text-[13px]/[20px] text-[#8192a3]">{monthPicker.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
