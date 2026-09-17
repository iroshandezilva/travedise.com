import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";

export const metadata: Metadata = {
  title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
  description:
    "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
  alternates: { canonical: "/packages/hillcountry" },
  openGraph: {
    title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
    description:
      "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hill Country & Beach - Travedise - Your Next Adventure Starts Here",
    description:
      "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
  },
};

export default function HillcountryPage() {
  return <PackageDetailPage pkg={packageDetails["hillcountry"]} />;
}
