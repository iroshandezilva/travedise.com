/**
 * Copy and list data for the v2 home page (`app/v2`). Text is verbatim from the
 * "Home V8 Decision path" design.
 *
 * Anything still in `[square brackets]` is a fact the design left for the team to
 * confirm — a rating, a turnaround, a deposit. It is shown as written until someone
 * supplies the real figure.
 *
 * The key names in `images.ts` do not always describe the photo (see the note in
 * `journeys.ts`), so every alt text here was checked against the picture itself.
 */

import { images, packageImages as pkg } from "./images";

/* 01 Hero ------------------------------------------------------------------------- */

export const hero = {
  heading: "See Sri Lanka.\nKeep time for\nwhat matters.",
  body: "Private journeys, planned end to end. We shape the route, choose the stays and arrange your driver, then leave you the hours in between.",
};

/* Proof strip --------------------------------------------------------------------- */

export const proofPoints: { title: string; detail: string }[] = [
  { title: "Private driver and vehicle", detail: "On every journey, airport to airport" },
  { title: "Stays we have slept in", detail: "Chosen in person, never from a list" },
  { title: "One planner throughout", detail: "The same person answers while you travel" },
  { title: "[RATING] from [N] travellers", detail: "[REVIEW SOURCE]. Verify before publishing" },
];

/* 02 Regions ---------------------------------------------------------------------- */

export type Region = {
  name: string;
  /** Finishes "See … on the map". */
  short: string;
  image: string;
  alt: string;
  /** The small photo overlapping the corner of the main one. Decorative. */
  inset: string;
  body: string;
  months: string;
  nights: string;
  known: string;
  access: string;
};

export const regions: Region[] = [
  {
    name: "Cultural Triangle",
    short: "the Cultural Triangle",
    image: images.scenic,
    alt: "Sigiriya rock seen from Pidurangala at first light",
    inset: pkg.daveTemple,
    body: "Sigiriya, Dambulla, Polonnaruwa and Anuradhapura sit within an hour or two of each other. A rock fortress, painted cave temples and two ancient capitals, all best seen early, before the heat and the coaches arrive.",
    months: "January to September",
    nights: "2 to 3 nights",
    known: "Sigiriya at dawn, the Dambulla caves",
    access: "4 hours from Colombo airport",
  },
  {
    name: "Hill Country",
    short: "the hills",
    image: images.teaEstate,
    alt: "The train crossing the Nine Arch Bridge near Ella",
    inset: images.noteDates,
    body: "Tea estates, waterfalls and a railway line that seems to have been built for the view. Nuwara Eliya is cool enough for a jumper, Ella is slower than you expect, and the train between them is the ride people talk about for years.",
    months: "January to April, July to September",
    nights: "3 to 4 nights",
    known: "The Ella train, tea at first light",
    access: "5 hours by road, or the train up from Kandy",
  },
  {
    name: "Kandy and the centre",
    short: "Kandy",
    image: images.simply,
    alt: "The Temple of the Tooth lit up across Kandy lake",
    inset: images.livingCulture,
    body: "The last royal capital, wrapped around a lake. The Temple of the Tooth as the lamps come on, drummers in the evening, and the botanical gardens the next morning before the road climbs into the hills.",
    months: "Year round, driest December to April",
    nights: "1 to 2 nights",
    known: "Temple of the Tooth, Kandyan drummers",
    access: "3 hours from Colombo airport",
  },
  {
    name: "The national parks",
    short: "the parks",
    image: images.wildlifePackage,
    alt: "A leopard crossing the track in front of a safari jeep",
    inset: images.wildlifeEncounters,
    body: "Yala for leopards, Udawalawe and Minneriya for elephants, Wilpattu for the quiet. We plan around the hours the animals are actually out, which means one early start rather than five, and a guide who knows the park rather than just the route.",
    months: "February to July, Minneriya July to September",
    nights: "2 nights",
    known: "Leopards in Yala, the Minneriya gathering",
    access: "Yala is 5 hours from Colombo, 2 from Galle",
  },
  {
    name: "The south coast",
    short: "the south coast",
    image: pkg.galleFort,
    alt: "An empty stretch of sand on the south coast",
    inset: images.cloudForest,
    body: "Galle Fort in the last hour of light, whales off Mirissa between November and April, and beaches at Tangalle where the evening walk is the whole plan. This is where most journeys end, and nobody minds.",
    months: "December to April",
    nights: "3 to 5 nights",
    known: "Galle Fort, whales off Mirissa",
    access: "2 hours from Colombo on the expressway",
  },
];

/* 03 Journeys --------------------------------------------------------------------- */

/**
 * The journey facts themselves come from `journeys.ts`, shared with the journeys index.
 * The home page cards use their own photos, keyed by journey.
 */
export const journeyPhotos: Record<string, { image: string; alt: string }> = {
  simply: { image: images.scenic, alt: "Sigiriya rock seen from Pidurangala" },
  family: { image: images.littleOnes, alt: "A child watching the road from the jeep" },
  scenic: { image: images.teaEstate, alt: "The train crossing the Nine Arch Bridge near Ella" },
  hillcoast: { image: images.cloudForest, alt: "Turquoise water and palms on the south coast" },
  wild: { image: images.wildlifePackage, alt: "A leopard crossing in front of the jeep in Yala" },
  honeymoon: { image: pkg.galleFort, alt: "A single walker on an empty beach" },
};

/* 04 Frames from the road --------------------------------------------------------- */

/** In the order a day runs, from first light on the water to the lamps in Kandy. */
export const frames: { src: string; alt: string; place: string; journey: string }[] = [
  {
    src: images.cloudForest,
    alt: "Turquoise water off the south coast",
    place: "Mirissa, south coast",
    journey: "Hill Country & Beach",
  },
  {
    src: images.quietStop,
    alt: "An avenue of palms near the coast",
    place: "Near Tangalle, south coast",
    journey: "Honeymoon In Sri Lanka",
  },
  {
    src: images.scenic,
    alt: "Sigiriya rock from Pidurangala",
    place: "Pidurangala, Cultural Triangle",
    journey: "Simply Sri Lanka",
  },
  {
    src: images.teaEstate,
    alt: "The train crossing the Nine Arch Bridge near Ella",
    place: "Nine Arch Bridge, Ella",
    journey: "Scenic Sri Lanka",
  },
  {
    src: images.littleOnes,
    alt: "A child watching the road from the jeep",
    place: "Udawalawe National Park",
    journey: "Sri Lanka With Little Ones",
  },
  {
    src: images.wildlifePackage,
    alt: "A leopard crossing in front of the jeep in Yala",
    place: "Yala National Park",
    journey: "Wild Sri Lanka",
  },
  {
    src: images.sacredPlaces,
    alt: "Gilded Buddhas in the Dambulla caves",
    place: "Dambulla cave temples",
    journey: "Simply Sri Lanka",
  },
  {
    src: images.livingCulture,
    alt: "A fire dancer in Kandy",
    place: "Kandy, the centre",
    journey: "Scenic Sri Lanka",
  },
  {
    src: images.noteFamily,
    alt: "The moonstone steps at Polonnaruwa at sunset",
    place: "Polonnaruwa, Cultural Triangle",
    journey: "Simply Sri Lanka",
  },
  {
    src: images.simply,
    alt: "The Temple of the Tooth across Kandy lake at night",
    place: "Temple of the Tooth, Kandy",
    journey: "Scenic Sri Lanka",
  },
];

/* 05 Who plans your trip ---------------------------------------------------------- */

/** Four photos that widen on hover; the note under each place name appears as it does. */
export const teamFrames: { src: string; alt: string; place: string; note: string }[] = [
  {
    src: pkg.sigiriyaStay,
    alt: "A Travedise jeep on the road south",
    place: "The road south",
    note: "Our vehicle, somewhere past Udawalawe",
  },
  {
    src: pkg.yalaStay,
    alt: "A lantern-lit street in Galle",
    place: "Galle",
    note: "The street the office is on, most evenings",
  },
  {
    src: images.noteFamily,
    alt: "The moonstone steps at Polonnaruwa at sunset",
    place: "Polonnaruwa",
    note: "We send people here early, before the heat",
  },
  {
    src: images.optionalDays,
    alt: "An elephant at close range on a morning drive",
    place: "Udawalawe",
    note: "Close range, on a morning drive",
  },
];

export const team = {
  heading: "A small team in Galle, and one desk near Sydney.",
  paragraphs: [
    "Travedise is run by Chamara and a small team based in Galle, with a second desk on the coast south of Sydney for travellers coming from Australia. We keep the numbers small on purpose, so the person who draws your route is the same person you can message from the road.",
    // The design left the years as [N]; the figure is the one on the About page.
    "Chamara has worked in Sri Lanka’s hospitality and travel industry for more than 20 years. Everything on this site is a route we have driven, and the reasons a stop is in or out of a plan are reasons we can tell you.",
  ],
};

/* 06 How planning works ----------------------------------------------------------- */

export const planningSteps: { title: string; body: string }[] = [
  {
    title: "You tell us what matters",
    body: "Two short steps on the planning form, or a message if you would rather write it out. Dates, rough budget, and what you would hate to rush.",
  },
  {
    title: "We send a first route",
    body: "A suggested route with the stays we would use and a full price, usually within [N working days]. No charge and no obligation at this point.",
  },
  {
    title: "You change it until it fits",
    body: "Swap a stay, add a night, drop a stop. We redraw as often as it takes, and nothing is booked while you are still deciding.",
  },
  {
    title: "Book, then travel",
    body: "A [X%] deposit confirms it, with the balance due [N weeks] before you fly. Your planner stays reachable the whole time you are here.",
  },
];

/* 07 Travel notes ----------------------------------------------------------------- */

/** Three of the notes on /blog, as the home design pictures them. */
export const travelNotes: {
  title: string;
  body: string;
  image: string;
  alt: string;
  href: string;
}[] = [
  {
    title: "Ten days for two, and where to linger",
    body: "The stays and stretches of coast we send couples to, and the ones we do not.",
    image: images.honeymoon,
    alt: "A table set for two on the sand at dusk",
    href: "/blog-posts/ten-days-for-two",
  },
  {
    title: "Sri Lanka with children, without the long drives",
    body: "How we shorten the road and where the early starts are worth it.",
    image: images.optionalDays,
    alt: "An elephant at close range on an early drive",
    href: "/blog-posts/sri-lanka-with-children",
  },
  {
    title: "Which coast, and when",
    body: "How the two monsoons decide where you should be, month by month.",
    image: images.quietStop,
    alt: "An avenue of palms running down to the coast",
    href: "/blog-posts/which-coast-and-when",
  },
];

/* 08 Questions -------------------------------------------------------------------- */

export const homeQuestions: { q: string; a: string }[] = [
  {
    q: "How much time should we allow for Sri Lanka?",
    a: "Ten nights is the sweet spot for a first visit. Eight works if you keep to one half of the island, and fourteen lets you add the east coast or a second park without rushing.",
  },
  {
    q: "Do we have our own driver?",
    a: "Yes. Every journey comes with a private vehicle and a driver who stays with you from the airport to the airport. They know the roads, the stops and the good lunch places, and they are happy to change the plan on the day.",
  },
  {
    q: "Can we make the trip work for children?",
    a: "Yes. Shorter drives, rooms with space to spread out, and an elephant morning that is worth the early start. Sri Lanka With Little Ones shows how we shape it.",
  },
  {
    q: "What is included in a proposed trip?",
    a: "Stays, the vehicle and driver, transfers, and the park entries and activities listed in the plan. Flights, meals beyond breakfast, and tips are not, and we say so line by line.",
  },
  {
    q: "Can the route change while we travel?",
    a: "Within reason, yes. We build slack into every plan so a place that holds you longer than expected does not break the week.",
  },
  {
    q: "How do we choose the right coast?",
    a: "By the month you travel. The south and west are dry from December to April, the east from May to September. Our month by month guide covers it, and we will talk it through.",
  },
];

/* 09 Ready when you are ----------------------------------------------------------- */

export const readyBand = {
  body: "Two short steps on the planning page, and we come back with a first route for you to react to. Nothing is fixed until the plan feels right.",
  image: images.southCoast,
  alt: "A couple walking the south coast at sunset",
};
