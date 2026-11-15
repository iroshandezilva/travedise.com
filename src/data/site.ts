/**
 * Shared site content: destinations, trip types, tours (derived from the package files),
 * services and the planning steps. Repeating lists live here; one-off page text lives in the
 * page components.
 */
import whenToGo from "@/content/pages/when-to-go.json";
import planPage from "@/content/pages/plan.json";
import aboutPage from "@/content/pages/about.json";
import { notes } from "@/data/blog";
import { packages } from "./content";
import type { PhotoKey } from "./photos";

export const CONTACT = {
  email: "contact@travedise.com",
  phones: [
    { number: "+61 426 965 569", tel: "+61426965569", label: "Australia" },
    { number: "+94 76 397 2171", tel: "+94763972171", label: "Sri Lanka and global" },
  ],
  offices: [
    { place: "Sri Lanka", address: "212A Inland Hill Road, Karapitiya, Galle" },
    { place: "Australia", address: "5/22-30 Brighton St, Bundeena NSW 2230" },
  ],
};
export const MICRO = "Free first route and price. Nothing is booked until you say so.";
export const SOON = ["India", "Nepal", "Bhutan"];

export const DEST = {
  lk: { name: "Sri Lanka", href: "/destinations/sri-lanka", line: "Ancient cities, the tea-country train, leopards in Yala and a long south coast to finish on.", meta: "5 tours · 9 to 11 days", cta: "Explore Sri Lanka", photo: "sigiriya" as PhotoKey },
  mv: { name: "The Maldives", href: "/destinations/maldives", line: "Atolls, house reefs and a villa over the water, on its own or as the slow end to a Sri Lanka trip.", meta: "Tours being written", cta: "Explore the Maldives", photo: "mvSandbar" as PhotoKey },
};

export const TYPES: { t: string; d: string; tags: string[]; photo: PhotoKey }[] = [
  { t: "Wildlife", d: "Leopards in Yala, elephants at Minneriya, mantas off the atolls.", tags: ["Sri Lanka", "Maldives"], photo: "leopard" },
  { t: "Culture and history", d: "Ancient capitals and cave temples, seen early with a guide.", tags: ["Sri Lanka"], photo: "moonstone" },
  { t: "Beaches and islands", d: "The south coast in winter, the east in summer, a week on an atoll.", tags: ["Sri Lanka", "Maldives"], photo: "coconutHill" },
  { t: "Honeymoons", d: "A tea-country hideaway, then a villa by the sea.", tags: ["Sri Lanka", "Maldives"], photo: "mvSunset" },
  { t: "Families", d: "Shorter drives, early safaris and pools at the right stops.", tags: ["Sri Lanka", "Maldives"], photo: "elephants" },
  { t: "Hills and tea", d: "The train through tea country, cool nights and long walks.", tags: ["Sri Lanka"], photo: "archesTea" },
];

/** Card details the package files don't carry: price from the current listings, photos, trip types. */
const PKX: Record<string, { price: string; photo: PhotoKey; hero: PhotoKey; types: string[] }> = {
  hillcountry: { price: "2,500", photo: "archesTea", hero: "trainRed", types: ["Hills and tea", "Beaches and islands", "Families"] },
  "wildlife-package": { price: "3,000", photo: "leopard", hero: "elephants2", types: ["Wildlife"] },
  "dream-honeymoon-in-sri-lanka": { price: "4,000", photo: "beachCouple", hero: "tableForTwo", types: ["Honeymoons", "Beaches and islands"] },
  "best-of-sri-lanka": { price: "3,200", photo: "elephants", hero: "sigPath", types: ["Families", "Wildlife"] },
  "scenic-sri-lanka": { price: "2,600", photo: "sigiriya", hero: "sigAerial", types: ["Culture and history", "Wildlife", "Beaches and islands"] },
};

export type Tour = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  days: number;
  stops: string[];
  best: string;
  price: string;
  photo: PhotoKey;
  hero: PhotoKey;
  types: string[];
  dest: "lk";
};
export const TOURS: Tour[] = packages.map((p) => {
  const x = PKX[p.slug] ?? { price: "", photo: "sigiriya", hero: "sigAerial", types: [] };
  return {
    slug: p.slug,
    href: `/packages/${p.slug}`,
    title: p.title,
    summary: p.summary,
    days: parseInt(p.facts[0]?.value ?? "", 10) || 0,
    stops: (p.facts[1]?.detail ?? "").split(" · ").filter(Boolean),
    best: p.facts[2]?.detail ?? "",
    dest: "lk",
    ...x,
  };
});
export const tourBySlug = (slug: string) => TOURS.find((t) => t.slug === slug);

/** Itinerary stops → a photo for the day. */
export const PLACE_PHOTO: Record<string, PhotoKey> = {
  Kandy: "templeNight",
  "Nuwara Eliya": "teaMist",
  Ella: "archesTea",
  Yala: "leopard",
  "Yala National Park": "leopard",
  Tangalle: "palms",
  Galle: "galleRamp",
  Sigiriya: "sigPath",
  "Dambulla & Polonnaruwa": "polo1",
  Weerawila: "elephants",
};

export const NOTE_PHOTO: Record<string, PhotoKey> = {
  "a-first-trip-to-sri-lanka": "sigAerial",
  "a-morning-in-yala": "leopard",
  "dambulla-cave-temples": "dambCave",
  "galle-fort-after-dark": "galleStreet",
  "polonnaruwa-by-bicycle": "polo1",
  "sri-lanka-with-children": "elephants",
  "tea-country-by-train": "trainBlue",
  "ten-days-for-two": "tableForTwo",
  "the-kandy-perahera": "fireDance",
  "which-coast-and-when": "coconutHill",
};
export const NOTES = [...notes]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((n) => ({ ...n, photo: NOTE_PHOTO[n.slug] ?? ("mist" as PhotoKey) }));
export type NoteCard = (typeof NOTES)[number];

export const SERVICES: { t: string; d: string; photo: PhotoKey; go: string; href: string }[] = [
  { t: "Tailor-made trips", d: "Private trips in Sri Lanka and the Maldives, planned around you.", photo: "trainRed", go: "See the tours", href: "/packages" },
  { t: "Weddings", d: "Beach weddings, elopements and vow renewals.", photo: "wedCeremony", go: "Plan a wedding", href: "/weddings" },
  { t: "Group trips", d: "Retreats, reunions, milestones and club tours.", photo: "groupTable", go: "Plan a group trip", href: "/group-vacations" },
  { t: "Vehicles and drivers", d: "A car and driver-guide, by the day or the whole trip.", photo: "jeep", go: "See the vehicles", href: "/vehicles" },
];

export const STEPS: [string, string][] = [
  ["Tell us", "Where, roughly when, and who is coming."],
  ["First route", "A route and a full price within a few working days, free."],
  ["Change it", "Swap a stay, add a night. Nothing is booked yet."],
  ["Travel", "Book with a deposit. Your planner stays reachable."],
];

export const FAQ_GENERAL: [string, string][] = [
  ["How far ahead should we plan?", "For December to April, three to six months ahead gets the best rooms. For the rest of the year, a few weeks is usually enough. We can still plan something good at short notice."],
  ["Is the price per person?", "Yes. Prices are per person, sharing a room, and move with the season, the stays you choose and how many of you travel together. Your first route comes with a full price."],
  ["Can we change a tour?", "Every tour is a starting point. Add nights, swap stays, drop a stop or join two tours together. Nothing is booked until you say so."],
  ["Who will we travel with?", "Your own driver-guide, in one of our vehicles, from the airport to the airport. Park safaris use licensed jeeps and trackers."],
];

export const MONTHS = whenToGo.months as { name: string; title: string; body: string; ratings: number[] }[];
export const SEASON_REGIONS = whenToGo.regions as { name: string; note: string }[];
export const LEVEL: Record<number, string> = { 1: "Wet season", 2: "Good", 3: "At its best" };

export const PLAN = {
  durations: planPage.durations as string[],
  budgets: planPage.budgets as string[],
  interests: planPage.interests as string[],
  next: planPage.planHelp.next.steps as string[],
};
export const PRINCIPLES = (aboutPage.principles.items as { title: string; body: string }[]).map((i) => [i.title, i.body] as [string, string]);
export const PROOF = (aboutPage.proofPoints as { title: string; detail: string }[]).map((p) => [p.title, p.detail] as [string, string]);
