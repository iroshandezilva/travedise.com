import Link from "next/link";

import { routeQuestions } from "@/content/v2/home";

/**
 * Three numbered questions that shape an itinerary. On a phone they become a snapping
 * rail and lose the numerals, which only read as a sequence when all three are in view.
 */
export function RouteQuestions() {
  return (
    <section className="w-full shrink-0 overflow-clip bg-white py-[83px] gutter-v2 max-md:px-0 max-md:py-14">
      <div className="container-v2 flex flex-col items-stretch gap-12 max-md:gap-[26px]">
        <div className="flex items-end justify-between max-lg:flex-col max-lg:items-start max-lg:gap-5 max-md:gap-4 max-md:px-5">
          <h2 className="m-0 font-soul text-[46px]/[54px] font-medium text-v2-navy max-md:text-[30px]/[38px]">
            Leave room for the day itself.
          </h2>
          <p className="m-0 w-[300px] shrink-0 text-[17px]/[25px] text-v2-navy max-lg:w-full max-lg:max-w-[430px] max-md:text-[15px]/[24px] max-md:text-[#485055]">
            Beautiful places are only part of the plan. These are the questions that help a trip
            feel right.
          </p>
        </div>

        <div className="v2-rail grid grid-cols-3 gap-[17px] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-5">
          {routeQuestions.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 pt-4 max-md:w-[264px] max-md:shrink-0 max-md:snap-start max-md:gap-3 max-md:pt-0"
            >
              <span className="font-soul text-[45px]/[56px] font-medium text-v2-navy max-md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="block h-[170px] w-full object-cover max-md:h-[150px]"
              />
              <span className="font-soul text-[25px]/[32px] font-medium text-v2-navy max-md:text-[21px]/[27px]">
                {item.title}
              </span>
              <span className="text-[16px]/[24px] text-v2-navy max-md:text-[15px]/[23px] max-md:text-v2-body">
                {item.body}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="flex h-12 w-[218px] items-center justify-center gap-3.5 self-start rounded-3xl bg-v2-navy max-md:mx-5 max-md:h-[52px] max-md:w-auto max-md:self-stretch max-md:rounded-[26px]"
        >
          <span className="text-[15px]/[20px] font-medium text-white">How we plan with you</span>
          <span className="text-[15px]/[20px] font-bold text-white max-md:font-medium">↗</span>
        </Link>
      </div>
    </section>
  );
}
