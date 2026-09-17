import Link from "next/link";

import { routeQuestions } from "@/content/home-v2";

/** Three numbered questions that shape an itinerary. */
export function RouteQuestions() {
  return (
    <section className="w-full shrink-0 bg-white py-[83px] gutter-v2 max-md:py-14">
      <div className="container-v2 flex flex-col items-stretch gap-12">
        <div className="flex items-end justify-between max-lg:flex-col max-lg:items-start max-lg:gap-5">
          <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[32px]/[40px]">
            Leave room for the day itself.
          </h2>
          <p className="m-0 w-[300px] shrink-0 text-[17px]/[25px] text-v2-navy max-lg:w-full max-lg:max-w-[430px]">
            Beautiful places are only part of the plan. These are the questions that help a trip
            feel right.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[17px] max-md:grid-cols-1 max-md:gap-10">
          {routeQuestions.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-4 pt-4">
              <span className="font-soul text-[45px]/[56px] font-medium text-v2-navy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="block h-[170px] w-full object-cover"
              />
              <span className="font-soul text-[25px]/[32px] font-medium text-v2-navy">
                {item.title}
              </span>
              <span className="text-[16px]/[24px] text-v2-navy">{item.body}</span>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="flex h-12 w-[218px] items-center justify-center gap-3.5 self-start rounded-3xl bg-v2-navy"
        >
          <span className="text-[15px]/[20px] font-medium text-white">How we plan with you</span>
          <span className="text-[15px]/[20px] font-bold text-white">↗</span>
        </Link>
      </div>
    </section>
  );
}
