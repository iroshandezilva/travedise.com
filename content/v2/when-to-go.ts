/**
 * The "When to go" month guide. One table drives the page: each month rates the five
 * corners of the island, and both the month picker and the year grid read those
 * ratings, so the two can never disagree.
 */

import { images } from "./images";

export const whenToGoHero = {
  title: "When to go to Sri Lanka",
  body: "Two monsoons take turns, so there is always a dry side of the island. Pick your month and we will show you where to be, and where not to bother.",
  image: images.cloudForest,
  alt: "Palms above a south coast beach",
};

/** 3 is where you want to be, 1 is that coast's wet season. */
export type Level = 1 | 2 | 3;

export const levelLabels: Record<Level, string> = {
  3: "At its best",
  2: "Good",
  1: "Wet season",
};

/** The five corners, in the order every month's ratings are listed. */
export const regions = [
  { name: "South and west coast", note: "Galle, Mirissa, Tangalle, Bentota" },
  { name: "East coast", note: "Trincomalee, Pasikuda, Arugam Bay" },
  { name: "Hill Country", note: "Kandy, Nuwara Eliya, Ella" },
  { name: "Cultural Triangle", note: "Sigiriya, Dambulla, Polonnaruwa" },
  { name: "National parks", note: "Yala, Udawalawe, Minneriya, Wilpattu" },
] as const;

type Ratings = [Level, Level, Level, Level, Level];

export type Month = { name: string; title: string; body: string; ratings: Ratings };

export const months: Month[] = [
  {
    name: "January",
    title: "The classic month, and the busiest.",
    body: "South and west coasts at their best, hill country crisp and clear. Book early, and expect company at Sigiriya.",
    ratings: [3, 1, 3, 2, 2],
  },
  {
    name: "February",
    title: "Dry almost everywhere.",
    body: "Whales off Mirissa, leopards in Yala, and the hills at their clearest. If you can only pick one month, this is a strong one.",
    ratings: [3, 1, 3, 3, 3],
  },
  {
    name: "March",
    title: "Warm, dry, and still calm.",
    body: "The south coast and the hills hold their weather. The Cultural Triangle warms up, so we move the ruins to the early mornings.",
    ratings: [3, 2, 3, 3, 3],
  },
  {
    name: "April",
    title: "Hot, mostly dry, with a holiday in the middle.",
    body: "The Sinhala and Tamil New Year lands mid month and the island goes home to family. Good time to be somewhere quiet and stay put.",
    ratings: [3, 2, 2, 3, 3],
  },
  {
    name: "May",
    title: "The south west monsoon arrives. Head east.",
    body: "Trincomalee and Pasikuda are calm and empty, the Cultural Triangle is dry, and the parks are still good. We flip the route.",
    ratings: [1, 3, 2, 2, 3],
  },
  {
    name: "June",
    title: "East coast and the parks.",
    body: "Arugam Bay surf season starts, the Cultural Triangle is dry and hot, and Yala is quiet. The south coast is for another month.",
    ratings: [1, 3, 2, 2, 3],
  },
  {
    name: "July",
    title: "Elephants gather, the east coast shines.",
    body: "The Minneriya gathering builds through the month and the Kandy perahera falls in July or August. Beach time belongs to the east.",
    ratings: [1, 3, 2, 2, 3],
  },
  {
    name: "August",
    title: "Perahera month in Kandy.",
    body: "The gathering at Minneriya at full size, the perahera lighting up Kandy for ten nights, and the east coast still at its best.",
    ratings: [1, 3, 2, 2, 3],
  },
  {
    name: "September",
    title: "Last of the east coast season.",
    body: "Yala usually closes for a few weeks around now, so we route around it. Still good on the east, and the hills are pleasant.",
    ratings: [1, 3, 2, 2, 2],
  },
  {
    name: "October",
    title: "The quietest month.",
    body: "Showers most afternoons on both coasts. We keep the plan loose, choose stays worth being rained on in, and prices are kind.",
    ratings: [1, 2, 1, 1, 1],
  },
  {
    name: "November",
    title: "The south starts to dry out.",
    body: "The whales come back to Mirissa and the south coast opens up again by the end of the month. Some rain, good value.",
    ratings: [2, 1, 1, 1, 2],
  },
  {
    name: "December",
    title: "The dry season returns.",
    body: "South and west at their best again. The second half of the month fills fast, so this is the one to book earliest.",
    ratings: [3, 1, 2, 2, 2],
  },
];

export const monthPicker = {
  heading: "Pick a month.",
  lede: "The verdict on the left, the five corners of the island on the right. Three dots is where you want to be.",
  /** The month the picker opens on. */
  initial: 1,
  footnote:
    "A rough guide. Weather on a small island moves around, and a wet month on one coast is often a good one on the other.",
};

export const yearAtAGlance = {
  heading: "The whole year at a glance.",
  notes: [
    {
      title: "Two monsoons, two coasts",
      body: "The south west monsoon runs roughly May to September and soaks the west and south. The north east monsoon runs October to January and does the same to the east. Whichever is blowing, the other coast is usually dry.",
    },
    {
      title: "The parks have seasons too",
      body: "Yala usually closes for a few weeks in September and October. Elephants gather at Minneriya from July to September as the tank dries. Whales pass Mirissa from November to April. We plan the park days around these, not around the calendar.",
    },
    {
      title: "Festivals move the crowds",
      body: "The Sinhala and Tamil New Year in mid April and the Kandy Esala Perahera in July or August fill hotels and roads. Worth seeing, worth booking early, and worth knowing about before you fix your dates.",
    },
  ],
};
