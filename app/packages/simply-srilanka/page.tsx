import type { Metadata } from "next";

import { PackageDetailPage } from "@/components/package-detail/package-detail-page";
import { packageDetails } from "@/content/package-details";

export const metadata: Metadata = {
  title: "Simply Sri Lanka - Travedise - Your Next Adventure Starts Here",
  description:
    "Sri Lanka, done simply. This affordabletailor-made itinerary takes you from thepalm-fringed coastline to the misty, teaplantation hills. You’ll be climbing up rock-topfortresses, riding iconic railway lines, wanderingancient, vine-laden cities and watching gentlegatherings of elephants on this inspiring andimmersive introductory visit to Sri Lanka.",
  alternates: { canonical: "/packages/simply-srilanka" },
  openGraph: {
    title: "Simply Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description:
      "Sri Lanka, done simply. This affordabletailor-made itinerary takes you from thepalm-fringed coastline to the misty, teaplantation hills. You’ll be climbing up rock-topfortresses, riding iconic railway lines, wanderingancient, vine-laden cities and watching gentlegatherings of elephants on this inspiring andimmersive introductory visit to Sri Lanka.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simply Sri Lanka - Travedise - Your Next Adventure Starts Here",
    description:
      "Sri Lanka, done simply. This affordabletailor-made itinerary takes you from thepalm-fringed coastline to the misty, teaplantation hills. You’ll be climbing up rock-topfortresses, riding iconic railway lines, wanderingancient, vine-laden cities and watching gentlegatherings of elephants on this inspiring andimmersive introductory visit to Sri Lanka.",
  },
};

export default function SimplySrilankaPage() {
  return <PackageDetailPage pkg={packageDetails["simply-srilanka"]} />;
}
