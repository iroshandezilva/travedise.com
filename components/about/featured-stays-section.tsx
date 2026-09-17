import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { featuredStays, featuredStaysHeading, type FeaturedStay } from "@/content/about";

import { FeaturedStaysSlider } from "./featured-stays-slider";

/** "Featured Stays" heading, the hotel carousel and the active hotel's card. */
export function FeaturedStaysSection({ stays = featuredStays }: { stays?: FeaturedStay[] }) {
  return (
    <section>
      <div className="container-site">
        <div className="flex flex-col items-center justify-center gap-20 py-[120px] max-lg:gap-15 max-lg:py-20 max-md:gap-7.5 max-md:py-15 max-sm:pb-[100px]">
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
            <Reveal delay={50}>
              <SectionTag>{featuredStaysHeading.tag}</SectionTag>
            </Reveal>
            <Reveal as="h2" delay={100} className="m-0 text-center font-serif">
              {featuredStaysHeading.title}
            </Reveal>
          </div>
          <FeaturedStaysSlider stays={stays} />
        </div>
      </div>
    </section>
  );
}
