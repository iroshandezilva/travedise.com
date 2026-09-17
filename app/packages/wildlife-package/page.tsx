import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";

export const metadata: Metadata = {
  title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
  description: "Nature end to end, from gardens to leopard country.",
  alternates: { canonical: "/packages/wildlife-package" },
  openGraph: {
    title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
    description: "Nature end to end, from gardens to leopard country.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
    description: "Nature end to end, from gardens to leopard country.",
  },
};

export default function WildlifePackagePage() {
  return <PackageDetailPage pkg={packageDetails["wildlife-package"]} />;
}
