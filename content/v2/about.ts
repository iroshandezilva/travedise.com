/**
 * Copy for the About page (`app/about`), from the "About The team" design.
 *
 * The design left slots for things only the team can supply: portraits and names, a
 * quote from Chamara, the number of journeys arranged, real reviews, and office hours.
 * Nothing is invented to fill them. Each slot below is empty until the real thing
 * arrives, and the page leaves out whatever is empty — add it here and it appears.
 */
import { images, packageImages } from "./images";

export const aboutHero = {
  title: "The people who draw your route",
  body: "A small team in Galle and one desk near Sydney. Everything on this site is a route we have driven ourselves.",
  image: packageImages.sigiriyaStay,
  alt: "A Travedise jeep on the red road south",
};

export const opening = {
  heading: "We kept meeting people who had seen the island without ever stopping in it.",
  paragraphs: [
    "Nine places in ten days, three hours in the car between each one, and a camera roll that all looks the same. Travedise started because the alternative was obvious and nobody was selling it: fewer stops, longer in each, and someone local deciding what is worth the early start.",
    // The design left the year as [YEAR]; the 20 years is the figure the site already uses.
    "Chamara has spent more than 20 years in Sri Lanka’s hospitality and travel industry. The team is small on purpose, and it stays small so the person who draws your route is the person who answers when you message from the road.",
  ],
  // The design also has "[N] Journeys arranged"; add it here once there is a real count.
  stats: [
    { value: "20+", label: "Years planning here" },
    { value: "2", label: "Desks, Galle and NSW" },
  ],
};

/** The three postage-stamp photos beside the opening, back to front. */
export const stamps = [
  {
    src: images.scenic,
    alt: "Travellers sitting above the Cultural Triangle at Pidurangala",
    caption: "Pidurangala · 06:14",
  },
  {
    src: images.littleOnes,
    alt: "A child watching the road from the jeep",
    caption: "Udawalawe · 06:40",
  },
  {
    src: images.quietStop,
    alt: "An avenue of palms running down to the coast",
    caption: "Tangalle · 17:40",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  /** A real portrait. Members without one are not shown. */
  portrait?: string;
};

export const team = {
  heading: "Five of us, and the drivers who make it work.",
  intro:
    "You will deal with one of us from the first message to the flight home. The others are who we ask when a question is outside what we know well.",
  lead: {
    name: "Chamara",
    role: "Founder, and the one who draws most of the routes",
    portrait: undefined as string | undefined,
    // The design has a two- or three-line quote here in Chamara's own words. Until he
    // writes one, the card carries the founding story the site already told.
    quote: undefined as string | undefined,
    story:
      "Travedise was founded by Chamara after more than 20 years working inside Sri Lanka’s hospitality and travel industry. That experience shapes every journey: which stays are worth the price, which park to visit and when, and the roads most itineraries miss.",
  },
  /** The rest of the team, from the design's four roles. Names and portraits to come. */
  members: [] as TeamMember[],
};

export const principles = {
  heading: "What we will tell you, even when it costs us the booking.",
  intro:
    "Most of what makes a trip here good is decided before you land. These are the four calls we make the same way every time.",
  items: [
    {
      title: "Fewer places, longer in each",
      body: "Four stops done properly beats nine done from the car window. If your dates only allow four, we will say so rather than sell you nine.",
      tone: "sky",
    },
    {
      title: "The month decides the coast",
      body: "If you are coming in July and you have set your heart on the south, we will tell you to go east instead. Weather is not something to be optimistic about.",
      tone: "sand",
    },
    {
      title: "We have slept in the rooms",
      body: "Every stay we put you in is one of us has stayed in, or someone on the team has. Where that is not true yet, we say so.",
      tone: "ember",
    },
    {
      title: "We will tell you what to skip",
      body: "There are famous things here that are not worth your morning. Ask us and you will get a straight answer, not a longer itinerary.",
      tone: "sky",
    },
  ] as const,
};

export type Review = {
  /** Word for word as the traveller wrote it. */
  quote: string;
  name: string;
  /** e.g. "Hill Country & Beach, March 2026". */
  trip: string;
  source: string;
};

/**
 * "What travellers said afterwards." Only reviews a traveller actually wrote, pasted
 * exactly as they came. The section stays hidden while this list is empty.
 */
export const reviews = {
  heading: "What travellers said afterwards.",
  /** e.g. { value: "4.9", count: 120, source: "Google", href: "https://…" } */
  rating: undefined as { value: string; count: number; source: string; href: string } | undefined,
  items: [] as Review[],
};

export const offices = {
  heading: "One office on the island, one close to home.",
  items: [
    {
      place: "Galle, Sri Lanka",
      address: ["212A Inland Hill Road", "Karapitiya, Galle"],
      phone: { label: "+94 76 397 2171", href: "tel:+94763972171" },
    },
    {
      place: "Bundeena, Australia",
      address: ["5/22-30 Brighton St", "Bundeena NSW 2230"],
      phone: { label: "+61 426 965 569", href: "tel:+61426965569" },
    },
  ],
  note: "Between the two we cover most waking hours in Australia, the UK and Sri Lanka. If you write overnight, someone picks it up in the morning of whichever place is awake.",
};
