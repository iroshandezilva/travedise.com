import type { Metadata } from "next";

import { BookingProcess } from "@/components/home/booking-process";
import { Hero } from "@/components/home/hero";
import { PackagesSection } from "@/components/home/packages-section";
import { TourActivities } from "@/components/home/tour-activities";
import { TravelReasons } from "@/components/home/travel-reasons";
import { BlogSection } from "@/components/site/blog-section";
import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { siteFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function HomePage() {
  return (
    <div className="overflow-clip pb-2.5">
      <Navbar variant="transparent" current="/" hideOnScroll={false} />
      <main>
        <Hero />
        <TourActivities />
        <BookingProcess />
        <PackagesSection />
        <TravelReasons />
        <BlogSection />
        <FaqSection items={siteFaqs} />
      </main>
      <Footer />
    </div>
  );
}
