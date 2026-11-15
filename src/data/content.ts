/**
 * The content collections, read at build as plain JSON (each file is also checked against its
 * schema in `src/content.config.ts`). Sorted by each file's `order`.
 */
import type { PhotoKey } from "./photos";

type Titled = { title: string; body: string };
type Question = { q: string; a: string };
type Image = { src: string; alt: string; position?: string };

export type Pkg = {
  order: number;
  slug: string;
  title: string;
  summary: string;
  facts: { value: string; detail: string }[];
  includes: { heading: string; body: string; items: Titled[] };
  itinerary: {
    heading: string;
    lede: string;
    days: { meta: string; title: string; body: string; stay: { name: string; note?: string; thumb: string } }[];
  };
  timeAnswer: string;
  seo?: { title?: string; description?: string };
};
export type Place = {
  order: number;
  slug: string;
  name: string;
  region: "hill" | "triangle" | "southwest" | "east" | "parks";
  line: string;
  image: Image;
  summary: string;
  nights: string;
  goodFor: string;
  intro: { heading: string; paragraphs: string[] };
  doing: { lede: string; items: Titled[] };
  gallery?: Image[];
  season: string;
  nearby: { heading: string; slugs: string[] };
  ctaBody: string;
  seo?: { title?: string; description?: string };
};
export type Vehicle = {
  order: number;
  slug: string;
  name: string;
  seats: { min: number; max: number };
  seatsLabel: string;
  bags: string;
  models: string;
  short: string;
  summary: string;
  suits: string[];
  features: Titled[];
  included: string[];
  questions: Question[];
};
export type WeddingStyle = {
  order: number;
  slug: string;
  name: string;
  short: string;
  summary: string;
  image: Image;
  facts: { value: string; detail: string }[];
  intro: { heading: string; paragraphs: string[] };
  schedule: { heading: string; lede: string; items: { when: string; title: string; body: string }[] };
  includes: { heading: string; body: string; items: Titled[] };
  questions: Question[];
};
export type GroupType = {
  order: number;
  slug: string;
  name: string;
  theme: string;
  size: string;
  short: string;
  summary: string;
  image: Image;
  facts: { value: string; detail: string }[];
  suits: { heading: string; body: string; points: string[] };
  services: { heading: string; body: string; items: Titled[] };
  shapes: { heading: string; lede: string; items: { title: string; length: string; body: string }[] };
  questions: Question[];
};

const load = <T extends { order: number }>(files: Record<string, { default: unknown }>) =>
  Object.values(files)
    .map((m) => m.default as T)
    .sort((a, b) => a.order - b.order);

export const packages = load<Pkg>(import.meta.glob("/src/content/packages/*.json", { eager: true }));
export const places = load<Place>(import.meta.glob("/src/content/places/*.json", { eager: true }));
export const vehicles = load<Vehicle>(import.meta.glob("/src/content/vehicles/*.json", { eager: true }));
export const weddingStyles = load<WeddingStyle>(import.meta.glob("/src/content/weddings/*.json", { eager: true }));
export const groupTypes = load<GroupType>(import.meta.glob("/src/content/groups/*.json", { eager: true }));

/** Photos for content that has no photo of its own in the new design yet. */
export const VEHICLE_PHOTO: Record<string, PhotoKey | null> = {
  "tuk-tuk": "tukGreen",
  "safari-jeep": "jeep",
  "comfort-car": "carSedan",
  "premium-suv": "suvDark",
  "family-van": "vanHills",
  "mini-coach": "miniCoach",
  "luxury-coach": "coachRoad",
};
export const WEDDING_PHOTO: Record<string, PhotoKey> = { "beach-weddings": "wedStand", elopements: "wedCouple", "vow-renewals": "tableForTwo" };
export const GROUP_PHOTO: Record<string, PhotoKey> = {
  "corporate-retreats": "groupEat",
  "family-reunions": "elephants2",
  "friends-and-milestones": "groupTable",
  "pilgrimage-and-heritage": "monksField",
  "special-interest-clubs": "waterfall",
};
