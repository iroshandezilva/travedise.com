import type { Metadata } from "next";

import { BlogPost } from "@/components/blog/blog-post";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Family-Friendly Destinations That Everyone Will Love - Travedise - Your Next Adventure Starts Here",
  description:
    "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
  alternates: { canonical: "/blog-posts/family-friendly-destinations-that-everyone-will-love" },
  openGraph: {
    images: [SHARE_IMAGE],
    title:
      "Family-Friendly Destinations That Everyone Will Love - Travedise - Your Next Adventure Starts Here",
    description:
      "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title:
      "Family-Friendly Destinations That Everyone Will Love - Travedise - Your Next Adventure Starts Here",
    description:
      "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
  },
};

export default function FamilyFriendlyDestinationsThatEveryoneWillLovePage() {
  return <BlogPost slug="family-friendly-destinations-that-everyone-will-love" />;
}
