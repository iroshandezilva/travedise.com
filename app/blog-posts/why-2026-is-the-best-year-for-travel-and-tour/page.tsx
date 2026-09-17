import type { Metadata } from "next";

import { BlogPost } from "@/components/blog/blog-post";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Why 2026 Is the Best Year for Travel and Tour - Travedise - Your Next Adventure Starts Here",
  description:
    "With new flight routes, improved global connections trending destinations, 2026 is shaping.",
  alternates: { canonical: "/blog-posts/why-2026-is-the-best-year-for-travel-and-tour" },
  openGraph: {
    images: [SHARE_IMAGE],
    title:
      "Why 2026 Is the Best Year for Travel and Tour - Travedise - Your Next Adventure Starts Here",
    description:
      "With new flight routes, improved global connections trending destinations, 2026 is shaping.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title:
      "Why 2026 Is the Best Year for Travel and Tour - Travedise - Your Next Adventure Starts Here",
    description:
      "With new flight routes, improved global connections trending destinations, 2026 is shaping.",
  },
};

export default function Why2026IsTheBestYearForTravelAndTourPage() {
  return <BlogPost slug="why-2026-is-the-best-year-for-travel-and-tour" />;
}
