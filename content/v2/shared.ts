/**
 * Copy shared by every v2 page: the navigation, the photo strip, the closing call to
 * action, and the "Before the journey begins" questions. A package page and the home page pull from
 * here so the two never drift apart.
 */

import { images } from "./images";

/** Anchors are written against the home page so the same bar works from a journey page. */
export const navLinks = [
  { href: "/packages", label: "Journeys" },
  { href: "/places", label: "Places" },
  { href: "/#how", label: "How it works" },
  { href: "/blog", label: "Travel notes" },
] as const;

/** The phone menu has room for one more entry than the desktop bar. */
export const mobileNavLinks = [...navLinks, { href: "/#questions", label: "Questions" }] as const;

/** The journey promoted at the foot of the phone menu. */
export const menuFeature = {
  title: "Hill Country & Beach",
  body: "Cool mornings in the tea estates, then the south coast.",
  image: images.teaEstate,
  href: "/packages/hillcountry",
};

/* Photo strip, on the journeys index ----------------------------------------------- */

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

/* 09 Questions -------------------------------------------------------------------- */

export const questions: { q: string; a: string }[] = [
  {
    q: "How do you shape a journey around us?",
    a: "We begin with your dates, interests, and pace. From there, we discuss a route and refine it with you.",
  },
  {
    q: "How much time should we allow for Sri Lanka?",
    a: "Ten days covers the island's highlights without rushing. Two weeks lets you add the east coast or stay longer where you want to.",
  },
  {
    q: "Can we make the trip work for children?",
    a: "Yes. We shorten the drives, build in pool afternoons, and pick stays with room to spread out.",
  },
  {
    q: "What happens after we get in touch?",
    a: "We reply with a few questions, then send a draft route to react to. Nothing is booked until the plan feels right.",
  },
  {
    q: "Can the route change while we plan?",
    a: "As often as you like. Most itineraries go through two or three rounds before they settle.",
  },
  {
    q: "What is included in a proposed trip?",
    a: "Stays, transport with a driver-guide, entrance fees for the sites you choose, and the day plans. We list anything optional separately.",
  },
  {
    q: "How do we choose the right coast for our dates?",
    a: "The monsoons reach the two coasts at opposite times of year. Tell us your dates and we will point you at the one with the better weather.",
  },
];

/* Closing call to action ---------------------------------------------------------- */

export const closingCta = {
  heading: "Let’s make the\njourney yours.",
  body: "Tell us what you want to see, what you want to feel, and how you like to travel. We’ll shape the rest together.",
  action: "Plan your trip",
  href: "/plan-your-trip",
  image: images.ctaBand,
};

/* "Before the journey begins" ------------------------------------------------------ */

export const questionsIntro = {
  heading: "Before the journey begins.",
  body: "A few practical questions are worth settling early. We can talk through the rest together.",
  action: "Talk to a travel designer ↗",
  href: "/plan-your-trip",
};
