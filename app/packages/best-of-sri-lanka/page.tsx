import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sri lanka With Little Ones - Travedise - Your Next Adventure Starts Here",
  description: "Family-paced and full of things to point at.",
  alternates: { canonical: "/packages/best-of-sri-lanka" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Sri lanka With Little Ones - Travedise - Your Next Adventure Starts Here",
    description: "Family-paced and full of things to point at.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Sri lanka With Little Ones - Travedise - Your Next Adventure Starts Here",
    description: "Family-paced and full of things to point at.",
  },
};

export default function BestOfSriLankaPage() {
  return <PackageDetailPage pkg={packageDetails["best-of-sri-lanka"]} />;
}
