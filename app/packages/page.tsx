import type { Metadata } from "next";

import { ContainedCta } from "@/components/v2/contained-cta";
import { FooterWide } from "@/components/v2/footer-wide";
import { Gallery } from "@/components/v2/gallery";
import { JourneysHero } from "@/components/v2/packages/hero";
import { JourneyGrid } from "@/components/v2/packages/journey-grid";
import { JourneysIntro } from "@/components/v2/packages/intro";
import { MapExplorer } from "@/components/v2/packages/map-explorer";
import { journeysHero } from "@/content/v2/journeys";

const TITLE = "Journeys across Sri Lanka — Travedise";

export const metadata: Metadata = {
  title: TITLE,
  description: journeysHero.body,
  alternates: { canonical: "/packages" },
  openGraph: {
    images: [journeysHero.image],
    title: TITLE,
    description: journeysHero.body,
    type: "website",
  },
  twitter: {
    images: [journeysHero.image],
    card: "summary_large_image",
    title: TITLE,
    description: journeysHero.body,
  },
};

/**
 * The journeys index. Driven entirely by `content/v2/journeys.ts` — the map, the
 * route list and the cards all read the same six entries, so a route can never appear
 * in one and not the others.
 */
export default function JourneysPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <JourneysHero />
      <main>
        <JourneysIntro />
        <Gallery
          heading="The island, between the stops."
          lede="Frames from journeys we ran this year."
        />
        <MapExplorer />
        <JourneyGrid />
        <ContainedCta
          heading={
            <>
              Not quite the journey <em className="italic">you had</em> in mind?
            </>
          }
          body="Tell us what you would change and we will redraw the route around you."
        />
      </main>
      <FooterWide />
    </div>
  );
}
