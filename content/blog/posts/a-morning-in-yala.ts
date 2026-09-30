import { images, packageImages } from "@/content/v2/images";

import { TEAM, type BlogPost } from "../types";

export const post: BlogPost = {
  slug: "a-morning-in-yala",
  title: "A morning in Yala, and why we leave at five",
  titleEm: "and why we leave at five",
  standfirst: "Leopards are never promised, only made likely. How we plan the park days.",
  dek: "Leopards are never promised, only made likely. How we plan the park days.",
  category: "Wildlife",
  next: { label: "See Wild Sri Lanka", href: "/packages/wildlife-package" },
  date: "2026-08-14",
  author: TEAM,
  image: {
    src: images.wildlifePackage,
    alt: "A leopard crossing the track in front of a safari jeep",
  },
  body: [
    {
      type: "lead",
      text: [
        "Yala has one of the highest densities of leopards anywhere. It also has a lot of jeeps. The difference between a good morning and a frustrating one is mostly about timing.",
      ],
    },

    { type: "h2", id: "five", text: "Why five o’clock" },
    {
      type: "p",
      text: [
        "The gates open at six, and the animals are most active in the first two hours of light. Leaving the hotel at five puts you in the queue early and on the tracks while it is still cool. By ten the heat has sent most of the cats into the shade, and the park goes quiet until late afternoon.",
      ],
    },
    {
      type: "p",
      text: [
        "We book a full morning rather than a three-hour drive. It costs a little more and makes a real difference: no turning back just as the tracker hears a langur call.",
      ],
    },
    {
      type: "figure",
      src: packageImages.sigiriyaStay,
      alt: "A Travedise jeep on the road south",
      caption: "Leaving before first light. The drive to the gate is part of the morning.",
    },

    { type: "h2", id: "more", text: "More than leopards" },
    {
      type: "p",
      text: [
        "It helps to go in wanting the whole park, not one animal. Elephants, sloth bears, crocodiles in the lagoons, peacocks on every termite mound, and more than two hundred kinds of birds. People who come looking only for a leopard sometimes miss the rest.",
      ],
    },
    {
      type: "quote",
      text: "We never promise a leopard. We just put you where one is most likely to be, at the hour it is most likely to be there.",
    },

    { type: "h2", id: "when", text: "When Yala closes" },
    {
      type: "p",
      text: [
        "The park usually closes for a few weeks around September and October, at the end of the dry season. The exact dates change each year. If your trip falls then, we send you to Udawalawe or Wilpattu instead, and they are good alternatives rather than consolation prizes.",
      ],
    },
    {
      type: "note",
      label: "What to bring",
      text: "A light layer for the cold start, a hat and sunscreen for later, binoculars if you have them, and a scarf against the dust. Neutral colours, not bright ones.",
    },
  ],
  cta: {
    heading: "Want a park day in your route? We will time it right.",
    em: "We will time it",
    body: "Tell us your dates and we will choose the park, the season and the hour.",
  },
};
