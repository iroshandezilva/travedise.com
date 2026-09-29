import { images, packageImages } from "@/content/v2/images";

import { TEAM, type BlogPost } from "../types";

export const post: BlogPost = {
  slug: "dambulla-cave-temples",
  title: "Inside the Dambulla cave temples",
  titleEm: "cave temples",
  standfirst: "Go early, go slowly, and cover your shoulders. What to expect under the rock.",
  dek: "Go early, go slowly, and cover your shoulders. What to expect under the rock.",
  category: "Culture",
  date: "2026-04-08",
  author: TEAM,
  image: {
    src: packageImages.daveTemple,
    alt: "A seated Buddha in front of painted cave walls",
    position: "50% 30%",
  },
  body: [
    {
      type: "lead",
      text: [
        "Under a great granite outcrop in the middle of the island, five caves have been shrines for more than two thousand years. Every surface inside is painted, and more than a hundred and fifty statues of the Buddha sit in the half light.",
      ],
    },

    { type: "h2", id: "early", text: "Go early" },
    {
      type: "p",
      text: [
        "The caves are a climb of a few hundred steps up the rock, and the steps take the sun from mid morning. Go at opening time and you have the cool, the soft light and, often, the caves to yourself. By eleven the coaches from Sigiriya arrive.",
      ],
    },

    { type: "h2", id: "inside", text: "What is inside" },
    {
      type: "p",
      text: [
        "The largest cave holds dozens of statues and a ceiling painted edge to edge. The murals were repainted over centuries, so the styles change as you look across them. Take your time. There is a lot more to see than the first glance suggests.",
      ],
    },
    {
      type: "figure",
      src: images.sacredPlaces,
      alt: "Gilded Buddhas in the Dambulla caves",
      caption: "The caves are dim. Let your eyes adjust before you move on.",
    },
    {
      type: "quote",
      text: "Give it an hour, not twenty minutes. The caves are small, but there is a lot in them.",
    },

    { type: "h2", id: "etiquette", text: "How to visit" },
    {
      type: "list",
      items: [
        ["Cover shoulders and knees. A sarong or scarf in the day bag is enough."],
        ["Shoes come off at the top. Wear socks: the rock gets hot by late morning."],
        ["No photos with your back to a statue, and no flash inside the caves."],
        ["Speak quietly. It is a working temple, not a museum."],
      ],
    },
    {
      type: "p",
      text: [
        "Dambulla fits easily into a day with Sigiriya, twenty minutes away, and is on most routes through the Cultural Triangle. ",
        { text: "Polonnaruwa", href: "/blog-posts/polonnaruwa-by-bicycle" },
        " is a good next day.",
      ],
    },
  ],
};
