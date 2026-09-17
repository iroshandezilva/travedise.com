import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";

export const metadata: Metadata = {
  title: "Scenic Sri Lanka - Travedise - Your Next Adventure Starts Here",
  description: "From Sigiriya rock fortress to Yala National Park and breathtaking views.",
  alternates: { canonical: "/packages/scenic-sri-lanka" },
  openGraph: {
    title: "Scenic Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "From Sigiriya rock fortress to Yala National Park and breathtaking views.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scenic Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description: "From Sigiriya rock fortress to Yala National Park and breathtaking views.",
  },
};

export default function ScenicSriLankaPage() {
  return <PackageDetailPage pkg={packageDetails["scenic-sri-lanka"]} />;
}
