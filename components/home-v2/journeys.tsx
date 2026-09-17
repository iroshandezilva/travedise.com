import Link from "next/link";

import { featuredJourneys, moreJourneys, railJourney } from "@/content/home-v2";

/**
 * Three large journey cards, then a row of three smaller ones. On a phone the large
 * cards become a snapping rail that scrolls edge to edge, the honeymoon journey joins
 * the end of it, and the smaller row drops away.
 */
export function Journeys() {
  return (
    <section
      id="journeys"
      className="w-full shrink-0 overflow-clip bg-white py-[77px] gutter-v2 max-md:px-0 max-md:py-14"
    >
      <div className="container-v2 flex flex-col gap-[34px] max-md:gap-[26px]">
        <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-3.5 max-md:px-5">
          <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[30px]/[38px]">
            A starting point, shaped with you.
          </h2>
          <Link
            href="/packages"
            className="inline-block border-b border-v2-navy pb-2 text-[16px]/[1.2] text-v2-navy max-md:border-0 max-md:pb-0 max-md:text-[15px]/[20px] max-md:text-[#126a8f]"
          >
            <span className="max-md:hidden">Browse journeys ↗</span>
            <span className="hidden max-md:inline">Browse all journeys ↗</span>
          </Link>
        </div>

        <div className="v2-rail grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-5">
          {[...featuredJourneys, railJourney].map((journey, i) => (
            <Link
              key={journey.title}
              href={journey.href}
              className={`group flex flex-col gap-[11px] max-md:w-[260px] max-md:shrink-0 max-md:snap-start max-md:gap-2.5 ${
                // The fourth card only belongs to the phone rail.
                i === featuredJourneys.length ? "hidden max-md:flex" : ""
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={journey.image}
                  alt=""
                  loading="lazy"
                  className="block h-[390px] w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] max-md:h-[300px]"
                />
              </div>
              <span className="font-soul text-[27px]/[34px] font-medium text-v2-navy max-md:text-[21px]/[27px]">
                {journey.title} ↗
              </span>
              <span className="text-[15px]/[23px] text-v2-body max-md:text-[14px]/[21px]">
                {journey.body}
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:hidden">
          {moreJourneys.map((journey) => (
            <Link
              key={journey.title}
              href={journey.href}
              className="flex items-center gap-4 pt-[13px]"
            >
              <img
                src={journey.image}
                alt=""
                loading="lazy"
                className="block h-[78px] w-[116px] shrink-0 object-cover"
              />
              <span className="font-soul text-[21px]/[28px] font-medium text-v2-navy">
                {journey.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
