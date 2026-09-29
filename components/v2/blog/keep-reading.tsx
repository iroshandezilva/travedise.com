import Link from "next/link";

import { Section } from "@/components/v2/section";
import type { Note } from "@/content/blog";

import { NoteCard } from "./note-card";

/** Three more notes on cream, under a post. */
export function KeepReading({ notes }: { notes: Note[] }) {
  return (
    <Section surface="cream" className="py-[100px] max-md:py-14">
      <div className="mb-10 flex items-end justify-between gap-6 max-md:mb-7">
        <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
          Keep reading.
        </h2>
        <Link
          href="/blog"
          className="shrink-0 text-[16px]/[1.2] text-v2-navy hover:opacity-80 max-md:text-[15px]"
        >
          All travel notes ↗
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-9">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </Section>
  );
}
