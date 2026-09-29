/**
 * The shape of a travel note. One file per note in this folder, each exporting a
 * `BlogPost`; `index.ts` collects them. The page template is
 * `app/blog-posts/[slug]/page.tsx`, so a new note is a new file here and nothing else.
 */

export const CATEGORIES = [
  "Planning",
  "Routes",
  "Culture",
  "Wildlife",
  "Coast",
  "Families",
  "Couples",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** A run of text inside a paragraph: plain, or a link. */
export type Inline = string | { text: string; href: string };

export type Block =
  /** The larger opening paragraph. */
  | { type: "lead"; text: Inline[] }
  | { type: "p"; text: Inline[] }
  /** A section heading. Every `h2` is listed in the "In this note" contents, by `id`. */
  | { type: "h2"; id: string; text: string; toc?: string }
  | { type: "list"; items: Inline[][] }
  /** A cream panel with a small table. The first cell of each row is its heading. */
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "figure"; src: string; alt: string; caption: string }
  /** A pull quote in the display face, with the accent rule under it. */
  | { type: "quote"; text: string }
  /** A navy aside: a small accent label over a short paragraph. */
  | { type: "note"; label: string; text: string };

/** The byline on every note until the team signs them individually. */
export const TEAM = {
  name: "The Travedise team",
  role: "Travel designers in Galle and Bundeena",
};

export type BlogPost = {
  slug: string;
  title: string;
  /** The end of the title set in italics in the post hero, e.g. "and when". */
  titleEm?: string;
  /** One line under the hero title. */
  standfirst: string;
  /** The card summary; also the page's meta description. */
  dek: string;
  category: Category;
  /** Publication date, `YYYY-MM-DD`. */
  date: string;
  author: { name: string; role: string };
  image: { src: string; alt: string; position?: string };
  body: Block[];
  /** Where the button beside the author card goes. Defaults to planning a trip. */
  next?: { label: string; href: string };
  /** The navy panel after "Keep reading". The italic part is `em`. */
  cta?: { heading: string; em?: string; body: string };
};
