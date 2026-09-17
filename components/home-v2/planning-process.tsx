import Link from "next/link";

import { planningSteps } from "@/content/home-v2";

/**
 * The four steps from first message to departure, on navy. The step numerals are a
 * desktop device — on a phone the list reads in order without them.
 */
export function PlanningProcess() {
  return (
    <section id="about" className="w-full shrink-0 bg-v2-navy py-30 gutter-v2 max-md:py-16">
      <div className="container-v2 flex items-start justify-between gap-15 max-lg:flex-col max-lg:gap-12 max-md:gap-7">
        <div className="flex flex-col items-start gap-[174px] max-lg:gap-12 max-md:w-full max-md:gap-7">
          <div className="flex w-[560px] flex-col gap-5 max-lg:w-full max-md:gap-7">
            <h2 className="m-0 font-soul text-[46px]/[52px] font-normal text-white max-md:text-[32px]/[40px]">
              Start with a conversation.
            </h2>
            <p className="m-0 max-w-[505px] text-[18px]/[27px] text-[#d9e1e5] max-md:text-[16px]/[25px]">
              A good plan begins with what you want from the trip. Our team listens first, then
              helps shape the route, stays, and days with you.
            </p>
          </div>
          <div className="flex w-[505px] items-end justify-between pt-6 max-lg:w-full max-lg:max-w-[505px] max-md:max-w-none max-md:items-center max-md:gap-4 max-md:pt-0">
            <div className="flex flex-col gap-[7px] max-md:gap-[5px]">
              <span className="font-soul text-[28px]/[33px] text-white max-md:text-[22px]/[28px]">
                Meet Chamara
              </span>
              <span className="text-[15px]/[20px] text-[#b8c8d1] max-md:text-[14px]">
                Founder, Travedise
              </span>
            </div>
            <Link href="/about" className="text-[15px]/[20px] text-v2-sky max-md:text-[14px]">
              Read our story ↗
            </Link>
          </div>
        </div>

        <ol className="m-0 flex w-[660px] shrink-0 list-none flex-col gap-[19px] p-0 max-lg:w-full max-md:gap-6">
          {planningSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex min-h-[108px] gap-[19px] pt-5 max-md:min-h-0 max-md:flex-col max-md:gap-1.5 max-md:pt-0"
            >
              <span className="w-[54px] shrink-0 font-soul text-[30px]/[35px] text-v2-sand max-md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-[210px] shrink-0 font-soul text-[23px]/[28px] text-white max-md:w-full max-md:text-[20px]/[26px]">
                {step.title}
              </span>
              <span className="min-w-0 flex-1 text-[16px]/[23px] text-v2-muted max-md:text-[15px]/[23px]">
                {step.body}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
