/**
 * Data behind the v2 package template (`app/v2/packages/[slug]`).
 *
 * The template renders whatever is in `packagesV2`, so adding a journey is a matter of
 * adding an entry here — no new components. Only Scenic Sri Lanka is written up so far;
 * the others still render on the current design at `/packages/<slug>`.
 */
import type { PackageSlug } from "@/content/packages";

import { images, packageImages as pkg } from "./images";

/** One photo in the hero carousel; the label doubles as the caption and alt text. */
export type Shot = { src: string; label: string };

/** A leg of the route. One entry is one row in the day-by-day accordion. */
export type ItineraryDay = {
  /** "Day 1 · Kandy", "Days 2–3 · Dambulla & Polonnaruwa". */
  meta: string;
  title: string;
  body: string;
  stay: { name: string; note: string; thumb: string };
  photos: { src: string; caption: string }[];
};

export type PackageV2 = {
  slug: PackageSlug;
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
};

const scenicSriLanka: PackageV2 = {
  slug: "scenic-sri-lanka",
  title: "Scenic Sri Lanka",
  summary:
    "Eleven private days from the Sigiriya rock fortress to Yala National Park, ending with the slow part of the south coast.",
  shots: [
    { src: images.cloudForest, label: "The hill country, on the way up" },
    { src: images.teaEstate, label: "Tea estates above Ella" },
    { src: images.southCoast, label: "The south coast in the afternoon" },
    { src: images.honeymoon, label: "The road out to Tangalle" },
  ],
  facts: [
    { value: "11 days", detail: "Private, tailor-made" },
    {
      value: "Six regions",
      detail: "Kandy · Cultural Triangle · Sigiriya · Yala · Tangalle · Galle",
    },
    {
      value: "Best months",
      detail: "December to April on this route, when the south coast is dry",
    },
  ],
  includes: {
    heading: "What the journey includes.",
    body: "Everything below is arranged before you land, so the days ask nothing of you beyond turning up. Flights and visas sit outside the plan, and we will say so clearly in the proposal.",
    items: [
      {
        title: "Accommodation",
        body: "Ten nights, chosen for where they sit rather than how many stars they carry. A lake house in Kandy, a tented camp near the park, a fort room in Galle.",
      },
      {
        title: "Activities",
        body: "Guided walks, two safaris, the climbs at Sigiriya and Dambulla, and whatever you want to add once we have talked.",
      },
      {
        title: "Meals",
        body: "Breakfast every day, plus the meals that are part of a stay or a long drive. The rest stays open, because eating out is half the trip.",
      },
      {
        title: "Transfers and driver",
        body: "Airport pick-up and drop-off, and the same driver and vehicle for the whole route, so you are not starting again every morning.",
      },
    ],
  },
  itinerary: {
    heading: "The island, at your pace.",
    lede: "Open a day to see what it holds and where you sleep.",
    days: [
      {
        meta: "Day 1 · Kandy",
        title: "A City Around a Lake",
        body: "A gentle first day. The Temple of the Sacred Tooth Relic in the late afternoon, the Royal Botanical Gardens if you have the energy, and a viewpoint above the lake at dusk. Your driver meets you at the airport and the drive up is the first part of the trip, not a transfer to get through.",
        stay: {
          name: "Myst by Cinnamon",
          note: "Hillside rooms above the city, ten minutes from the temple.",
          thumb: pkg.daveTemple,
        },
        photos: [
          { src: pkg.kandyLake, caption: "Kandy, above the lake" },
          { src: images.simply, caption: "The climb up from Colombo" },
          { src: pkg.daveTemple, caption: "The stay" },
        ],
      },
      {
        meta: "Days 2–3 · Dambulla & Polonnaruwa",
        title: "Into the Cultural Triangle",
        body: "Two days of old ground. Dambulla’s golden cave temples early, before the heat and the crowds, then a slow cycle through the royal ruins of Polonnaruwa with a guide who can tell you what you are looking at.",
        stay: {
          name: "Jetwing Lake",
          note: "Low, quiet and built around the water, with the ruins within easy reach.",
          thumb: pkg.kandyLake,
        },
        photos: [
          { src: pkg.daveTemple, caption: "The cave temples at Dambulla" },
          { src: images.littleOnes, caption: "Open country on the way" },
          { src: pkg.kandyLake, caption: "The stay" },
        ],
      },
      {
        meta: "Day 4 · Sigiriya",
        title: "The Rock That Rises From the Plain",
        body: "Climb the 200-metre fortress at first light for one of the great views in Asia. If the queue looks long, neighbouring Pidurangala gives you the rock itself framed against the sky, which is arguably the better photograph.",
        stay: {
          name: "Sigiriya King’s Resort",
          note: "Close enough for a dawn start without a drive in the dark.",
          thumb: pkg.sigiriyaStay,
        },
        photos: [
          { src: pkg.tangalle, caption: "Sigiriya from the plain" },
          { src: images.cloudForest, caption: "Forest below the rock" },
          { src: pkg.sigiriyaStay, caption: "The stay" },
        ],
      },
      {
        meta: "Days 5–7 · Yala National Park",
        title: "The Dry Zone at Its Most Dramatic",
        body: "Three days of scrub, granite and lagoon, with leopards, elephants and birdlife on morning and afternoon safaris. We keep one safari a day rather than two, so the middle of the day belongs to you.",
        stay: {
          name: "DoubleTree by Hilton",
          note: "A short run from the park gate, with a pool for the hours between drives.",
          thumb: pkg.yalaStay,
        },
        photos: [
          { src: pkg.sigiriyaStay, caption: "Yala at first light" },
          { src: images.honeymoon, caption: "The lagoon edge" },
          { src: pkg.yalaStay, caption: "The stay" },
        ],
      },
      {
        meta: "Day 8 · Tangalle",
        title: "The Coast Arrives Like an Exhale",
        body: "The drive south ends at wide, quiet beaches. Nothing is scheduled. The Hummanaya blow hole is nearby if you want a reason to leave the sand.",
        stay: {
          name: "Anantara Peace Haven",
          note: "On its own headland above the water, with a path down to the beach.",
          thumb: pkg.tangalle,
        },
        photos: [
          { src: pkg.galleFort, caption: "Tangalle in the afternoon" },
          { src: images.southCoast, caption: "The coast road" },
          { src: pkg.tangalle, caption: "The stay" },
        ],
      },
      {
        meta: "Days 9–10 · Galle",
        title: "The Old Fort by the Ocean",
        body: "Ramparts, galleries and a lighthouse at the point. One day for the fort and its history, one for the beach, with dinner inside the walls when the day tourists have gone.",
        stay: {
          name: "Jetwing Lighthouse",
          note: "Just outside the walls, with the sea on three sides.",
          thumb: pkg.galleFort,
        },
        photos: [
          { src: pkg.yalaStay, caption: "Galle Fort walls" },
          { src: images.teaEstate, caption: "The way down from the hills" },
          { src: pkg.galleFort, caption: "The stay" },
        ],
      },
      {
        meta: "Day 11 · Airport",
        title: "The Full Sweep Behind You",
        body: "A private transfer to Colombo airport, with time built in for the traffic. Eleven days, six regions, and one route that never doubled back on itself.",
        stay: {
          name: "Private transfer",
          note: "Colombo airport, timed to your flight.",
          thumb: pkg.northRoad,
        },
        photos: [
          { src: pkg.northRoad, caption: "The last stretch north" },
          { src: images.wildlifePackage, caption: "The coast road to Colombo" },
        ],
      },
    ],
  },
};

export const packagesV2: Partial<Record<PackageSlug, PackageV2>> = {
  "scenic-sri-lanka": scenicSriLanka,
};

export const packageV2Slugs = Object.keys(packagesV2) as PackageSlug[];

/** The questions on a package page — the shared set, with this route's duration answered. */
export const packageQuestions = [
  {
    q: "How do you shape a journey around us?",
    a: "We begin with your dates, interests, and pace. From there, we discuss a route and refine it with you.",
  },
  {
    q: "How much time should we allow for Sri Lanka?",
    a: "Eleven days covers this route without rushing. Shorter trips usually mean dropping a region rather than moving faster.",
  },
  {
    q: "Can we make the trip work for children?",
    a: "Yes. We shorten the drives, keep safaris to one a day, and pick stays with room to spread out.",
  },
  {
    q: "What happens after we get in touch?",
    a: "You will hear from a travel designer, not a form reply. We talk first, then send a route for you to react to.",
  },
  {
    q: "Can the route change while we plan?",
    a: "Until the day you confirm, and in small ways after that. Nothing here is fixed before you are happy with it.",
  },
  {
    q: "What is included in a proposed trip?",
    a: "Accommodation, activities, meals as listed, and transfers with your driver. Flights and visas sit outside the plan.",
  },
];
