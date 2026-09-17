/**
 * Copy and list data for the v2 home page (`app/v2`). Text is verbatim from the
 * "Home V6 Report-led coastal" design.
 */

import { images } from "./images";

/* 00 Overview ------------------------------------------------------------------ */

/**
 * Split in three so the phone layout can drop the middle sentence, as the mobile
 * design does, without keeping a second copy of the paragraph.
 */
export const overviewLede = {
  open: "Sri Lanka is small enough to cross in a day and varied enough to hold you for a month.",
  desktopOnly:
    " Tea country in the morning, the coast by evening, and a road between them worth slowing down for.",
  close:
    " What changes a trip here is not the list of places. It is how much time you leave around them.",
};

/**
 * Place names wrapped in `[brackets]` in the bodies below are rendered as links. The
 * island has no page of its own per place, so each points at the journey that covers it.
 */
export const placeLinks: Record<string, string> = {
  Yala: "/packages/wildlife-package",
  Minneriya: "/packages/wildlife-package",
  Mirissa: "/packages/wildlife-package",
  Sigiriya: "/packages/best-of-sri-lanka",
  Dambulla: "/packages/best-of-sri-lanka",
  Anuradhapura: "/packages/best-of-sri-lanka",
  Polonnaruwa: "/packages/best-of-sri-lanka",
  Ella: "/packages/hillcountry",
  "Pekoe Trail": "/packages/hillcountry",
  "Galle Fort": "/packages/scenic-sri-lanka",
};

/** Each paragraph is a bold lead-in plus a body carrying `[place]` links. */
export type OverviewNote = { lead: string; body: string };

export const overviewNotes: OverviewNote[] = [
  {
    lead: "Wildlife on its own terms:",
    body: "Leopards move through the scrub in [Yala], elephants gather near [Minneriya] as the water drops, and blue whales pass the south coast off [Mirissa]. We plan around the hours the animals are actually out, which usually means one early start rather than five.",
  },
  {
    lead: "Ground with a long memory:",
    body: "The rock fortress at [Sigiriya], the cave temples at [Dambulla], and the old capitals of [Anuradhapura] and [Polonnaruwa]. Go early, stay longer at the one that holds you, and skip the rest without guilt.",
  },
  {
    lead: "The slow road:",
    body: "The hill country train to [Ella], and the [Pekoe Trail] through the tea estates above it. These are the parts people describe afterwards, so we give them room in the plan instead of squeezing them between transfers.",
  },
  {
    lead: "A coast that still works:",
    body: "Fishing boats, surf points along the south, and the walls of [Galle Fort] in the last hour of light. Which coast suits you depends on the month you travel, and that is worth settling early.",
  },
];

/* 01 What draws you here ------------------------------------------------------- */

export const experienceFilters = [
  "All",
  "Wildlife",
  "Relaxation",
  "Adventure",
  "Historical",
] as const;
export type ExperienceFilter = (typeof experienceFilters)[number];

export type Experience = {
  title: string;
  body: string;
  image: string;
  href: string;
  tags: Exclude<ExperienceFilter, "All">[];
};

export const experiences: Experience[] = [
  {
    title: "Living culture",
    body: "Temples, markets and the ordinary day around them.",
    image: images.livingCulture,
    href: "/packages",
    tags: ["Historical"],
  },
  {
    title: "Wildlife encounters",
    body: "Leopards, elephants and the whales offshore.",
    image: images.wildlifeEncounters,
    href: "/packages/wildlife-package",
    tags: ["Wildlife", "Adventure"],
  },
  {
    title: "Quiet moments",
    body: "Long beaches, slow mornings, nowhere to be.",
    image: images.quietMoments,
    href: "/packages/dream-honeymoon-in-sri-lanka",
    tags: ["Relaxation"],
  },
  {
    title: "Sacred places",
    body: "Old temples that are still in daily use.",
    image: images.sacredPlaces,
    href: "/packages/best-of-sri-lanka",
    tags: ["Historical"],
  },
];

/* 02 Journeys ------------------------------------------------------------------ */

export type Journey = { title: string; body: string; image: string; href: string };

export const featuredJourneys: Journey[] = [
  {
    title: "Scenic Sri Lanka",
    body: "The island end to end, with the stops left long enough to matter.",
    image: images.scenic,
    href: "/packages/scenic-sri-lanka",
  },
  {
    title: "Hill Country & Beach",
    body: "Cool mornings in the tea estates, then the south coast for the rest.",
    image: images.teaEstate,
    href: "/packages/hillcountry",
  },
  {
    title: "Wildlife Package",
    body: "Early starts in the parks, and nothing scheduled for the afternoons.",
    image: images.wildlifePackage,
    href: "/packages/wildlife-package",
  },
];

export const moreJourneys: { title: string; image: string; href: string }[] = [
  { title: "Simply Sri Lanka", image: images.simply, href: "/packages/simply-srilanka" },
  { title: "Sri Lanka With Little Ones", image: images.littleOnes, href: "/packages" },
  {
    title: "Honeymoon In Sri Lanka",
    image: images.honeymoon,
    href: "/packages/dream-honeymoon-in-sri-lanka",
  },
];

/**
 * The phone layout drops the small-card row and instead carries the honeymoon journey
 * as a fourth card on the rail, where it needs a description like the others.
 */
export const railJourney: Journey = {
  title: "Honeymoon In Sri Lanka",
  body: "Quiet places to land, with room to do nothing at all.",
  image: images.honeymoon,
  href: "/packages/dream-honeymoon-in-sri-lanka",
};

/* 03 The island in pictures ----------------------------------------------------- */

export const galleryImages: { src: string; alt: string }[] = [
  { src: images.cloudForest, alt: "Cloud forest in the hill country" },
  { src: images.teaEstate, alt: "Tea estate at first light" },
  { src: images.simply, alt: "A road through the interior" },
  { src: images.littleOnes, alt: "Working tea slopes" },
  { src: images.honeymoon, alt: "Palms above the coast" },
  { src: images.southCoast, alt: "The south coast in the afternoon" },
  { src: images.wildlifePackage, alt: "A beach with nobody on it" },
  { src: images.scenic, alt: "A stop along the way" },
];

/* 04 Our point of view ---------------------------------------------------------- */

export const pointOfView: { title: string; body: string }[] = [
  {
    title: "A pace that works",
    body: "Two nights where it counts, one where it does not. We build the plan around how you like to travel, not around a fixed number of stops.",
  },
  {
    title: "Time to be there",
    body: "Arriving somewhere is not the same as seeing it. We leave the hours that let a place settle, instead of booking them away.",
  },
  {
    title: "Room to change",
    body: "Weather turns and a place holds you longer than planned. A good itinerary carries slack, and we put it in from the start.",
  },
];

/* 05 How we think about a route -------------------------------------------------- */

export const routeQuestions: { title: string; body: string; image: string }[] = [
  {
    title: "Where would you stay longer?",
    body: "A second night can change the feeling of a place.",
    image: images.cloudForest,
  },
  {
    title: "Which early start is worth it?",
    body: "Make room for the moments you care about most.",
    image: images.quietStop,
  },
  {
    title: "What can stay optional?",
    body: "A good itinerary has space to decide as you go.",
    image: images.optionalDays,
  },
];

/**
 * On a phone the two team photos cross-fade through three frames each instead of
 * sitting still. The first image of each stack is what the desktop layout shows.
 */
export const aboutStacks: { src: string; alt: string }[][] = [
  [
    { src: images.quietStop, alt: "A quiet stop along the route" },
    { src: images.honeymoon, alt: "Palms along the coast road" },
    { src: images.littleOnes, alt: "Tea pickers on an estate slope" },
  ],
  [
    { src: images.scenic, alt: "The Travedise team" },
    { src: images.noteFamily, alt: "A guide on the road" },
    { src: images.noteDates, alt: "Planning a route together" },
  ],
];

/* 07 People behind the plan ------------------------------------------------------ */

export const planningSteps: { title: string; body: string }[] = [
  {
    title: "Tell us what you want",
    body: "Share your dates, interests, travel style, and what you would rather not rush.",
  },
  {
    title: "Explore the options",
    body: "Review journeys and discuss which route feels right for you.",
  },
  {
    title: "Refine the details",
    body: "Work through stays, day plans, and practical choices before anything is final.",
  },
  {
    title: "Confirm and travel",
    body: "Once the plan feels right, confirm your booking and prepare for the journey.",
  },
];

/* 08 Travel notes ---------------------------------------------------------------- */

export const featuredNote = {
  title: "The Ultimate Honeymoon Destination",
  body: "A starting point for thinking about privacy, pace, and where to linger together.",
  image: images.southCoast,
  href: "/blog-posts/the-ultimate-honeymoon-destination",
};

export const secondaryNotes: { title: string; body: string; image: string; href: string }[] = [
  {
    title: "Family-Friendly Destinations That Everyone Will Love",
    body: "Ideas for balancing shared adventures with days that are easy for everyone.",
    image: images.noteFamily,
    href: "/blog-posts/family-friendly-destinations-that-everyone-will-love",
  },
  {
    title: "Where could your dates take you?",
    body: "Tell us when you want to travel. We can discuss which region feels right for that season.",
    image: images.noteDates,
    href: "/contact",
  },
];
