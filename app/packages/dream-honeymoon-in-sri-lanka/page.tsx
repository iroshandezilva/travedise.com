import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
  description: "Slow, intimate and indulgent, written for two.",
  alternates: { canonical: "/packages/dream-honeymoon-in-sri-lanka" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "Slow, intimate and indulgent, written for two.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Honeymoon In Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "Slow, intimate and indulgent, written for two.",
  },
};

export default function DreamHoneymoonInSriLankaPage() {
  return <PackageDetailPage pkg={packageDetails["dream-honeymoon-in-sri-lanka"]} />;
}
