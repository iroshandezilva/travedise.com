import type { Metadata } from "next";

import { FeaturedNote } from "@/components/v2/blog/featured-note";
import { NotesBrowser } from "@/components/v2/blog/notes-browser";
import { NotesHero } from "@/components/v2/blog/notes-hero";
import { FooterWide } from "@/components/v2/footer-wide";
import { noteCategories, notes } from "@/content/blog";
import { images } from "@/content/v2/images";

const TITLE = "Travel notes — Travedise";
const DESCRIPTION =
  "What we have learned from running these routes: when to go, where to slow down, and the small decisions that make a trip feel unhurried.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { images: [images.heroPoster], title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: {
    images: [images.heroPoster],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** The notes index: the newest note up top, then every other note behind topic filters. */
export default function BlogPage() {
  const [featured, ...rest] = notes;
  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <NotesHero />
      <main>
        <FeaturedNote note={featured} />
        <NotesBrowser notes={rest} categories={noteCategories} />
      </main>
      <FooterWide />
    </div>
  );
}
