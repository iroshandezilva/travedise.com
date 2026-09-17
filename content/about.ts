/**
 * `/about` copy, verbatim from the Webflow site (including its placeholder feature labels
 * "." / ".." — don't "fix" wording here without a content decision).
 *
 * The wide gaps in the hero title, the first intro paragraph and "24/7 Customer  Support"
 * contain non-breaking spaces (U+00A0), as on the reference; keep them or the text reflows.
 */

export const aboutHero = {
  image: "/assets/6a31a4873538dd93efc55bb9_889689e1828de5f6781845e9fddc75b38b82b15e.jpg",
  title: "We design tailor-made journeys  through Sri Lanka",
  intro:
    "Want to see Sri Lanka through local eyes? Our specialists have spent years building relationships across the island and discovering places most visitors never find. They'll get to know exactly what you're looking for and design something that's completely yours. Ready to start planning? Get in touch and let's create your perfect Sri Lankan adventure.",
};

export type StayFeature = { icon: string; label: string };

export type FeaturedStay = {
  name: string;
  description: string;
  price: string;
  image: string;
  /** The three icon + label chips over the photo: view, room type, pool. */
  features: [StayFeature, StayFeature, StayFeature];
};

const VIEW = "/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png";
const ROOM = "/assets/69c38c90a6a389dfc58352ef_bed-alt.png";
const POOL = "/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png";

const features = (view: string, room: string, pool: string, icons = [VIEW, ROOM, POOL]) =>
  [
    { icon: icons[0], label: view },
    { icon: icons[1], label: room },
    { icon: icons[2], label: pool },
  ] as FeaturedStay["features"];

export const featuredStaysHeading = {
  tag: "Featured Stays",
  title:
    "Stay where comfort meets character. Each hotel for its style, service, and sense of place.",
};

export const featuredStays: FeaturedStay[] = [
  {
    name: "Hilton Yala Resort",
    description:
      "Luxury retreat offering elegant stays and easy access to wildlife adventures in Yala.",
    price: "$320/night",
    image:
      "/assets/6a4694e684fc9300dae33f8b_dji_fly_20231005_135124_26_1696487241346_photo_743eb42946abdea5455b88162e9a8b39d0ef392b.jpg",
    features: features("Jungle Views", "Private Villas", "Attached Pool"),
  },
  {
    name: "Jetwing Blue Hotel Negambo",
    description:
      "Jetwing Blue is a beachfront hotel in Negombo, perfect for a relaxing coastal stay.",
    price: "$320/night",
    image: "/assets/6a4693353db0afd077906b03_Exp-1920X656.jpg",
    features: features("Ocean View", "Private Rooms", "."),
  },
  {
    name: "Heritance Kandalama",
    description:
      "Heritance Kandalama is an iconic luxury hotel seamlessly built into the surrounding rock and forest, offering breathtaking views of Kandalama Lake and easy access to Sri Lanka’s Cultural Triangle.",
    price: "$320/night",
    image: "/assets/6a46912fd643365866c4ae37_b160707001-banner-size.jpg",
    features: features("Lake & Mountain View", "Private Rooms", "."),
  },
  {
    name: "Cape Weligama",
    description:
      "A luxury clifftop resort offering elegant villas, stunning ocean views, world-class dining, and the perfect setting for a relaxing coastal escape.",
    price: "$320/night",
    image: "/assets/6a461dbef9544749a2e40601_Cape-Weligama-Aerial-View.webp",
    features: features("Ocean View", "Open Resort", "Infinity Pool"),
  },
  {
    name: "Double Tree By Hilton Weerawila",
    description:
      "A luxury lakeside retreat offering stylish rooms, exceptional hospitality, and easy access to Sri Lanka’s wildlife and southern attractions.",
    price: "$320/night",
    image: "/assets/6a461b7f02b600abc153dc8c_1578123151385.jpeg",
    features: features("Lake View", "Private Rooms", "."),
  },
  {
    name: "Jetwing Lighthouse Hotel",
    description: "Luxury beachfront resort with stunning beach views",
    price: "$320/night",
    image: "/assets/6a46163446b25f61e046cd05_jetwing-lighthouse-gallery-image-16.jpg",
    features: features("Ocean View", "Private Rooms", ".."),
  },
  {
    name: "Aadya Tea Bangalow",
    description:
      'a premium, 5-star luxury boutique property located on a rehabilitated 200-acre tea estate in Maskeliya (near Hatton), Sri Lanka. Nestled at an elevation of 1,250 meters bordering the Sri Pada (Adam\'s Peak) Wilderness Reserve, it offers an exclusive, secluded "up-country" living experience.',
    price: "$320/night",
    image: "/assets/6a46178ef3bce7c6d417fb2d_aadya-tea-bungalow.jpg",
    features: features("Mountain View", "Boutique Villa", "Attached Pool", [
      "/assets/6a3d1158fc98902a45ad9479_69c38c90a6a389dfc58352ee_island-tropicalpct20-1-.png",
      "/assets/6a3d1158fc98902a45ad9483_69c38c90a6a389dfc58352ef_bed-alt.png",
      "/assets/6a3d1158fc98902a45ad9480_69c38c90a6a389dfc58352f0_swimmerpct20-1-.png",
    ]),
  },
];

export const aboutIntro = {
  tag: "About Travedise",
  title: "More than a travel agency we’re your insider on the ground in Sri Lanka",
  paragraphs: [
    "Travedise was founded by Chamara after more than 20 years  working inside Sri Lanka’s hospitality and travel industry. That experience shapes every journey we build from which properties are genuinely worth the price, to which park to visit and when, to the roads and routes that most itineraries miss entirely.",
    "We specialise in tailor-made journeys for couples and small groups who want to see Sri Lanka properly. That means covering the four things that make this country worth the trip: the heritage, the wildlife, the hill country, and the coast — paced well enough to actually enjoy each one.",
  ],
  author: {
    name: "Chamara",
    role: "Founder and Sri Lanka Travel Specialist",
    image: "/assets/6a31b00d3b0c4342f7883cf2_About-Autthor-Icon.jpg",
  },
};

export type Highlight = {
  title: string;
  /** Lines of the description; each break is rendered as a <br>. */
  description: string[];
};

/** The four expanding cards beside the intro. Exactly one is open at a time. */
export const aboutHighlights: Highlight[] = [
  {
    title: "Personalized Itineraries",
    description: ["Every trip is custom-crafted around your interests, pace, and preferences."],
  },
  {
    title: "24/7 Customer  Support",
    description: [
      "Round-the-clock personalized assistance to make your stay smooth, comfortable, and worry-free.",
    ],
  },
  {
    title: "Curated Destinations",
    description: [
      "Handpicked exclusive locations offering unique experiences tailored to your needs and desires.",
    ],
  },
  {
    title: "Trusted Local Experts",
    description: [
      "Knowledgeable friendly guides to help you explore",
      "hidden gems, traditions, and authentic culture.",
    ],
  },
];
