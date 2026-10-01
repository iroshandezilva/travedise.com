import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContainedCta } from "@/components/v2/contained-cta";
import { FooterWide } from "@/components/v2/footer-wide";
import { PlaceHero } from "@/components/v2/places/hero";
import {
  PlaceDoing,
  PlaceIntro,
  PlaceJourneys,
  PlaceNearby,
  PlaceSeasons,
} from "@/components/v2/places/sections";
import { placeBySlug, placeSlugs } from "@/content/v2/places";

type Params = { slug: string };

/** Static export: every place in `places` gets a page. */
export function generateStaticParams(): Params[] {
  return placeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const place = placeBySlug[slug];
  if (!place) return {};

  const title = `${place.name}, Sri Lanka — Travedise`;
  return {
    title,
    description: place.summary,
    alternates: { canonical: `/places/${slug}` },
    openGraph: { images: [place.image.src], title, description: place.summary, type: "article" },
    twitter: {
      images: [place.image.src],
      card: "summary_large_image",
      title,
      description: place.summary,
    },
  };
}

/**
 * The place template. Everything on the page comes from the place's entry in
 * `content/v2/places.ts`; the months come from its region's row in the month guide, and
 * the journeys from the routes that stop there.
 */
export default async function PlacePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const place = placeBySlug[slug];
  if (!place) notFound();

  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PlaceHero place={place} />
      <main>
        <PlaceIntro place={place} />
        <PlaceDoing place={place} />
        <PlaceSeasons place={place} />
        <PlaceJourneys place={place} />
        <PlaceNearby place={place} />
        <ContainedCta
          heading={
            <>
              Want {place.name} <em className="italic">in your</em> route?
            </>
          }
          body={place.ctaBody}
          action="Plan your journey"
        />
      </main>
      <FooterWide />
    </div>
  );
}
