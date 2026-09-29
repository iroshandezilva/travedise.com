import { images, packageImages } from "@/content/v2/images";

import { TEAM, type BlogPost } from "../types";

/** Was "The Ultimate Honeymoon Destination"; its old URL redirects here (public/_redirects). */
export const post: BlogPost = {
  slug: "ten-days-for-two",
  title: "Ten days for two, and where to linger",
  titleEm: "where to linger",
  standfirst: "The stays and stretches of coast we send couples to, and the ones we do not.",
  dek: "The stays and stretches of coast we send couples to, and the ones we do not.",
  category: "Couples",
  date: "2025-09-07",
  author: TEAM,
  image: { src: images.honeymoon, alt: "A table set for two on the sand at dusk" },
  body: [
    {
      type: "lead",
      text: [
        "A honeymoon is the one trip where fewer stops is always better. Ten days in Sri Lanka is enough for the hills, the coast and one good morning with the animals, as long as you stay put for more than a night at a time.",
      ],
    },
    {
      type: "p",
      text: [
        "The routes we plan for couples look like everyone else’s on a map. The difference is in where the days are left empty.",
      ],
    },

    { type: "h2", id: "hills", text: "Start cool, in the hills" },
    {
      type: "p",
      text: [
        "We usually begin in Kandy or the tea country above it, where the mornings are cool enough for a jumper and the rooms look out over the estates. Two nights is the minimum. The train from the hills towards Ella is slow on purpose, and one of the few journeys on the island worth taking for its own sake.",
      ],
    },
    {
      type: "figure",
      src: images.simply,
      alt: "The Temple of the Tooth lit up across Kandy lake",
      caption: "Kandy after dark, before the drive up into the tea country.",
    },

    { type: "h2", id: "coast", text: "Then slow right down on the coast" },
    {
      type: "p",
      text: [
        "The second half of the trip belongs to the sea. Between December and April that means the south: Tangalle and the quieter bays either side of it, rather than the busier strip at Mirissa. From May to September we turn the route east, to Trincomalee or Pasikuda. ",
        { text: "Which coast, and when", href: "/blog-posts/which-coast-and-when" },
        " explains why.",
      ],
    },
    {
      type: "p",
      text: [
        "Three or four nights in one place, with nothing booked, is the part people remember. Dinner on the sand is easy to arrange. So is doing nothing at all.",
      ],
    },
    {
      type: "quote",
      text: "Fewer hotels, longer stays. It is the simplest thing we change on a honeymoon, and the one people thank us for.",
    },

    { type: "h2", id: "together", text: "One thing to do together" },
    {
      type: "p",
      text: [
        "Most couples want one day that is not about lying down. A dawn game drive in Yala or Udawalawe, whale watching off Mirissa in season, a climb up Sigiriya before the heat, or a balloon over the Cultural Triangle. Pick one or two; the trip does not need all of them.",
      ],
    },
    {
      type: "figure",
      src: packageImages.tangalle,
      alt: "Two travellers looking out towards Sigiriya rock",
      caption: "Sigiriya from Pidurangala, the quieter rock beside it. Worth the early start.",
    },

    { type: "h2", id: "before", text: "Before you go" },
    {
      type: "list",
      items: [
        [
          "Most visitors need an Electronic Travel Authorisation before they fly. Apply ahead, and check your passport is valid for six months beyond arrival.",
        ],
        [
          "Cover shoulders and knees at temples, and take your shoes off at the entrance. A light scarf in the day bag solves both.",
        ],
        [
          "Pack for two climates: light clothes for the coast, a warm layer for evenings in the hills.",
        ],
        ["Ask before photographing people, especially at religious sites."],
      ],
    },
  ],
  cta: {
    heading: "Tell us about the two of you, we will do the rest.",
    em: "we will do",
    body: "A travel designer comes back with a first route, the stays we would choose, and where we would leave the days empty.",
  },
};
