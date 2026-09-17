import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { AboutIntroSection } from "@/components/about/about-intro-section";
import { FeaturedStaysSection } from "@/components/about/featured-stays-section";
import { BlogSection } from "@/components/site/blog-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "About - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "About - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function AboutPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <Navbar variant="transparent" current="/about" />
      <main>
        <AboutHero />
        <FeaturedStaysSection />
        <AboutIntroSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
