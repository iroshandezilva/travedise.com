/** The About page. The words and photos are in `src/content/pages/about.json`. */
import data from "@/content/pages/about.json";

export type TeamMember = {
  name: string;
  role: string;
  /** A real portrait. Members without one are not shown. */
  portrait?: string;
};

export type Review = {
  /** Word for word as the traveller wrote it. */
  quote: string;
  name: string;
  /** e.g. "Hill Country & Beach, March 2026". */
  trip: string;
  source: string;
};

export const aboutHero = data.aboutHero;
export const opening = data.opening;
export const stamps = data.stamps;
export const team = data.team as {
  heading: string;
  intro: string;
  /** `portrait` and `quote` are left out until the team sends them. */
  lead: { name: string; role: string; portrait?: string; quote?: string; story: string };
  /** The rest of the team. Names and portraits to come. */
  members: TeamMember[];
};
export const principles = data.principles as {
  heading: string;
  intro: string;
  items: { title: string; body: string; tone: "sky" | "sand" | "ember" }[];
};
/**
 * "What travellers said afterwards." Only reviews a traveller actually wrote, pasted
 * exactly as they came. The section stays hidden while `items` is empty.
 */
export const reviews = data.reviews as {
  heading: string;
  /** e.g. { value: "4.9", count: 120, source: "Google", href: "https://…" } */
  rating?: { value: string; count: number; source: string; href: string };
  items: Review[];
};
export const offices = data.offices;
