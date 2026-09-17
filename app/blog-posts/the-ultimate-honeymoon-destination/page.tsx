import type { Metadata } from "next";

import { BlogPost } from "@/components/blog/blog-post";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Ultimate Honeymoon Destination - Travedise - Your Next Adventure Starts Here",
  description:
    "Experience the perfect romantic getaway with stunning beaches, misty hills, luxury stays, and unforgettable memories.",
  alternates: { canonical: "/blog-posts/the-ultimate-honeymoon-destination" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "The Ultimate Honeymoon Destination - Travedise - Your Next Adventure Starts Here",
    description:
      "Experience the perfect romantic getaway with stunning beaches, misty hills, luxury stays, and unforgettable memories.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "The Ultimate Honeymoon Destination - Travedise - Your Next Adventure Starts Here",
    description:
      "Experience the perfect romantic getaway with stunning beaches, misty hills, luxury stays, and unforgettable memories.",
  },
};

export default function TheUltimateHoneymoonDestinationPage() {
  return <BlogPost slug="the-ultimate-honeymoon-destination" />;
}
