import { BLANK_LINE as BLANK, type BlogPostBody } from "./types";

export const body: BlogPostBody = {
  details: [
    {
      type: "p",
      lines: [
        "\u{1F334} Beach Escapes",
        "Relax on golden sandy beaches, swim in crystal-clear waters, enjoy whale watching, surfing, snorkeling, and breathtaking sunsets along Sri Lanka’s stunning coastline.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "\u{1F418} Wildlife & Nature",
        "Experience unforgettable safaris in national parks, spot elephants, leopards, sloth bears, crocodiles, and exotic birds, while exploring lush rainforests and scenic landscapes.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "\u{1F3DE}\u{FE0F} Hill Country & Adventure",
        "Journey through misty mountains, tea plantations, waterfalls, and picturesque train rides. Enjoy hiking, zip-lining, white-water rafting, and spectacular viewpoints.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "\u{1F468}‍\u{1F469}‍\u{1F467}‍\u{1F466} Culture, Heritage & Family Experiences",
        "Explore ancient cities, UNESCO World Heritage sites, colourful festivals, temples, botanical gardens, and authentic local villages. With friendly people, short travel distances, and activities for all ages, Sri Lanka is the perfect destination for families, couples, and groups alike.",
      ],
    },
    { type: "p", lines: [BLANK] },
  ],
  figure: {
    image: {
      src: "/assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka.jpeg",
      srcSet:
        "/assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-500.jpeg 500w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-800.jpeg 800w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-1080.jpeg 1080w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-1600.jpeg 1600w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-2000.jpeg 2000w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka.jpeg 2293w",
      sizes: "100vw",
    },
    caption: "Tiger’s Nest Monastery",
  },
  // The CMS "tips" and "closing" fields are empty for this post.
};
