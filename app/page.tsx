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
import { SHARE_IMAGE } from "@/lib/site";

const TITLE = "Travedise — See Sri Lanka. Keep time for what matters.";
const DESCRIPTION = hero.body;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Home page — the "Home V8 Decision path" design, which lived at `/v2` while it was
 * being built. It brings its own palette, Ragmont for display type, and its own nav and
 * footer; the rest of the site still runs on the original design, so the links out of
 * here (About, Travel notes, the journey pages) cross into it.
 */
export default function HomePage() {
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
