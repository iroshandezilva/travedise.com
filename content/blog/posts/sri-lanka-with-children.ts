import { images } from "@/content/v2/images";

import { TEAM, type BlogPost } from "../types";

/** Was "Family-Friendly Destinations That Everyone Will Love"; its old URL redirects here (public/_redirects). */
export const post: BlogPost = {
  slug: "sri-lanka-with-children",
  title: "Sri Lanka with children, without the long drives",
  titleEm: "without the long drives",
  standfirst: "How we shorten the road and where the early starts are worth it.",
  dek: "How we shorten the road and where the early starts are worth it.",
  category: "Families",
  next: { label: "See Sri Lanka With Little Ones", href: "/packages/best-of-sri-lanka" },
  date: "2025-09-07",
  author: TEAM,
  image: { src: images.littleOnes, alt: "A child watching the road from the jeep" },
  body: [
    {
      type: "lead",
      text: [
        "Sri Lanka is small on the map and slow on the road. Sixty kilometres can take two hours. With children, that single fact shapes the whole trip.",
      ],
    },
    {
      type: "p",
      text: [
        "So we plan family routes the other way round: fewer bases, shorter hops, and the long drives broken up with something worth stopping for.",
      ],
    },

    { type: "h2", id: "bases", text: "Three bases, not seven" },
    {
      type: "p",
      text: [
        "For ten days we usually suggest three places: the Cultural Triangle, the hills or Kandy, and a stretch of coast. Staying three or four nights in each means unpacking once, learning where the pool is, and letting the children settle.",
      ],
    },
    {
      type: "p",
      text: [
        "We keep most drives under three hours, and put a stop in the middle of the longer ones: a spice garden, a waterfall, a roadside king coconut.",
      ],
    },

    { type: "h2", id: "early", text: "Where the early starts are worth it" },
    {
      type: "p",
      text: [
        "Wildlife is the exception to the lie-in. Animals move in the cool of the morning, so a game drive means leaving before six. Udawalawe is the easy one with younger children: plenty of elephants, open country, and a shorter drive from the south coast than Yala.",
      ],
    },
    {
      type: "figure",
      src: images.optionalDays,
      alt: "An elephant at close range on an early drive",
      caption: "Udawalawe, just after seven. By ten, most of the animals are in the shade.",
    },
    {
      type: "p",
      text: [
        "Sigiriya is the other. The climb is steep in places but short, and done by eight it is a highlight rather than an ordeal. After that, the afternoon belongs to the pool.",
      ],
    },
    {
      type: "quote",
      text: "Mornings for doing things. Afternoons for the pool. It is the rhythm that keeps everyone happy.",
    },

    { type: "h2", id: "coast", text: "Picking the beach" },
    {
      type: "p",
      text: [
        "Not every Sri Lankan beach is a swimming beach. Some have strong currents all year. We choose coast stays with a sheltered bay or a good pool, and match the coast to the season. ",
        { text: "Which coast, and when", href: "/blog-posts/which-coast-and-when" },
        " has the detail.",
      ],
    },

    { type: "h2", id: "practical", text: "Practical things" },
    {
      type: "list",
      items: [
        [
          "Every journey has its own vehicle and driver. We fit child seats if you ask, so tell us ages when you enquire.",
        ],
        ["Pack light layers for the hills, where evenings are cool, and a hat for everyone."],
        [
          "Most hotels will do plain food for children without fuss. Rice, dhal and fresh fruit are everywhere.",
        ],
        ["Keep a swimsuit in the day bag. There is usually a pool or a river somewhere."],
      ],
    },
  ],
  cta: {
    heading: "Tell us their ages, we will plan the pace.",
    em: "we will plan",
    body: "A travel designer comes back with a route built around short drives, good pools and the mornings worth getting up for.",
  },
};
