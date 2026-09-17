import Link from "next/link";

import { featuredJourneys, moreJourneys } from "@/content/home-v2";

/** Three large journey cards, then a row of three smaller ones. */
export function Journeys() {
  return (
    <section id="journeys" className="w-full shrink-0 bg-white py-[77px] gutter-v2 max-md:py-14">
      <div className="container-v2 flex flex-col gap-[34px]">
        <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-5">
          <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[32px]/[40px]">
            A starting point, shaped with you.
          </h2>
          <Link
            href="/packages"
            className="inline-block border-b border-v2-navy pb-2 text-[16px]/[1.2] text-v2-navy"
          >
            Browse journeys ↗
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {featuredJourneys.map((journey) => (
            <Link
              key={journey.title}
              href={journey.href}
              className="group flex flex-col gap-[11px]"
            >
              <div className="overflow-hidden">
                <img
                  src={journey.image}
                  alt=""
                  loading="lazy"
                  className="block h-[390px] w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                />
              </div>
              <span className="font-soul text-[27px]/[34px] font-medium text-v2-navy">
                {journey.title} ↗
              </span>
              <span className="text-[15px]/[23px] text-v2-body">{journey.body}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
