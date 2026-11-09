/**
 * The places index (`/places`) and the place template (`/places/[slug]`).
 *
 * One JSON file per place in `src/content/places/`, ordered by its `order` field; the
 * page-level words are in `src/content/pages/places.json`.
 *
 * Every place belongs to one of five regions, and a region's month ratings are read from
 * the month guide (`when-to-go.ts`), so the two pages can never disagree about the weather.
 * `journeyStop` is the place's key in `mapStops`, when journeys stop there.
 */
import page from "@/content/pages/places.json";

import { months, type Level } from "./when-to-go";

export type RegionKey = "hill" | "triangle" | "southwest" | "east" | "parks";

export type Region = {
  key: RegionKey;
  name: string;
  /** The months it is at its best, written out. */
  best: string;
  /** Shown under the map when the region is picked. */
  blurb: string;
  /** Its row in the month guide's ratings. */
  ratings: Level[];
};

/** Rows of `months[].ratings`, in the month guide's order. */
const ratingRow = { southwest: 0, east: 1, hill: 2, triangle: 3, parks: 4 } as const;
const ratingsFor = (key: RegionKey) => months.map((m) => m.ratings[ratingRow[key]]);

export const placeRegions: Region[] = page.placeRegions.map((r) => ({
  ...r,
  key: r.key as RegionKey,
  ratings: ratingsFor(r.key as RegionKey),
}));

export const regionByKey = Object.fromEntries(placeRegions.map((r) => [r.key, r])) as Record<
  RegionKey,
  Region
>;

export type Photo = { src: string; alt: string; position?: string };

export type Place = {
  slug: string;
  /** Position in the grid and on the map list. */
  order: number;
  name: string;
  region: RegionKey;
  /** One line, on the cards. */
  line: string;
  /** The hero, and the photo on every card. */
  image: Photo;
  /** Where the dot and its label sit on the island map, in `islandPath` coordinates. */
  map: { cx: number; cy: number; tx: number; ty: number; anchor: "start" | "middle" | "end" };
  /** Label side on the place's own locator map, where the larger type needs more room. */
  locatorAnchor?: "start" | "middle" | "end";
  journeyStop?: string;

  /** Under the name in the hero. */
  summary: string;
  nights: string;
  goodFor: string;

  intro: { heading: string; paragraphs: [string, string] };
  mapCaption: string;
  doing: { lede: string; items: { title: string; body: string }[] };
  /** A wide shot and a narrow one, under the four things to do. */
  gallery?: [Photo, Photo];
  season: string;
  journeysHeading?: string;
  nearby: { heading: string; slugs: [string, string, string] };
  /** The line under "Want {name} in your route?". */
  ctaBody: string;
  /** Optional search overrides: `title` replaces the name in <title>, `description` the meta description. */
  seo?: { title?: string; description?: string };
};

export const places: Place[] = Object.values(
  import.meta.glob<Place>("/src/content/places/*.json", { eager: true, import: "default" }),
).sort((a, b) => a.order - b.order);

export const placeSlugs = places.map((p) => p.slug);
export const placeBySlug = Object.fromEntries(places.map((p) => [p.slug, p])) as Record<
  string,
  Place
>;

export const placesHero = page.placesHero;
export const placesMap = page.placesMap;
export const placesGrid = page.placesGrid;
