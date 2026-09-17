"use client";

import Link from "next/link";
import { useState } from "react";

import {
  experienceFilters,
  experiences,
  type ExperienceFilter,
  type Experience,
} from "@/content/v2/home";
import { cn } from "@/lib/cn";

/** Four entry points into the island, narrowed by the chip row above them. */
export function Experiences() {
  const [active, setActive] = useState<ExperienceFilter>("All");
  const shown: Experience[] =
    active === "All" ? experiences : experiences.filter((e) => e.tags.includes(active));

  return (
    <section
      id="experiences"
      className="w-full shrink-0 bg-v2-cream py-[88px] gutter-v2 max-md:py-14"
    >
      <div className="container-v2 flex flex-col gap-[34px] max-md:gap-6">
        <div className="flex items-start justify-between max-lg:flex-col max-lg:gap-5 max-md:gap-6">
          <h2 className="m-0 w-[850px] shrink-0 font-soul text-[43px]/[51px] font-medium text-v2-navy max-lg:w-full max-md:text-[30px]/[38px]">
            What draws you to the island?
          </h2>
          <p className="m-0 w-[330px] shrink-0 text-[16px]/[25px] text-v2-navy max-lg:w-full max-lg:max-w-[430px] max-md:text-[15px]/[24px] max-md:text-[#485055]">
            A place, a small moment, a day outdoors. Choose what matters to you and explore from
            there.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter experiences"
          className="flex flex-wrap gap-2.5 max-md:gap-2"
        >
          {experienceFilters.map((filter) => {
            const on = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(filter)}
                className={cn(
                  "rounded-[30px] border px-5 py-3 text-[15px]/[1.2] transition-colors duration-200 max-md:px-[18px] max-md:py-[11px] max-md:text-[14px]",
                  on
                    ? "border-v2-navy bg-v2-navy text-white"
                    : "border-[#a9a9a3] bg-transparent text-v2-navy hover:border-v2-navy",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Stays two-up on a phone rather than collapsing to a single column.
            Keyed on the filter so the new set starts from `@starting-style` — without
            it the grid swaps in a single frame, which is the one hard cut on the page. */}
        <div
          key={active}
          className="grid grid-cols-4 gap-4 transition-[opacity,translate] duration-200 ease-out-quart max-lg:grid-cols-2 max-md:gap-3 motion-reduce:transition-none starting:translate-y-2 starting:opacity-0"
        >
          {shown.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col gap-3 max-md:gap-2.5"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="block h-[322px] w-full object-cover v2-card-img max-md:h-[200px]"
                />
              </div>
              {/* The arrow sits at the far edge on desktop and follows the title on a phone. */}
              <div className="flex h-[34px] items-center justify-between max-md:h-auto max-md:justify-start max-md:gap-1.5">
                <span className="text-[16px]/[22px] font-semibold text-v2-navy max-md:text-[15px]/[20px]">
                  {item.title}
                </span>
                <span className="text-[16px]/[22px] font-semibold text-v2-navy max-md:text-[15px]/[20px]">
                  ↗
                </span>
              </div>
              <span className="text-[15px]/[22px] text-v2-body max-md:text-[14px]/[20px]">
                {item.body}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
