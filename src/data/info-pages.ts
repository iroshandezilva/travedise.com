/**
 * Lists for the places and FAQ pages that have no content file of their own yet: region names
 * and photos for the places pages, and the FAQ answers rewritten for Travedise.
 */
import placesPage from "@/content/pages/places.json";
import { faqPageFaqs } from "./faqs";
import type { Place } from "./content";
import type { PhotoKey } from "./photos";
import { TOURS } from "./site";

/* ---------- Places ---------- */

type RegionKey = Place["region"];

/** The five regions the places pages group by, in page order. */
const REGION_NAMES: Record<RegionKey, string> = {
  hill: "Hill country",
  triangle: "Cultural Triangle",
  southwest: "South and west coast",
  east: "East coast",
  parks: "National parks",
};

/** A photo for each region's closing band. */
const REGION_PHOTO: Record<RegionKey, PhotoKey> = {
  hill: "teaMist",
  triangle: "sigPath",
  southwest: "palms",
  east: "trincoSun",
  parks: "elephants2",
};

const regionCopy = placesPage.placeRegions as { key: RegionKey; name: string; best: string; blurb: string }[];

export const PLACE_REGIONS = (Object.keys(REGION_NAMES) as RegionKey[]).map((key) => {
  const copy = regionCopy.find((r) => r.key === key);
  return { key, name: REGION_NAMES[key], best: copy?.best ?? "", blurb: copy?.blurb ?? "", photo: REGION_PHOTO[key] };
});
export const placeRegion = (key: RegionKey) => PLACE_REGIONS.find((r) => r.key === key)!;

/* ---------- Questions ---------- */

/** Tour prices and lengths, so the cost answer always matches the tours. */
const prices = TOURS.map((t) => Number(t.price.replace(/,/g, ""))).filter(Boolean);
const days = TOURS.map((t) => t.days).filter(Boolean);
const usd = (n: number) => `US$ ${n.toLocaleString("en-GB")}`;
const priceRange = `${usd(Math.min(...prices))} to ${usd(Math.max(...prices))}`;
const dayRange = `${Math.min(...days)} to ${Math.max(...days)} days`;

type Answer = { a: string; link?: { text: string; href: string } };

/**
 * Answers for the questions in `src/content/pages/faq.json`, by question. The answers in that
 * file were written for another company (its name, prices in pounds, a UK-only visa note), so
 * the FAQ page shows these instead.
 */
const ANSWERS: Record<string, Answer> = {
  "When is the best time of year to visit Sri Lanka?": {
    a: "For a first trip that takes in the south coast, the hill country and the ancient cities, late December to April is the best time: the south and west are dry, and the hills are clear in the mornings. From May to September the rain moves to the south and west, so we turn the route east to Trincomalee and Arugam Bay. That is why we plan Sri Lanka all year round.",
    link: { text: "When to go, month by month", href: "/when-to-go" },
  },
  "How much time do you really need in Sri Lanka?": {
    a: "Seven nights is the least we suggest, and it works best with two regions rather than four. Ten nights covers the Cultural Triangle, the hill country and the south coast without rushing, and two weeks lets you add the east coast or a second national park. If you are ending the trip in the Maldives, a shorter stay on the island still works, as long as we keep the drives short.",
    link: { text: "A first trip to Sri Lanka, in one page", href: "/blog-posts/a-first-trip-to-sri-lanka" },
  },
  "How much does a trip cost to Sri Lanka?": {
    a: `Our tours cost from ${priceRange} per person, sharing a room, for ${dayRange}. That covers your stays, your own driver-guide and vehicle from the airport and back, breakfast every day, and the visits and safaris on the route. International flights are extra. The price moves with the season, the hotels you choose and how many of you travel together, and your first route comes with a full price, free.`,
    link: { text: "See the tours and their prices", href: "/packages" },
  },
  "What's the difference between a tailor-made tour of Sri Lanka and a standard package holiday?": {
    a: "A tailor-made trip is planned around you: your dates, your pace, the stays that suit you, and a private driver-guide for the whole route. A package holiday runs on fixed dates and in fixed hotels, usually with a group. Our tours are starting points. Add a night, swap a stay or join two tours together before anything is booked.",
  },
  "Is Sri Lanka an easy country to travel around?": {
    a: "Yes, with your own driver-guide and vehicle, which is how every Travedise trip runs, from the airport to the airport. Distances are short but the roads are slow, so we keep most drives short and put you on the hill-country train where it has the better view.",
    link: { text: "Our vehicles and drivers", href: "/vehicles" },
  },
  "Is Sri Lanka generally safe for travellers?": {
    a: "Yes. Sri Lanka is generally safe for travellers, and the usual care applies: keep valuables close, and trust your instincts if something feels wrong. Your driver-guide is with you every day, and the person who planned your trip stays reachable by phone while you travel.",
  },
  "Do I need a visa?": {
    a: "Most visitors need an Electronic Travel Authorisation (ETA) before they fly, and you apply for it online. Who needs one, and what it costs, depends on your passport and can change, so check the official ETA website before you travel. We send you the link and check that your dates match the plan.",
  },
  "Is Sri Lanka a good place to travel with children?": {
    a: "Yes. Drives can be kept short, kitchens are happy to cook milder food, and there are elephants, trains and beaches to keep children interested. We plan shorter days, early safaris and stays with a pool at the right stops. Teenagers do well too, with surfing, walks in the hills and the climb up Sigiriya.",
    link: { text: "Sri Lanka with children, without the long drives", href: "/blog-posts/sri-lanka-with-children" },
  },
  "Is Sri Lanka really worth visiting?": {
    a: "Yes. Few places this size hold so much: Sigiriya and the ancient cities, tea country and the train through it, leopards in Yala, whales off Mirissa, and two coasts of beaches, one of them in season whatever the month.",
    link: { text: "Sri Lanka, region by region", href: "/destinations/sri-lanka" },
  },
};

/** The FAQ page's questions, with Travedise's answers. */
export const FAQ_PAGE: ({ q: string } & Answer)[] = faqPageFaqs.map((f) => ({ q: f.question, ...(ANSWERS[f.question] ?? { a: f.answer }) }));
