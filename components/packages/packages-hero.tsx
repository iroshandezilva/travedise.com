import { PackageCardGrid } from "@/components/site/package-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { packageTabs, packagesFor } from "@/content/packages";

import { PackageTabs } from "./package-tabs";

/**
 * Top of /packages (Webflow `section.packages-hero-section`): "Packages" tag, heading and
 * the category tabs with a package card grid per tab.
 */
export function PackagesHero() {
  return (
    <section>
      <div className="container-site max-w-[1086px]">
        <div className="flex flex-col items-center justify-center gap-10 pt-[150px] pb-[120px] max-lg:pt-[140px] max-lg:pb-20 max-md:pt-[120px] max-md:pb-15 max-sm:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-[25px] max-md:gap-4">
            <Reveal delay={50}>
              <SectionTag>Packages</SectionTag>
            </Reveal>
            <Reveal
              as="h2"
              delay={100}
              className="text-center font-serif max-lg:text-[40px] max-md:text-[32px]"
            >
              Discover travel packages to suit every type of explorer from solo wanderers to
              families
            </Reveal>
          </div>
          <PackageTabs
            label="Package categories"
            tabs={packageTabs.map((tab) => ({
              label: tab.label,
              content: (
                <PackageCardGrid
                  packages={packagesFor("packagesPage", tab.category)}
                  layout="listing"
                  reveal={!tab.category}
                />
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
