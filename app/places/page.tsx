import type { Metadata } from "next";

import { ContainedCta } from "@/components/v2/contained-cta";
import { FooterWide } from "@/components/v2/footer-wide";
import { PlacesExplorer } from "@/components/v2/places/explorer";
import { PlacesHero } from "@/components/v2/places/hero";
import { placesHero } from "@/content/v2/places";

const TITLE = "Places in Sri Lanka we know well — Travedise";

export const metadata: Metadata = {
  title: TITLE,
  description: placesHero.body,
  alternates: { canonical: "/places" },
  openGraph: {
    images: [placesHero.image],
    title: TITLE,
    description: placesHero.body,
    type: "website",
  },
  twitter: {
    images: [placesHero.image],
    card: "summary_large_image",
    title: TITLE,
    description: placesHero.body,
  },
};

/**
 * The places index. Driven by `content/v2/places.ts` — the map, the region list and the
 * grid all read the same entries, and each card opens that place's own page.
 */
export default function PlacesPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PlacesHero />
      <main>
        <PlacesExplorer />
        <ContainedCta
          className="pt-0"
          heading={
            <>
              Not sure <em className="italic">where to start</em>?
            </>
          }
          body="Tell us what you like and when you can travel. We will suggest the places and join them into a route."
          action="Plan your journey"
        />
      </main>
      <FooterWide />
    </div>
  );
}
