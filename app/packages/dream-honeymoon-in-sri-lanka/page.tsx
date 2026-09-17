import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";

export const metadata: Metadata = {
  title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
  description: "Slow, intimate and indulgent, written for two.",
  alternates: { canonical: "/packages/dream-honeymoon-in-sri-lanka" },
  openGraph: {
    title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "Slow, intimate and indulgent, written for two.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "Slow, intimate and indulgent, written for two.",
  },
};

export default function DreamHoneymoonInSriLankaPage() {
  return <PackageDetailPage pkg={packageDetails["dream-honeymoon-in-sri-lanka"]} />;
}
