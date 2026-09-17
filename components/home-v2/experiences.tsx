"use client";

import Link from "next/link";
import { useState } from "react";

import {
  experienceFilters,
  experiences,
  type ExperienceFilter,
  type Experience,
} from "@/content/home-v2";
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
      <div className="container-v2 flex flex-col gap-[34px]">
        <div className="flex items-start justify-between max-lg:flex-col max-lg:gap-5">
          <h2 className="m-0 w-[850px] shrink-0 font-soul text-[43px]/[51px] font-medium text-v2-navy max-lg:w-full max-md:text-[32px]/[40px]">
            What draws you to the island?
          </h2>
          <p className="m-0 w-[330px] shrink-0 text-[16px]/[25px] text-v2-navy max-lg:w-full max-lg:max-w-[430px]">
            A place, a small moment, a day outdoors. Choose what matters to you and explore from
            there.
          </p>
        </div>

        <div role="group" aria-label="Filter experiences" className="flex flex-wrap gap-2.5">
          {experienceFilters.map((filter) => {
            const on = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(filter)}
                className={cn(
                  "rounded-[30px] border px-5 py-3 text-[15px]/[1.2] transition-colors duration-200",
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

        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {shown.map((item) => (
            <Link key={item.title} href={item.href} className="group flex flex-col gap-3">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="block h-[322px] w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex h-[34px] items-center justify-between">
                <span className="text-[16px]/[22px] font-semibold text-v2-navy">{item.title}</span>
                <span className="text-[16px]/[22px] font-semibold text-v2-navy">↗</span>
              </div>
              <span className="text-[15px]/[22px] text-v2-body">{item.body}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
