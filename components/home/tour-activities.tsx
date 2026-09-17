import { activityTabs } from "@/content/home";

import { ActivityTabs } from "./activity-tabs";
import { SectionHeading } from "./section-heading";

/** "Our Tour Activities": intro heading, category tabs and a marquee of photos per tab. */
export function TourActivities() {
  return (
    <section className="bg-[url(/assets/69c38c90a6a389dfc5835218_Vector.webp)] bg-size-[100%_757px] bg-bottom bg-no-repeat">
      <div className="flex size-full flex-col items-center justify-center gap-10 py-[120px] max-lg:py-20 max-md:gap-[30px] max-md:pt-[280px] max-md:pb-[60px] max-sm:pt-16">
        <div className="container-site">
          <SectionHeading
            tag="Our Tour Activities"
            revealTitle={false}
            titleClassName="font-normal"
            title="Whether you’re chasing adventure, discovering culture, or simply looking for a moment of calm, Travedise brings you experiences made for every traveler."
          />
        </div>
        <ActivityTabs tabs={activityTabs} />
      </div>
    </section>
  );
}
