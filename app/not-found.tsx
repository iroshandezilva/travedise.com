import type { Metadata } from "next";

import { PillLink } from "@/components/v2/buttons";
import { FooterWide } from "@/components/v2/footer-wide";
import { PlainHero } from "@/components/v2/plain-hero";

export const metadata: Metadata = {
  title: "Page not found — Travedise",
  robots: { index: false, follow: false },
};

/** Shown when a link does not match a page. */
export default function NotFound() {
  return (
    <div className="v2 flex min-h-screen flex-col overflow-clip bg-white">
      <PlainHero
        title="This page is not here."
        body="The link may be old, or the page has moved."
      />
      <main className="container-v2 flex flex-col items-start gap-4 gutter-v2 py-16 max-md:py-12">
        <PillLink href="/">Back to the home page</PillLink>
        <PillLink href="/plan-your-trip" variant="outline">
          Plan your journey
        </PillLink>
      </main>
      <FooterWide statementFace="body" />
    </div>
  );
}
