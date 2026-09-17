import type { Metadata } from "next";

import { AboutBand } from "@/components/v2/home/about-band";
import { CtaBand } from "@/components/v2/cta-band";
import { Experiences } from "@/components/v2/home/experiences";
import { FieldNote } from "@/components/v2/home/field-note";
import { Footer } from "@/components/v2/footer";
import { Gallery } from "@/components/v2/home/gallery";
import { Hero } from "@/components/v2/home/hero";
import { Journeys } from "@/components/v2/home/journeys";
import { Overview } from "@/components/v2/home/overview";
import { PlanningProcess } from "@/components/v2/home/planning-process";
import { Questions } from "@/components/v2/questions";
import { RouteQuestions } from "@/components/v2/home/route-questions";
import { TravelNotes } from "@/components/v2/home/travel-notes";
import { images } from "@/content/v2/images";

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
