import type { Metadata } from "next";

import { FooterWide } from "@/components/v2/footer-wide";
import { Frames } from "@/components/v2/home/frames";
import { Hero } from "@/components/v2/home/hero";
import { Journeys } from "@/components/v2/home/journeys";
import { PlanningSteps } from "@/components/v2/home/planning-steps";
import { ProofStrip } from "@/components/v2/home/proof-strip";
import { ReadyBand } from "@/components/v2/home/ready-band";
import { Regions } from "@/components/v2/home/regions";
import { Team } from "@/components/v2/home/team";
import { TravelNotes } from "@/components/v2/home/travel-notes";
import { Questions } from "@/components/v2/questions";
import { hero, homeQuestions } from "@/content/v2/home";
import { images } from "@/content/v2/images";

const TITLE = "Travedise — See Sri Lanka. Keep time for what matters.";
const DESCRIPTION = hero.body;

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
 * Home page, v2 — the "Home V8 Decision path" design. Self-contained: its own palette,
 * Ragmont display type, and its own nav and footer, none of which the rest of the site
 * uses yet. The live home page at `/` is untouched.
 */
export default function HomeV2Page() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <Hero />
      <main>
        <ProofStrip />
        <Regions />
        <Journeys />
        <Frames />
        <Team />
        <PlanningSteps />
        <TravelNotes />
        <Questions items={homeQuestions} />
        <ReadyBand />
      </main>
      <FooterWide
        statement="A small island with long days in it. Plan it once, properly, and it stays with you for years."
        statementFace="body"
      />
    </div>
  );
}
