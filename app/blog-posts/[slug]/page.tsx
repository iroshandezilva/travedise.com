import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KeepReading } from "@/components/v2/blog/keep-reading";
import { withEmphasis } from "@/components/v2/blog/note-card";
import { PostBody } from "@/components/v2/blog/post-body";
import { PostHero } from "@/components/v2/blog/post-hero";
import { ContainedCta } from "@/components/v2/contained-cta";
import { FooterWide } from "@/components/v2/footer-wide";
import { getNote, noteSlugs, relatedNotes } from "@/content/blog";

type Params = { slug: string };

/** Static export: every note in `content/blog` gets a page. */
export function generateStaticParams(): Params[] {
  return noteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};

  const title = `${note.title} — Travedise`;
  return {
    title,
    description: note.dek,
    alternates: { canonical: note.href },
    openGraph: {
      images: [note.image.src],
      title,
      description: note.dek,
      type: "article",
      publishedTime: note.date,
    },
    twitter: { images: [note.image.src], card: "summary_large_image", title, description: note.dek },
  };
}

/**
 * The travel note template. Everything on the page comes from the note's file in
 * `content/blog/posts`, so a new note is a content entry rather than a new page.
 */
export default async function NotePage({ params }: { params: Promise<Params> }) {
  const note = getNote((await params).slug);
  if (!note) notFound();

  return (
    <div className="v2 flex flex-col overflow-clip bg-white">
      <PostHero note={note} />
      <main>
        <PostBody note={note} />
        <KeepReading notes={relatedNotes(note)} />
        {note.cta ? (
          <ContainedCta heading={withEmphasis(note.cta.heading, note.cta.em)} body={note.cta.body} />
        ) : (
          <ContainedCta
            heading={
              <>
                Want this <em className="italic">in your route</em>?
              </>
            }
            body="Tell us your dates and what you hope to see. We will shape the rest around you."
          />
        )}
      </main>
      <FooterWide />
    </div>
  );
}
