/**
 * The journeys index (`app/v2/packages`): the six routes, and the geometry the map
 * explorer draws them with.
 *
 * The alt text here describes what is actually in each photo. The design's own alt
 * text described different pictures, and the key names in `images.ts` carry the same
 * mistake — worth correcting there too.
 *
 * `href` points at a journey's v2 page where one exists and its current page
 * otherwise — only Scenic Sri Lanka has been rebuilt on the v2 template so far.
 */
import { images, packageImages as pkg } from "./images";

/** A place the map can light up. Keys are referenced by each journey's `stops`. */
export type MapStop = {
  cx: number;
  cy: number;
  /** Label position and alignment, so a name never sits on top of the coastline. */
  tx: number;
  ty: number;
  anchor: "start" | "middle" | "end";
  label: string;
};

export const mapStops: Record<string, MapStop> = {
  negombo: { cx: 36.1, cy: 443.9, tx: 24.1, ty: 448.4, anchor: "end", label: "Negombo" },
  colombo: { cx: 41.3, cy: 489.2, tx: 29.3, ty: 493.7, anchor: "end", label: "Colombo" },
  anuradhapura: {
    cx: 134.2,
    cy: 265.7,
    tx: 122.2,
    ty: 270.2,
    anchor: "end",
    label: "Anuradhapura",
  },
  sigiriya: { cx: 196.1, cy: 322.4, tx: 208.1, ty: 326.9, anchor: "start", label: "Sigiriya" },
  dambulla: { cx: 177.2, cy: 338.6, tx: 165.2, ty: 343.1, anchor: "end", label: "Dambulla" },
  kandy: { cx: 173.7, cy: 430.9, tx: 161.7, ty: 435.4, anchor: "end", label: "Kandy" },
  nuwara: { cx: 197.8, cy: 482.8, tx: 185.8, ty: 487.3, anchor: "end", label: "Nuwara Eliya" },
  ella: { cx: 246.0, cy: 499.0, tx: 258.0, ty: 503.5, anchor: "start", label: "Ella" },
  yala: { cx: 309.6, cy: 571.9, tx: 321.6, ty: 576.4, anchor: "start", label: "Yala" },
  udawalawe: { cx: 216.7, cy: 558.9, tx: 228.7, ty: 563.4, anchor: "start", label: "Udawalawe" },
  tangalle: { cx: 201.2, cy: 628.6, tx: 213.2, ty: 633.1, anchor: "start", label: "Tangalle" },
  mirissa: { cx: 144.5, cy: 641.5, tx: 144.5, ty: 664.5, anchor: "middle", label: "Mirissa" },
  galle: { cx: 106.6, cy: 630.2, tx: 94.6, ty: 634.7, anchor: "end", label: "Galle" },
  bentota: { cx: 68.8, cy: 571.9, tx: 56.8, ty: 576.4, anchor: "end", label: "Bentota" },
  wilpattu: { cx: 82.6, cy: 243.0, tx: 70.6, ty: 247.5, anchor: "end", label: "Wilpattu" },
};

/** Places drawn faintly for orientation — nothing on these routes stops there. */
export const mapLandmarks = [
  { cx: 68.8, cy: 47.0, tx: 77.8, ty: 51.0, label: "Jaffna" },
  { cx: 276.9, cy: 221.9, tx: 285.9, ty: 225.9, label: "Trincomalee" },
  { cx: 375.0, cy: 503.8, tx: 384.0, ty: 507.8, label: "Arugam Bay" },
];

/** The island outline. */
export const islandPath =
  "M 106.6 19.4 C 121.0 26.7 144.0 50.3 160.0 64.8 C 175.9 79.3 195.4 98.0 206.4 110.2 C 217.4 122.3 224.4 132.6 228.8 140.9 C 233.2 149.2 229.8 154.2 233.9 162.0 C 238.0 169.8 247.1 179.2 254.6 189.5 C 262.0 199.9 274.3 215.4 280.4 226.8 C 286.4 238.2 284.1 249.2 292.4 260.8 C 300.7 272.5 325.1 288.8 332.0 299.7 C 338.8 310.6 330.7 319.0 335.4 328.9 C 340.1 338.7 353.8 348.3 361.2 361.3 C 368.6 374.2 378.0 393.8 381.8 409.9 C 385.7 425.9 385.0 447.7 385.3 461.7 C 385.6 475.7 387.4 484.4 383.6 497.3 C 379.7 510.3 369.5 531.6 361.2 542.7 C 352.9 553.8 340.8 559.2 332.0 567.0 C 323.2 574.8 313.9 584.8 306.2 591.3 C 298.5 597.8 291.5 602.8 283.8 607.5 C 276.1 612.2 271.2 615.8 258.0 620.5 C 244.8 625.1 216.1 631.5 201.2 636.7 C 186.4 641.8 177.2 651.6 165.1 652.9 C 153.0 654.2 135.7 647.6 125.6 644.8 C 115.4 641.9 108.4 639.4 101.5 635.0 C 94.6 630.6 88.6 627.3 82.6 617.2 C 76.5 607.1 67.5 583.3 63.6 571.9 C 59.8 560.5 62.1 555.8 58.5 545.9 C 54.9 536.1 44.6 519.4 41.3 510.3 C 38.0 501.2 38.7 499.9 37.8 489.2 C 37.0 478.6 37.5 460.5 36.1 443.9 C 34.7 427.3 32.3 403.4 29.2 385.6 C 26.2 367.7 19.7 344.5 17.2 332.1 C 14.7 319.7 12.7 316.4 13.8 307.8 C 14.9 299.2 20.5 290.3 24.1 278.6 C 27.7 267.0 33.1 248.4 36.1 234.9 C 39.1 221.4 42.4 206.8 43.0 194.4 C 43.6 182.0 38.2 168.8 39.6 157.1 C 40.9 145.5 49.1 134.5 51.6 121.5 C 54.1 108.5 56.7 89.1 55.0 76.1 C 53.4 63.2 38.8 49.6 41.3 40.5 C 43.8 31.4 60.1 22.8 70.5 19.4 C 81.0 16.1 92.3 12.2 106.6 19.4 Z";

export type Journey = {
  key: string;
  name: string;
  /** The overline on the card image. */
  theme: string;
  nights: string;
  price: string;
  /** The stops written out, as shown under the name in the route list. */
  route: string;
  /** Keys into `mapStops`, in the order travelled — this also draws the line. */
  stops: string[];
  /** One line, on the cards. */
  short: string;
  /** The longer version, in the map explorer's panel. */
  blurb: string;
  image: string;
  alt: string;
  href: string;
};

export const journeys: Journey[] = [
  {
    key: "simply",
    name: "Simply Sri Lanka",
    theme: "A first visit",
    nights: "10 nights",
    price: "from $3,000 pp",
    route: "Negombo → Anuradhapura → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle",
    stops: ["negombo", "anuradhapura", "sigiriya", "kandy", "nuwara", "yala", "galle"],
    short:
      "The classic loop, paced so it never feels like a checklist. Ruins, tea country, then the south coast.",
    blurb:
      "The classic loop, paced so it never feels like a checklist. Ruins in the cool of the morning, tea country through the middle, then a week of the south coast to finish on.",
    image: images.cloudForest,
    alt: "Coconut palms on a red headland above the sea",
    href: "/packages/simply-srilanka",
  },
  {
    key: "family",
    name: "Sri Lanka With Little Ones",
    theme: "Travelling as a family",
    nights: "11 nights",
    price: "from $3,200 pp",
    route: "Negombo → Dambulla → Kandy → Udawalawe → Mirissa → Bentota",
    stops: ["negombo", "dambulla", "kandy", "udawalawe", "mirissa", "bentota"],
    short:
      "Shorter drives, rooms with space to spread out, and one elephant morning that earns the early start.",
    blurb:
      "Shorter drives, rooms with space to spread out, and an elephant morning that earns the early start. Built for the ages where an hour in the car already counts as a long one.",
    image: images.honeymoon,
    alt: "A table set on the sand at sunset",
    href: "/packages",
  },
  {
    key: "scenic",
    name: "Scenic Sri Lanka",
    theme: "Slow and scenic",
    nights: "8 nights",
    price: "from $2,600 pp",
    route: "Colombo → Kandy → Nuwara Eliya → Ella → Tangalle",
    stops: ["colombo", "kandy", "nuwara", "ella", "tangalle"],
    short:
      "The route we send most people on, with two days in the middle where nothing at all is planned.",
    blurb:
      "The route we send most people on. Hill country by train, a couple of nights where nothing at all is planned, and a quiet stretch of the south before you fly home.",
    image: pkg.northRoad,
    alt: "Two travellers looking out towards Sigiriya rock",
    href: "/v2/packages/scenic-sri-lanka",
  },
  {
    key: "hillcoast",
    name: "Hill Country & Beach",
    theme: "Tea and coast",
    nights: "8 nights",
    price: "from $2,500 pp",
    route: "Kandy → Nuwara Eliya → Ella → Mirissa → Galle",
    stops: ["kandy", "nuwara", "ella", "mirissa", "galle"],
    short:
      "Cold mornings up in the tea estates, then warm evenings on the sand once the road comes back down.",
    blurb:
      "Two halves that could not be less alike. Cold mornings in the estates above Nuwara Eliya, then warm evenings on the sand once the road comes back down to sea level.",
    image: images.teaEstate,
    alt: "A train crossing a viaduct in the hill country",
    href: "/packages/hillcountry",
  },
  {
    key: "wild",
    name: "Wild Sri Lanka",
    theme: "Wildlife",
    nights: "8 nights",
    price: "from $3,000 pp",
    route: "Wilpattu → Sigiriya → Kandy → Udawalawe → Yala",
    stops: ["wilpattu", "sigiriya", "kandy", "udawalawe", "yala"],
    short:
      "Three parks with quite different characters, and the guides who know when the animals are out.",
    blurb:
      "Three parks with quite different characters, and the guides who know them, planned around the hours the animals are actually out. Leopards are never promised, only made likely.",
    image: images.simply,
    alt: "A lit hotel reflected in the water at dusk",
    href: "/packages/wildlife-package",
  },
  {
    key: "honeymoon",
    name: "Honeymoon In Sri Lanka",
    theme: "Just the two of you",
    nights: "10 nights",
    price: "from $4,000 pp",
    route: "Kandy → Nuwara Eliya → Ella → Tangalle → Bentota",
    stops: ["kandy", "nuwara", "ella", "tangalle", "bentota"],
    short: "Fewer stops, longer stays, and the kind of rooms worth staying in well past breakfast.",
    blurb:
      "Fewer stops, longer stays, and the kind of rooms worth staying in past breakfast. A tea bungalow with a fire lit in the evening, then a villa where the beach is the end of the garden.",
    image: images.southCoast,
    alt: "A couple walking the beach at sunset",
    href: "/packages/dream-honeymoon-in-sri-lanka",
  },
];

export const journeysHero = {
  title: "Journeys across Sri Lanka",
  body: "Six routes we run often, each one a starting point rather than a fixed thing. Trace them on the map, read them day by day, then tell us what you would change.",
  image: images.wildlifePackage,
  alt: "A leopard crossing the track ahead of a safari jeep",
};

export const journeysIntro = {
  heading: "One island, and about six honest ways through it.",
  paragraphs: [
    "Sri Lanka is small enough to cross in a day and varied enough that you should not try. These journeys are the shapes we keep coming back to, built around driving times that leave the afternoon free and stays we have slept in ourselves.",
    "Every route here can be shortened, stretched, flipped, or joined to another. The prices are a real starting point for two people sharing, not a teaser.",
  ],
  facts: [
    { value: "8 to 11", detail: "Nights on the ground" },
    { value: "Private", detail: "Your own driver and vehicle" },
    { value: "6 weeks", detail: "A comfortable lead time" },
  ],
};
