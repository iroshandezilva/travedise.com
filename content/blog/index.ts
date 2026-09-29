import { post as firstTrip } from "./posts/a-first-trip-to-sri-lanka";
import { post as yala } from "./posts/a-morning-in-yala";
import { post as dambulla } from "./posts/dambulla-cave-temples";
import { post as galle } from "./posts/galle-fort-after-dark";
import { post as polonnaruwa } from "./posts/polonnaruwa-by-bicycle";
import { post as children } from "./posts/sri-lanka-with-children";
import { post as train } from "./posts/tea-country-by-train";
import { post as forTwo } from "./posts/ten-days-for-two";
import { post as perahera } from "./posts/the-kandy-perahera";
import { post as coast } from "./posts/which-coast-and-when";
import { CATEGORIES, type Block, type BlogPost, type Category } from "./types";

export * from "./types";

/** A post with the fields every card and page derives from it. */
export type Note = BlogPost & {
  href: `/blog-posts/${string}`;
  minutes: number;
  /** "Planning · 6 min read" */
  meta: string;
  /** "22 September 2026" */
  dateLabel: string;
};

const WORDS_PER_MINUTE = 200;

function blockText(block: Block): string {
  const inline = (parts: (string | { text: string })[]) =>
    parts.map((p) => (typeof p === "string" ? p : p.text)).join("");
  switch (block.type) {
    case "lead":
    case "p":
      return inline(block.text);
    case "list":
      return block.items.map(inline).join(" ");
    case "table":
      return [block.caption, ...block.rows.flat()].join(" ");
    case "figure":
      return block.caption;
    case "note":
      return `${block.label} ${block.text}`;
    default:
      return block.text;
  }
}

function readingMinutes(post: BlogPost): number {
  const words = post.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / WORDS_PER_MINUTE));
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function toNote(post: BlogPost): Note {
  const minutes = readingMinutes(post);
  return {
    ...post,
    href: `/blog-posts/${post.slug}`,
    minutes,
    meta: `${post.category} · ${minutes} min read`,
    dateLabel: DATE_FORMAT.format(new Date(`${post.date}T00:00:00Z`)),
  };
}

/** Every note, newest first. The first one is the featured note on /blog. */
export const notes: Note[] = [
  coast,
  yala,
  train,
  perahera,
  galle,
  dambulla,
  polonnaruwa,
  firstTrip,
  forTwo,
  children,
]
  .map(toNote)
  .sort((a, b) => b.date.localeCompare(a.date));

export const noteSlugs = notes.map((n) => n.slug);

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

/** The categories that have at least one note, in the fixed order of `CATEGORIES`. */
export const noteCategories: Category[] = CATEGORIES.filter((c) =>
  notes.some((n) => n.category === c),
);

/** Three other notes to read next: same category first, then the newest. */
export function relatedNotes(note: Note, count = 3): Note[] {
  const others = notes.filter((n) => n.slug !== note.slug);
  return [
    ...others.filter((n) => n.category === note.category),
    ...others.filter((n) => n.category !== note.category),
  ].slice(0, count);
}
