import { images } from "@/content/v2/images";

import { TEAM, type BlogPost } from "../types";

/** Was "Why 2026 Is the Best Year for Travel and Tour"; its old URL redirects here (public/_redirects). */
export const post: BlogPost = {
  slug: "a-first-trip-to-sri-lanka",
  title: "A first trip to Sri Lanka, in one page",
  titleEm: "in one page",
  standfirst: "The places we would not leave out, and how they fit together.",
  dek: "The places we would not leave out on a first visit, and how they fit into one route.",
  category: "Planning",
  date: "2025-09-16",
  author: TEAM,
  image: {
    src: images.simply,
    alt: "The Temple of the Tooth lit up across Kandy lake",
  },
  body: [
    {
      type: "lead",
      text: [
        "Sri Lanka packs ancient cities, tea country, national parks and two coastlines into an island you can cross in a day. The hard part of a first visit is not finding things to do. It is choosing.",
      ],
    },
    {
      type: "p",
      text: [
        "These are the places we would not leave out, in the order most routes meet them.",
      ],
    },

    { type: "h2", id: "triangle", text: "The Cultural Triangle" },
    {
      type: "p",
      text: [
        "Sigiriya, Dambulla and Polonnaruwa sit within an hour or so of each other in the dry middle of the island. Base yourself there for three nights and you can see all three without rushing, with a morning left over for elephants at Minneriya or Kaudulla in season.",
      ],
    },
    {
      type: "figure",
      src: images.scenic,
      alt: "Sigiriya rock seen from Pidurangala at first light",
      caption: "Sigiriya from Pidurangala. Most first routes start here.",
    },

    { type: "h2", id: "kandy", text: "Kandy and the hills" },
    {
      type: "p",
      text: [
        "Kandy is home to the Temple of the Sacred Tooth Relic, the most important Buddhist shrine on the island. Above it the road climbs into the tea country, and the ",
        { text: "train towards Ella", href: "/blog-posts/tea-country-by-train" },
        " is the best way to see it.",
      ],
    },

    { type: "h2", id: "south", text: "The south: parks and the old fort" },
    {
      type: "p",
      text: [
        "From the hills the route drops to the south. Yala and Udawalawe are the two parks most people visit, and ",
        { text: "Galle Fort", href: "/blog-posts/galle-fort-after-dark" },
        " is the best place to end: a walled town on the sea, easy to walk and good to eat in.",
      ],
    },
    {
      type: "note",
      label: "How long to allow",
      text: "Ten nights covers the Cultural Triangle, the hills and the south coast without rushing. Two weeks lets you add the east coast or a second park.",
    },

    { type: "h2", id: "respect", text: "A few things worth knowing" },
    {
      type: "list",
      items: [
        [
          "Dress modestly at temples: shoulders and knees covered, shoes and hats off at the entrance.",
        ],
        ["Never pose for a photo with your back to a Buddha statue."],
        [
          "Most visitors need an Electronic Travel Authorisation before they fly. Apply ahead.",
        ],
        [
          "The weather depends on the coast more than the month. ",
          { text: "Which coast, and when", href: "/blog-posts/which-coast-and-when" },
          " explains how to choose.",
        ],
      ],
    },
  ],
};
