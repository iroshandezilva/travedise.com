import { Reveal } from "@/components/ui/reveal";
import { travelReasons } from "@/content/home";

import { SectionHeading } from "./section-heading";

/**
 * The navy "Travelers Review" panel: why this year is the time to go, as three cards
 * side by side (stacked ≤991px).
 */
export function TravelReasons() {
  return (
    <section className="mx-2.5 mt-2.5 rounded-panel bg-navy">
      <div className="container-site">
        <div className="relative flex size-full flex-col items-center justify-center gap-20 overflow-clip pt-20 pb-[150px] max-lg:gap-10 max-md:gap-[30px] max-md:pt-[60px] max-md:pb-[130px] max-sm:pt-8 max-sm:pb-[160px]">
          <SectionHeading
            tag="Travelers Review"
            tone="white"
            className="max-w-[700px]"
            title="The Best Time to See Sri Lanka Is This Year"
          />
          <Reveal delay={100} className="flex w-full gap-6 rounded-card max-lg:flex-col">
            {travelReasons.map((reason) => (
              <div key={reason.title} className="mr-6 w-full min-w-0 flex-[1_1_0]">
                <div className="flex h-[460px] w-full flex-col items-start justify-between gap-[121px] rounded-card bg-navy-800 p-[30px] max-md:h-[390px] max-md:gap-[114px] max-md:p-[25px] max-sm:px-4 max-sm:py-5">
                  <h3 className="m-0 font-serif text-[28px]/[113%] font-light text-white">
                    {reason.title}
                  </h3>
                  <div className="flex w-full flex-col gap-[30px] max-md:gap-5">
                    <p className="m-0 font-heading text-[20px]/[30px] font-light tracking-[0.3px] text-surface-3">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
