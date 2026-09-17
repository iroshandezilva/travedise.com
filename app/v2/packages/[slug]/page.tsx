import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/v2/cta-band";
import { FooterWide } from "@/components/v2/footer-wide";
import { ContainedCta } from "@/components/v2/package/contained-cta";
import { PackageFacts } from "@/components/v2/package/facts";
import { PackageHero } from "@/components/v2/package/hero";
import { PackageIncludes } from "@/components/v2/package/includes";
import { PackageItinerary } from "@/components/v2/package/itinerary";
import { Questions } from "@/components/v2/questions";
import { packageQuestions, packagesV2, packageV2Slugs } from "@/content/v2/packages";

type Params = { slug: string };

/** Static export: only the journeys written up for v2 get a page. */
export function generateStaticParams(): Params[] {
  return packageV2Slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packagesV2[slug as keyof typeof packagesV2];
  if (!pkg) return {};

  const title = `${pkg.title} — Travedise`;
  return {
    title,
    description: pkg.summary,
    alternates: { canonical: `/v2/packages/${slug}` },
    // A design preview, not a page we want ranking against the live package page.
    robots: { index: false, follow: true },
    openGraph: {
      images: [pkg.shots[0].src],
      title,
      description: pkg.summary,
      type: "article",
    },
    twitter: {
      images: [pkg.shots[0].src],
      card: "summary_large_image",
      title,
      description: pkg.summary,
    },
  };
}

/**
 * The v2 package template. Everything on the page comes from `packagesV2`, so a new
 * journey is a content entry rather than a new page. The nav, the questions and the
 * closing band are the same components the v2 home page uses.
 */
export default async function PackageV2Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const pkg = packagesV2[slug as keyof typeof packagesV2];
  if (!pkg) notFound();

  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PackageHero title={pkg.title} summary={pkg.summary} shots={pkg.shots} />
      <main>
        <PackageFacts facts={pkg.facts} />
        <PackageIncludes includes={pkg.includes} />
        <PackageItinerary itinerary={pkg.itinerary} />
        <ContainedCta />
        <Questions items={packageQuestions} />
        <CtaBand />
      </main>
      <FooterWide />
    </div>
  );
}
