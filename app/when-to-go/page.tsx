import type { Metadata } from "next";

import { FooterWide } from "@/components/v2/footer-wide";
import { ReadyBand } from "@/components/v2/home/ready-band";
import { WhenToGoHero } from "@/components/v2/when-to-go/hero";
import { MonthPicker } from "@/components/v2/when-to-go/month-picker";
import { YearGrid } from "@/components/v2/when-to-go/year-grid";
import { whenToGoHero } from "@/content/v2/when-to-go";

const TITLE = "When to go to Sri Lanka, month by month — Travedise";

export const metadata: Metadata = {
  title: TITLE,
  description: whenToGoHero.body,
  alternates: { canonical: "/when-to-go" },
  openGraph: {
    images: [whenToGoHero.image],
    title: TITLE,
    description: whenToGoHero.body,
    type: "website",
  },
  twitter: {
    images: [whenToGoHero.image],
    card: "summary_large_image",
    title: TITLE,
    description: whenToGoHero.body,
  },
};

/**
 * The month guide. Driven by `content/v2/when-to-go.ts` — the month picker and the
 * year grid both read the same ratings table.
 */
export default function WhenToGoPage() {
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <WhenToGoHero />
      <main>
        <MonthPicker />
        <YearGrid />
        <ReadyBand above="white" />
      </main>
      <FooterWide
        statement="A small island with long days in it. Plan it once, properly, and it stays with you for years."
        statementFace="body"
      />
    </div>
  );
}
