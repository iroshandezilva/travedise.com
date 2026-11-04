/**
 * Data behind the package template (`/packages/[slug]`).
 *
 * One JSON file per journey in `src/content/packages/`, ordered by `order`. The template
 * renders whatever is there, so adding a journey is a matter of adding a file — no new
 * components. The questions shared by every package page are in
 * `src/content/pages/package.json`.
 */
import shared from "@/content/pages/package.json";
import type { PackageSlug } from "@/data/packages";

/** One photo in the hero carousel; the label doubles as the caption and alt text. */
export type Shot = { src: string; label: string };

/** A leg of the route. One entry is one row in the day-by-day accordion. */
export type ItineraryDay = {
  /** "Day 1 · Kandy", "Days 2–3 · Dambulla & Polonnaruwa". */
  meta: string;
  title: string;
  body: string;
  /** `note` is left out where we have nothing true to say about the stay yet. */
  stay: { name: string; note?: string; thumb: string };
  photos: { src: string; caption: string }[];
};

export type PackageV2 = {
  slug: PackageSlug;
  order: number;
  title: string;
  /** The line under the hero title. */
  summary: string;
  shots: Shot[];
  /** The three figures in the dark bar under the hero. */
  facts: { value: string; detail: string }[];
  includes: {
    heading: string;
    body: string;
    items: { title: string; body: string }[];
  };
  itinerary: {
    heading: string;
    lede: string;
    days: ItineraryDay[];
  };
  /** The answer to "How much time should we allow?" in this page's questions. */
  timeAnswer: string;
  /** Optional search overrides: `title` replaces the name in <title>, `description` the meta description. */
  seo?: { title?: string; description?: string };
};

const all = Object.values(
  import.meta.glob<PackageV2>("/src/content/packages/*.json", { eager: true, import: "default" }),
).sort((a, b) => a.order - b.order);

export const packagesV2: Partial<Record<PackageSlug, PackageV2>> = Object.fromEntries(
  all.map((p) => [p.slug, p]),
);

export const packageV2Slugs = all.map((p) => p.slug);

/** The questions on a package page — the shared set, with this route's duration answered. */
export const packageQuestions = (pkg: PackageV2) => [
  shared.questions[0],
  { q: shared.timeQuestion, a: pkg.timeAnswer },
  ...shared.questions.slice(1),
];
