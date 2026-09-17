import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
  description:
    "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
  alternates: { canonical: "/packages/hillcountry" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
    description:
      "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
    description:
      "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
  },
};

export default function HillcountryPage() {
  return <PackageDetailPage pkg={packageDetails["hillcountry"]} />;
}
