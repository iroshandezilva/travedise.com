import { Itinerary } from "@/components/package-detail/itinerary";
import { PackageHero } from "@/components/package-detail/package-hero";
import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { siteFaqs } from "@/content/faqs";
import type { PackageDetail } from "@/content/package-details";

/**
 * A `/packages/<slug>` page: hero with gallery, itinerary, the site FAQ and footer.
 * `pkg: null` (a package without published content) renders just the shared sections.
 */
export function PackageDetailPage({ pkg }: { pkg: PackageDetail | null }) {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar fillOnScroll={false} hideOnScroll={false} />
      <main>
        {pkg && (
          <>
            <PackageHero pkg={pkg} />
            <Itinerary stops={pkg.itinerary} />
          </>
        )}
        <FaqSection items={siteFaqs} />
      </main>
      <Footer />
    </div>
  );
}
