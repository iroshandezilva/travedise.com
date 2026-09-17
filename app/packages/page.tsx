import type { Metadata } from "next";

import { PackagesHero } from "@/components/packages/packages-hero";
import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { siteFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Packages - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function PackagesPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar current="/packages" />
      <main>
        <PackagesHero />
        <FaqSection items={siteFaqs} />
      </main>
      <Footer />
    </div>
  );
}
