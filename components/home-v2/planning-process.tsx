import Link from "next/link";

import { planningSteps } from "@/content/home-v2";

/** The four steps from first message to departure, on navy. */
export function PlanningProcess() {
  return (
    <section id="about" className="w-full shrink-0 bg-v2-navy py-30 gutter-v2 max-md:py-16">
      <div className="container-v2 flex items-start justify-between gap-15 max-lg:flex-col max-lg:gap-12">
        <div className="flex flex-col items-start gap-[174px] max-lg:gap-12">
          <div className="flex w-[560px] flex-col gap-5 max-lg:w-full">
            <h2 className="m-0 font-soul text-[46px]/[52px] font-normal text-white max-md:text-[32px]/[40px]">
              Start with a conversation.
            </h2>
            <p className="m-0 max-w-[505px] text-[18px]/[27px] text-[#d9e1e5]">
              A good plan begins with what you want from the trip. Our team listens first, then
              helps shape the route, stays, and days with you.
            </p>
          </div>
          <div className="flex w-[505px] items-end justify-between pt-6 max-lg:w-full max-lg:max-w-[505px]">
            <div className="flex flex-col gap-[7px]">
              <span className="font-soul text-[28px]/[33px] text-white">Meet Chamara</span>
              <span className="text-[15px]/[20px] text-[#b8c8d1]">Founder, Travedise</span>
            </div>
            <Link href="/about" className="text-[15px]/[20px] text-v2-sky">
              Read our story ↗
            </Link>
          </div>
        </div>

        <ol className="m-0 flex w-[660px] shrink-0 list-none flex-col gap-[19px] p-0 max-lg:w-full">
          {planningSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex min-h-[108px] gap-[19px] pt-5 max-sm:flex-col max-sm:gap-3"
            >
              <span className="w-[54px] shrink-0 font-soul text-[30px]/[35px] text-v2-sand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-[210px] shrink-0 font-soul text-[23px]/[28px] text-white max-sm:w-full">
                {step.title}
              </span>
              <span className="min-w-0 flex-1 text-[16px]/[23px] text-v2-muted">{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
