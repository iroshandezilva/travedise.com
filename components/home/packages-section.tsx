import { PackageCardGrid } from "@/components/site/package-card";
import { packagesFor } from "@/content/packages";

import { SectionHeading } from "./section-heading";

/** "Travel Packages": heading and the three featured package cards. */
export function PackagesSection() {
  return (
    <section className="bg-[url(/assets/69c38c90a6a389dfc5835218_Vector.webp)] bg-size-[100%_757px] bg-bottom bg-no-repeat">
      <div className="container-site">
        <div className="flex size-full flex-col items-center justify-center gap-20 py-[120px] max-lg:gap-10 max-lg:py-20 max-md:gap-[30px] max-md:py-[60px]">
          <SectionHeading
            tag="Travel Packages"
            title="Curated tour packages designed for every kind of traveler — from beach lovers to mountain explorers."
          />
          <PackageCardGrid packages={packagesFor("home")} layout="home" />
        </div>
      </div>
    </section>
  );
}
