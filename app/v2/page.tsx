import type { Metadata } from "next";

import { AboutBand } from "@/components/home-v2/about-band";
import { CtaBand } from "@/components/home-v2/cta-band";
import { Experiences } from "@/components/home-v2/experiences";
import { FieldNote } from "@/components/home-v2/field-note";
import { Footer } from "@/components/home-v2/footer";
import { Gallery } from "@/components/home-v2/gallery";
import { Hero } from "@/components/home-v2/hero";
import { Journeys } from "@/components/home-v2/journeys";
import { Overview } from "@/components/home-v2/overview";
import { PlanningProcess } from "@/components/home-v2/planning-process";
import { Questions } from "@/components/home-v2/questions";
import { RouteQuestions } from "@/components/home-v2/route-questions";
import { TravelNotes } from "@/components/home-v2/travel-notes";
import { images } from "@/content/home-v2";

const TITLE = "Travedise — See Sri Lanka. Keep time for what matters.";
const DESCRIPTION =
  "Tell us what you hope to see, and what you would rather not rush. We’ll shape a journey around the moments that matter.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/v2" },
  // A design preview, not the page we want ranking against the live home page.
  robots: { index: false, follow: true },
  openGraph: {
    images: [images.heroPoster],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    images: [images.heroPoster],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Home page, v2 — the "Report-led coastal" design. Self-contained: its own palette,
 * LT Soul display type, and its own nav and footer, none of which the rest of the
 * site uses yet. The live home page at `/` is untouched.
 */
export default function HomeV2Page() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-v2-navy">
      <Hero />
      <main>
        <Overview />
        <Experiences />
        <Journeys />
        <Gallery />
        <FieldNote />
        <RouteQuestions />
        <AboutBand />
        <PlanningProcess />
        <TravelNotes />
        <Questions />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
