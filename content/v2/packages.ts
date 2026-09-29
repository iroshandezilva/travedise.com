/**
 * Data behind the package template (`app/packages/[slug]`).
 *
 * The template renders whatever is in `packagesV2`, so adding a journey is a matter of
 * adding an entry here — no new components. Scenic Sri Lanka was written for the v2
 * design; the other four carry the itineraries, hotels and photos from the Webflow pages
 * they replace. Simply Sri Lanka never had an itinerary, so it has no page yet.
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
  /** `note` is left out where we have nothing true to say about the stay yet. */
  stay: { name: string; note?: string; thumb: string };
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
  /** The answer to "How much time should we allow?" in this page's questions. */
  timeAnswer: string;
};

/** Photos carried over from the Webflow pages, served from `public/assets`. */
const a = (file: string) => `/assets/${file}`;

const old = {
  // Seen and described.
  fireDancers: a("6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg"),
  toothTemple: a(
    "6a85caa3b24274cca9f6b538_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
  ),
  hillFalls: a("6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg"),
  nineArches: a("6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg"),
  beachFromAbove: a("6a85cadcae81d435ad91cca6_mika-wegelius-4myLzGehR-A-unsplash.jpg"),
  galleShopfront: a("6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg"),
  elephantJeep: a("6a85d049dd0c867f75bb1fb0_tom-paisley-v2zEiziFb44-unsplash.jpg"),
  safariJeep: a("6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg"),
  jeepUnderTree: a("6a34fe1ef0bb9659676e77e8_pexels-naveen-3885421-5780322-1.jpg"),
  childOnSafari: a("6a41dd7eab34901277d0a2df_6.jpg"),
  coupleBentota: a("6a41d8a9f90b0844dda793bf_Couple-on-Bentota-Beach.webp"),
  trainOnArches: a("6a41dca96291ea3120748b1b_R806lZ8a9OCcxaRnHAtBY8t7F3ZIFpQdlaRoFCYK.jpg"),
  forestFalls: a("6a41dcaf0426a2d1ca0c18f8_rRQEdwLLHTRS2VchZxX9x2zoKTwSlevfwwWKqqPJ.jpg"),
  ridgeView: a("6a41dcb30f8b718ed78a3194_aoE6iw4OzAGMm9KAx8xSM2gMjKZAwrWGRZ9JhgHm.jpg"),
  trainWindow: a(
    "6a41dceae7f211ad542c5b87_ella-hill-country-tour-a-perfect-day-tour-in-sri-lanka-768x432.jpg",
  ),
  leopardJeep: a(
    "6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg",
  ),
  leopard: a("6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg"),
  // Chosen for a place on the old pages; captioned by that place.
  kandyStreet: a("6a85caa28a3782248e1325cc_promodhya-abeysekara-gjd-7_3Ek_w-unsplash.jpg"),
  nuwara1: a("6a85cab51c8f537ecd5c1d22_juho-s-uDk9n1yKxTw-unsplash-2.jpg"),
  nuwara2: a("6a85cab545d11fde2087318e_yasasi-rajapakse-poadBPsShxg-unsplash.jpg"),
  yala1: a("6a85d04945d11fde208b9d2e_kanchana-amilani-fSf4hHZVA5E-unsplash.jpg"),
  yala2: a("6a85d049729f85529f8e8328_paul-kapischka-43fXBR3mqoY-unsplash-2.jpg"),
  yala3: a("6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg"),
  yala4: a("6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg"),
  galle1: a("6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg"),
  galle2: a("6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg"),
  colombo1: a("6a85d08e49debf4a9d6c9a77_alex-azabache-8weolGgaa9w-unsplash.jpg"),
  colombo2: a("6a85d08e5a0e4c58b8c2b47b_igor-savelev-K2iffxrHpjk-unsplash.jpg"),
  colombo3: a("6a85d08e29a3907af03f4843_jalitha-hewage-Dw2QYtzSNn0-unsplash.jpg"),
  tangalle1: a("6a85cadcb5e51023ec716dd9_jannes-jacobs-L9GKXQwpadw-unsplash.jpg"),
  tangalle2: a("6a85cadc004b944edbd46b9c_pexels-esrageziyor-45760220-11490128.jpg"),
  ella1: a("6a85d552540f9e4ab4d3965d_matt-dany-KhVYyckCj_8-unsplash.jpg"),
  ella2: a("6a85d55282af03360bc76fcf_praveen-maleesha-Qjbu8uEnyeo-unsplash.jpg"),
  sigiriyaRock: a("6a97dc9551f90341d964a424_209329-sigiriya-rock-fortress-sri-lanka.jpg"),
  sigiriya2: a("6a97dc9a2011f106f35dfd8b_Sigiriya-4.jpg"),
  minneriya: a("6a97dca45af87a267af356ae_Minneriya-National-Park.jpg"),
  kandy: a("6a97dd12dc2bb83ea205120f_a_realistic_high_detail_travel_photograph_of_kandy-2.jpeg"),
} as const;

/** Hotel photos from the old pages. */
const hotel = {
  myst: a("6a8205a7578bf13b655eb832_mystbycinnomon.jpg"),
  araliya: a("6a821a5ef8c5e1a53bcbcfb8_Araliya-Green.jpg"),
  doubleTree: a("6a82193321e7807773ab692c_Double-Tree-by-Hilton.jpg"),
  jetwingLighthouse: a("6a8207692602657800f43eea_Jetwing-Lighthouse.jpg"),
  hiltonColombo: a("6a821ae61c4e4e5a87d3db02_Hilton-Colombo.jpg"),
  tharu: a("6a821b5ca09db9b6fb389c89_Tharu-Village.jpeg"),
  teaTrails: a("6a82185461ff4081ebc3ae71_Ceylon-Tea-Trails.jpg"),
  hiltonYalaResort: a("6a4694ef97b30cec1228a1ba_hilton-yala-resort.jpg"),
  hiltonYala: a("6a8206e661ff4081ebbfb01e_Hilton-Yala.webp"),
  anantara: a("6a8207271ef510e93459e0fc_Anantara-Peace-Haven.avif"),
  selenya: a("6a97d8d83660a4acd16cb9ad_hero-poster.avif"),
  anasa: a("6a81fb7ea325af1ae46b6b37_Anasa_Wellness_Resort_logo.jpg"),
  jetwingLake: a("6a97db693e8b196e3ca74e68_jetwing-lake.jpg"),
  cinnamonKandy: a("6a97dd5991c3c6b5f19a4a98_Cinnamon-Citadel-Kandy-800x520-1.jpg"),
} as const;

const transfer = (thumb: string) => ({
  name: "Private transfer",
  note: "Colombo airport, timed to your flight.",
  thumb,
});

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
  timeAnswer:
    "Eleven days covers this route without rushing. Shorter trips usually mean dropping a region rather than moving faster.",
};

const littleOnes: PackageV2 = {
  slug: "best-of-sri-lanka",
  title: "Sri Lanka With Little Ones",
  summary:
    "Family-paced and full of things to point at, from the hills around Kandy to a week on the south coast.",
  shots: [
    { src: old.childOnSafari, label: "Watching an elephant from the jeep" },
    { src: old.elephantJeep, label: "An elephant crossing ahead of a safari jeep" },
    { src: old.jeepUnderTree, label: "A safari jeep under an old tree" },
    { src: old.hillFalls, label: "Waterfalls in the hill country" },
  ],
  facts: [
    { value: "10 days", detail: "Private, paced for children" },
    { value: "Five stops", detail: "Kandy · Nuwara Eliya · Weerawila · Galle · Colombo" },
    { value: "Best months", detail: "December to April, when the south coast is dry" },
  ],
  includes: {
    heading: "What the journey includes.",
    body: "Everything below is arranged before you land, with shorter drives and rooms that have space to spread out. Flights and visas sit outside the plan, and we will say so clearly in the proposal.",
    items: [
      {
        title: "Accommodation",
        body: "Nine nights in family-friendly stays, from Myst by Cinnamon in Kandy to Jetwing Lighthouse in Galle and a last night at the Hilton Colombo.",
      },
      {
        title: "Activities",
        body: "A dance show in Kandy, the Botanical Gardens, pedal boats and pony rides at Lake Gregory, a tea factory visit and jeep safaris.",
      },
      {
        title: "Meals",
        body: "Breakfast every day, plus the meals that are part of a stay or a long drive. The rest stays open for wherever the children want to eat.",
      },
      {
        title: "Transfers and driver",
        body: "Airport pick-up and drop-off, and the same driver and vehicle throughout, with the drives kept short and the stops frequent.",
      },
    ],
  },
  itinerary: {
    heading: "The island, at their pace.",
    lede: "Open a day to see what it holds and where you sleep.",
    days: [
      {
        meta: "Days 1–2 · Kandy",
        title: "An Easy Start for the Family",
        body: "The dance show’s fire-walkers thrill the kids; the Botanical Gardens have lawns to run on and a treetop bat colony.",
        stay: { name: "Myst by Cinnamon", thumb: hotel.myst },
        photos: [
          { src: old.fireDancers, caption: "Fire dancers after dark" },
          { src: old.toothTemple, caption: "The Temple of the Tooth, Kandy" },
          { src: old.kandyStreet, caption: "Kandy" },
        ],
      },
      {
        meta: "Days 3–4 · Nuwara Eliya",
        title: "Boats, Ponies and Cool Green Air",
        body: "Lake Gregory brings pedal boats and pony rides, plus a tea factory visit, all at a family pace.",
        stay: { name: "Araliya Green", thumb: hotel.araliya },
        photos: [
          { src: old.hillFalls, caption: "Waterfalls in the hill country" },
          { src: old.nuwara1, caption: "Around Nuwara Eliya" },
          { src: old.nuwara2, caption: "Around Nuwara Eliya" },
        ],
      },
      {
        meta: "Days 5–6 · Weerawila",
        title: "The Bit They’ll Never Forget",
        body: "Safari. Jeep drives for elephants, deer and crocodiles, with pool time in between.",
        stay: { name: "DoubleTree by Hilton", thumb: hotel.doubleTree },
        photos: [
          { src: old.yala1, caption: "On safari" },
          { src: old.yala2, caption: "On safari" },
          { src: old.elephantJeep, caption: "An elephant ahead of the jeep" },
        ],
      },
      {
        meta: "Days 7–8 · Galle",
        title: "Beach Days on the Coast",
        body: "An easy, walkable fort with ice-cream stops one day, the beach and pool the next.",
        stay: { name: "Jetwing Lighthouse", thumb: hotel.jetwingLighthouse },
        photos: [
          { src: old.galle1, caption: "Galle" },
          { src: old.galleShopfront, caption: "A shopfront inside the fort" },
          { src: old.galle2, caption: "Galle" },
        ],
      },
      {
        meta: "Day 9 · Colombo",
        title: "One Last City Night",
        body: "A final city night for shopping, a good meal and a quick look around the capital.",
        stay: { name: "Hilton Colombo", thumb: hotel.hiltonColombo },
        photos: [
          { src: old.colombo1, caption: "Colombo" },
          { src: old.colombo2, caption: "Colombo" },
          { src: old.colombo3, caption: "Colombo" },
        ],
      },
      {
        meta: "Day 10 · Airport",
        title: "Time to Fly Home",
        body: "Short transfer to the airport for your flight home.",
        stay: transfer(old.colombo1),
        photos: [],
      },
    ],
  },
  timeAnswer:
    "Ten days covers this route at a child’s pace. Shorter trips usually mean dropping a stop rather than adding driving.",
};

const honeymoon: PackageV2 = {
  slug: "dream-honeymoon-in-sri-lanka",
  title: "Honeymoon In Sri Lanka",
  summary:
    "Slow, intimate and indulgent, written for two: tea country, a little wildness, then the south coast.",
  shots: [
    { src: old.coupleBentota, label: "A couple on the beach at Bentota" },
    { src: old.nineArches, label: "Nine Arches Bridge above the tea" },
    { src: old.hillFalls, label: "Waterfalls in the hill country" },
    { src: old.beachFromAbove, label: "The south coast from above" },
  ],
  facts: [
    { value: "10 days", detail: "Private, written for two" },
    { value: "Five stops", detail: "Kandy · Nuwara Eliya · Yala · Tangalle · Galle" },
    { value: "Best months", detail: "December to April, when the south coast is dry" },
  ],
  includes: {
    heading: "What the journey includes.",
    body: "Everything below is arranged before you land, so the days ask nothing of you beyond turning up. Flights and visas sit outside the plan, and we will say so clearly in the proposal.",
    items: [
      {
        title: "Accommodation",
        body: "Nine nights with fewer stops and longer stays: Tharu Village, Ceylon Tea Trails, Hilton Yala, three nights at Anantara Peace Haven and Selenya Talpe.",
      },
      {
        title: "Activities",
        body: "Tea country and Horton Plains, a safari in Yala, and couples’ treatments on the coast. The rest is time that belongs to the two of you.",
      },
      {
        title: "Meals",
        body: "Breakfast every day, plus the meals that are part of a stay. Long dinners are left open so you can choose where to have them.",
      },
      {
        title: "Transfers and driver",
        body: "Airport pick-up and drop-off, and the same private driver and vehicle for the whole route.",
      },
    ],
  },
  itinerary: {
    heading: "The island, for two.",
    lede: "Open a day to see what it holds and where you sleep.",
    days: [
      {
        meta: "Days 1–2 · Kandy",
        title: "A Gentle Start for Two",
        body: "Arrival into Sri Lanka. Water buffalo walking the streets, monkeys alongside the road, bright tuk-tuks, displaying peacocks, palm trees and banana plantations keep the window busy as your private driver takes you from the airport to your hotel.",
        stay: { name: "Tharu Village", thumb: hotel.tharu },
        photos: [
          { src: old.fireDancers, caption: "Fire dancers after dark" },
          { src: old.toothTemple, caption: "The Temple of the Tooth, Kandy" },
          { src: old.kandyStreet, caption: "Kandy" },
        ],
      },
      {
        meta: "Days 3–4 · Nuwara Eliya",
        title: "Planter’s Bungalows, Just for You",
        body: "Explore endless tea plantations, misty mountains, scenic waterfalls, Gregory Lake, charming colonial buildings, and the breathtaking beauty of Horton Plains. A perfect escape for nature, adventure, relaxation, and unforgettable views.",
        stay: { name: "Ceylon Tea Trails", thumb: hotel.teaTrails },
        photos: [
          { src: old.hillFalls, caption: "Waterfalls in the hill country" },
          { src: old.nuwara1, caption: "Around Nuwara Eliya" },
          { src: old.nuwara2, caption: "Around Nuwara Eliya" },
        ],
      },
      {
        meta: "Days 5–6 · Yala",
        title: "A Little Wildness Together",
        body: "Experience Sri Lanka’s wild side with a safari through Yala National Park, home to leopards, elephants, crocodiles, and incredible birdlife.",
        stay: { name: "Hilton Yala", thumb: hotel.hiltonYalaResort },
        photos: [
          { src: old.yala3, caption: "Yala" },
          { src: old.yala4, caption: "Yala" },
          { src: old.safariJeep, caption: "A safari jeep under the trees" },
        ],
      },
      {
        meta: "Days 7–9 · Tangalle",
        title: "The Heart of the Honeymoon",
        body: "Three nights on a quiet stretch of sand. Beach, pool, couples’ treatments and long dinners.",
        stay: { name: "Anantara Peace Haven", thumb: hotel.anantara },
        photos: [
          { src: old.tangalle1, caption: "Tangalle" },
          { src: old.beachFromAbove, caption: "The beach from above" },
          { src: old.tangalle2, caption: "Tangalle" },
        ],
      },
      {
        meta: "Day 10 · Galle",
        title: "The Most Romantic Nights on the Coast",
        body: "Explore the iconic Galle Fort, stroll through charming colonial streets, enjoy beautiful beaches, and experience the perfect blend of history, culture, and coastal charm.",
        stay: { name: "Selenya Talpe", thumb: hotel.selenya },
        photos: [
          { src: old.galle1, caption: "Galle" },
          { src: old.galleShopfront, caption: "A shopfront inside the fort" },
          { src: old.galle2, caption: "Galle" },
        ],
      },
    ],
  },
  timeAnswer:
    "Ten days lets you stay put for three nights on the coast. Shorter trips usually mean dropping a stop rather than moving faster.",
};

const hillCountry: PackageV2 = {
  slug: "hillcountry",
  title: "Hill Country & Beach",
  summary:
    "Cool mountain scenery, tea plantations and waterfalls, then golden beaches on the south coast. The perfect blend of relaxation and adventure.",
  shots: [
    { src: old.trainOnArches, label: "The blue train on Nine Arches Bridge" },
    { src: old.forestFalls, label: "A waterfall in the forested hills" },
    { src: old.ridgeView, label: "The view from the high ridges" },
    { src: old.trainWindow, label: "On the train through the hills" },
  ],
  facts: [
    { value: "9 days", detail: "Private, tailor-made" },
    {
      value: "Six stops",
      detail: "Kandy · Nuwara Eliya · Ella · Yala · Tangalle · Galle",
    },
    { value: "Best months", detail: "December to April, when the hills and south coast are dry" },
  ],
  includes: {
    heading: "What the journey includes.",
    body: "Everything below is arranged before you land, so the days ask nothing of you beyond turning up. Flights and visas sit outside the plan, and we will say so clearly in the proposal.",
    items: [
      {
        title: "Accommodation",
        body: "Eight nights, from Myst by Cinnamon in Kandy and Araliya Green in the hills to Anantara Peace Haven and Jetwing Lighthouse on the coast.",
      },
      {
        title: "Activities",
        body: "The Temple of the Tooth, Horton Plains, Little Adam’s Peak, the Nine Arches Bridge and Ravana Falls, and two days of jeep safaris in Yala.",
      },
      {
        title: "Meals",
        body: "Breakfast every day, plus the meals that are part of a stay or a long drive. The rest stays open, because eating out is half the trip.",
      },
      {
        title: "Transfers and driver",
        body: "Airport pick-up and drop-off, and the same driver and vehicle for the whole route, from the hills down to the sea.",
      },
    ],
  },
  itinerary: {
    heading: "From the tea to the sea.",
    lede: "Open a day to see what it holds and where you sleep.",
    days: [
      {
        meta: "Day 1 · Kandy",
        title: "Sri Lanka’s Last Kingdom",
        body: "Discover Sri Lanka’s cultural heart with the Temple of the Sacred Tooth Relic, scenic Kandy Lake, lush hills, and rich traditions.",
        stay: { name: "Myst by Cinnamon", thumb: hotel.myst },
        photos: [],
      },
      {
        meta: "Day 2 · Nuwara Eliya",
        title: "Little England in the Clouds",
        body: "Explore endless tea plantations, misty mountains, scenic waterfalls, Gregory Lake, charming colonial buildings, and the breathtaking beauty of Horton Plains. A perfect escape for nature, adventure, relaxation, and unforgettable views.",
        stay: { name: "Araliya Green", thumb: hotel.araliya },
        photos: [],
      },
      {
        meta: "Day 3 · Ella",
        title: "Ridgelines and Railway Bridges",
        body: "A day on foot: Little Adam’s Peak, the Nine Arches Bridge and Ravana Falls, with cafe hopping to finish.",
        stay: { name: "Anasa Wellness Resort", thumb: hotel.anasa },
        photos: [],
      },
      {
        meta: "Days 4–5 · Yala",
        title: "Down to Leopard Country",
        body: "Two days of jeep safaris in leopard country, plus elephants and birdlife. Mornings for the animals, afternoons by the pool.",
        stay: { name: "Hilton Yala", thumb: hotel.hiltonYala },
        photos: [],
      },
      {
        meta: "Day 6 · Tangalle",
        title: "Your First Taste of the Coast",
        body: "Slow days between the sea and the spa, with the Hummanaya blow hole nearby.",
        stay: { name: "Anantara Peace Haven", thumb: hotel.anantara },
        photos: [],
      },
      {
        meta: "Days 7–8 · Galle",
        title: "The Fort by the Sea",
        body: "Explore the iconic Galle Fort, stroll through charming colonial streets, enjoy beautiful beaches, and experience the perfect blend of history, culture, and coastal charm.",
        stay: { name: "Jetwing Lighthouse", thumb: hotel.jetwingLighthouse },
        photos: [],
      },
      {
        meta: "Day 9 · Airport",
        title: "Time to Fly Home",
        body: "Private transfer to Colombo airport for your flight home.",
        stay: transfer(old.trainWindow),
        photos: [],
      },
    ],
  },
  timeAnswer:
    "Nine days covers the hills and the coast without rushing. Shorter trips usually mean dropping a stop rather than moving faster.",
};

const wildlife: PackageV2 = {
  slug: "wildlife-package",
  title: "Wild Sri Lanka",
  summary: "Nature end to end, from elephant country around Sigiriya to the leopards of Yala.",
  shots: [
    { src: old.leopardJeep, label: "A leopard crossing ahead of a safari jeep" },
    { src: old.leopard, label: "A leopard on the red earth" },
    { src: old.safariJeep, label: "A safari jeep under the trees" },
    { src: old.nineArches, label: "Nine Arches Bridge above the tea" },
  ],
  facts: [
    { value: "9 days", detail: "Private, tailor-made" },
    { value: "Five stops", detail: "Sigiriya · Kandy · Ella · Yala · Galle" },
    {
      value: "Best months",
      detail: "February to July for Yala; November to April for whales off Mirissa",
    },
  ],
  includes: {
    heading: "What the journey includes.",
    body: "Everything below is arranged before you land, planned around the hours the animals are actually out. Flights and visas sit outside the plan, and we will say so clearly in the proposal.",
    items: [
      {
        title: "Accommodation",
        body: "Eight nights, from Jetwing Lake near Sigiriya and Cinnamon Kandy to DoubleTree by Hilton for the park and Jetwing Lighthouse in Galle.",
      },
      {
        title: "Activities",
        body: "The climb at Sigiriya, a jeep drive in Minneriya, the walks around Ella, two days of safaris in Yala, and whale watching off Mirissa in season.",
      },
      {
        title: "Meals",
        body: "Breakfast every day, plus the meals that are part of a stay or an early safari. The rest stays open.",
      },
      {
        title: "Transfers and driver",
        body: "Airport pick-up and drop-off, and the same driver and vehicle throughout, with park entry and jeeps arranged ahead.",
      },
    ],
  },
  itinerary: {
    heading: "The island, on the wild side.",
    lede: "Open a day to see what it holds and where you sleep.",
    days: [
      {
        meta: "Days 1–2 · Sigiriya",
        title: "Rock Fortress and Wildlife",
        body: "Day one, the climb up Sigiriya, the rock fortress above the plain. Day two, a jeep drive in Minneriya National Park, where elephants gather at the water.",
        stay: { name: "Jetwing Lake", thumb: hotel.jetwingLake },
        photos: [
          { src: old.sigiriyaRock, caption: "Sigiriya rock fortress" },
          { src: old.sigiriya2, caption: "Sigiriya" },
          { src: old.minneriya, caption: "Minneriya National Park" },
        ],
      },
      {
        meta: "Day 3 · Kandy",
        title: "The Last Kingdom in Sri Lanka",
        body: "Discover Sri Lanka’s cultural heart with the Temple of the Sacred Tooth Relic, scenic Kandy Lake, lush hills, and rich traditions.",
        stay: { name: "Cinnamon Kandy", thumb: hotel.cinnamonKandy },
        photos: [{ src: old.kandy, caption: "Kandy" }],
      },
      {
        meta: "Day 4 · Ella",
        title: "Where the Train Threads the Jungle",
        body: "An active hill day: Little Adam’s Peak, the Nine Arches Bridge and Ravana Falls, alive with birds and butterflies.",
        stay: { name: "98 Acres Resort & Spa", thumb: old.ella1 },
        photos: [
          { src: old.nineArches, caption: "Nine Arches Bridge above the tea" },
          { src: old.ella1, caption: "Ella" },
          { src: old.ella2, caption: "Ella" },
        ],
      },
      {
        meta: "Days 5–6 · Yala",
        title: "The Highest Leopard Density on Earth",
        body: "The heart of the trip. Two days of safaris for leopards, elephants, sloth bears and dazzling birdlife.",
        stay: { name: "DoubleTree by Hilton", thumb: hotel.doubleTree },
        photos: [
          { src: old.yala3, caption: "Yala" },
          { src: old.yala4, caption: "Yala" },
          { src: old.safariJeep, caption: "A safari jeep under the trees" },
        ],
      },
      {
        meta: "Days 7–8 · Galle",
        title: "Fort, Beach and Blue Whales",
        body: "Wind down at the fort and the beach. In season (November to April), add blue whale watching off nearby Mirissa.",
        stay: { name: "Jetwing Lighthouse", thumb: hotel.jetwingLighthouse },
        photos: [
          { src: old.galle1, caption: "Galle" },
          { src: old.galleShopfront, caption: "A shopfront inside the fort" },
          { src: old.galle2, caption: "Galle" },
        ],
      },
      {
        meta: "Day 9 · Airport",
        title: "Home Bound",
        body: "This morning you’ll be driven to the airport at Colombo to board your flight home. Time to revel in the memories and plan your next trip.",
        stay: transfer(old.leopard),
        photos: [],
      },
    ],
  },
  timeAnswer:
    "Nine days gives Yala two full days, which is what finding a leopard usually takes. Shorter trips usually mean dropping a stop, not a safari.",
};

export const packagesV2: Partial<Record<PackageSlug, PackageV2>> = {
  "best-of-sri-lanka": littleOnes,
  "scenic-sri-lanka": scenicSriLanka,
  hillcountry: hillCountry,
  "wildlife-package": wildlife,
  "dream-honeymoon-in-sri-lanka": honeymoon,
};

export const packageV2Slugs = Object.keys(packagesV2) as PackageSlug[];

/** The questions on a package page — the shared set, with this route's duration answered. */
export const packageQuestions = (pkg: PackageV2) => [
  {
    q: "How do you shape a journey around us?",
    a: "We begin with your dates, interests, and pace. From there, we discuss a route and refine it with you.",
  },
  { q: "How much time should we allow for Sri Lanka?", a: pkg.timeAnswer },
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
