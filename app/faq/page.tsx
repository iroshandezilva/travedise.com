import type { Metadata } from "next";

import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { faqPageFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function FaqPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar />
      <main>
        <FaqSection items={faqPageFaqs} variant="page" />
      </main>
      <Footer />
    </div>
  );
}
