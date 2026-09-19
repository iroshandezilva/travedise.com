"use client";

import { AccordionRow, useAccordion } from "@/components/v2/accordion";
import { Section } from "@/components/v2/section";
import type { PackageV2 } from "@/content/v2/packages";
import { cn } from "@/lib/cn";

/**
 * The route, day by day. Each row opens to show what the day holds, where you sleep,
 * and a strip of photos — which scrolls sideways rather than shrinking on a phone.
 */
export function PackageItinerary({ itinerary }: { itinerary: PackageV2["itinerary"] }) {
  const acc = useAccordion(0);

  return (
    <Section
      className="pt-2.5 pb-24 max-md:pt-0 max-md:pb-14"
      innerClassName="flex flex-col gap-[42px] max-md:gap-6"
    >
      <div className="flex items-end justify-between gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-4">
        <h2 className="m-0 font-display text-[46px]/[54px] font-normal text-[#14253a] max-md:text-[30px]/[38px]">
          {itinerary.heading}
        </h2>
        <p className="m-0 w-[370px] shrink-0 font-display text-[26px]/[34px] text-[#42586a] max-lg:w-full max-md:font-sans max-md:text-[15px]/[24px]">
          {itinerary.lede}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {itinerary.days.map((day, i) => {
          const open = acc.isOpen(i);
          return (
            <AccordionRow
              key={day.title}
              open={open}
              onToggle={() => acc.toggle(i)}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl transition-colors duration-200",
                open ? "bg-v2-cream" : "bg-[#fcfbf9]",
              )}
              buttonClassName="px-7 py-[26px] max-md:px-5 max-md:py-5"
              panelClassName="flex flex-col gap-6 px-7 pb-[30px] max-md:px-0 max-md:pb-6"
              aside={
                <span className="font-display text-[32px]/[40px] text-v2-sand max-md:text-[22px]/[28px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              }
              head={
                <span className="flex flex-col gap-2 max-md:gap-1">
                  <span className="text-[14px]/[20px] text-[#52687b]">{day.meta}</span>
                  <span className="font-display text-[27px]/[34px] font-medium text-v2-navy max-md:text-[20px]/[26px]">
                    {day.title}
                  </span>
                </span>
              }
            >
              <div className="flex items-start gap-16 max-lg:flex-col max-lg:gap-6 max-md:px-5">
                <p className="m-0 w-[520px] shrink-0 text-[17px]/[27px] text-[#42586a] max-lg:w-full max-md:text-[15px]/[24px]">
                  {day.body}
                </p>
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <img
                    src={day.stay.thumb}
                    alt={day.stay.name}
                    loading="lazy"
                    className="block size-24 shrink-0 rounded-lg object-cover max-md:size-20"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-[20px]/[26px] text-v2-navy max-md:text-[18px]/[24px]">
                      {day.stay.name}
                    </span>
                    <p className="m-0 text-[15px]/[24px] text-[#52687b] max-md:text-[14px]/[22px]">
                      {day.stay.note}
                    </p>
                  </div>
                </div>
              </div>

              <div className="v2-rail flex gap-3 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-5">
                {day.photos.map((photo) => (
                  <figure
                    key={photo.src + photo.caption}
                    className="m-0 flex w-80 shrink-0 flex-col gap-2 max-md:w-[250px] max-md:snap-start"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="block h-[210px] w-full rounded-lg object-cover max-md:h-[165px]"
                    />
                    <figcaption className="text-[13px]/[19px] text-[#6e808e]">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AccordionRow>
          );
        })}
      </div>
    </Section>
  );
}
