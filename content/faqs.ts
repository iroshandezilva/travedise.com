/**
 * FAQ copy, verbatim from the Webflow site (don't "fix" wording here without a content decision).
 *
 * Two sets are in use:
 * - `siteFaqs` — the FAQ section on `/`, `/packages` and all six `/packages/*` pages
 * - `faqPageFaqs` — the list on `/faq`; identical except the "children" answer omits the
 *   Little Red Dot sentence
 */

export type Faq = {
  question: string;
  answer: string;
};

/** Heading block shared by every FAQ section. */
export const faqHeading = {
  tag: "FAQ",
  title: "Everything you need to know was clearly answered.",
};

const bestTime: Faq = {
  question: "When is the best time of year to visit Sri Lanka?",
  answer:
    "Generally speaking, we think the best time to travel to Sri Lanka in terms of weather, and to visit as many areas as possible, is late December to April. However, there are huge benefits to travelling outside this period, and we regard Sri Lanka as a year-round destination. Please see our Sri Lanka Weather Guide for more information.",
};

const howLong: Faq = {
  question: "How much time do you really need in Sri Lanka?",
  answer:
    "We would normally suggest a minimum of seven days. However, if you are combining Sri Lanka with the Maldives, it is possible to take a shorter trip and still get a taste of what Sri Lanka has to offer. For those short on time, we can plan a trip that focuses on easy-to-access areas to avoid too much travel. Our Sri Lanka specialists can help with this.",
};

const cost: Faq = {
  question: "How much does a trip cost to Sri Lanka?",
  answer:
    "Most of our Sri Lanka trips start around £2,500 to £3,000 per person, based on 10–14 nights with mid-range boutique hotels, private guiding, and flights. For luxury stays (think Ulagalla or Wild Coast Tented Lodge), you're looking at £5,000 and up per person for the same trip length. What's included: your own private driver-guide, all accommodation, all experiences and activities, internal transport, and 24-hour support. We can arrange your international flights as well, or you can book those yourself. The price moves up or down depending on how you travel; how long you're here, which hotels suit you, and what you want to do. That's exactly why we design everything with you first.",
};

const tailorMade: Faq = {
  question:
    "What's the difference between a tailor-made tour of Sri Lanka and a standard package holiday?",
  answer:
    "A tailor-made holiday to Sri Lanka includes a private driver and is designed completely around you. All of the accommodation is handpicked, and the route is designed around your interests and weather patterns. A package holiday is pre-designed on specific dates and in specific hotels.",
};

const gettingAround: Faq = {
  question: "Is Sri Lanka an easy country to travel around?",
  answer:
    "Sri Lanka is a very easy country to travel around with Red Dot, with your own personal chauffeur-guide and car. This is by far the easiest, safest and most convenient way to get around in comfort. We can also arrange helicopter or light-aircraft flights, as well as train journeys.",
};

const safety: Faq = {
  question: "Is Sri Lanka generally safe for travellers?",
  answer:
    "Yes, Sri Lanka is generally considered safe, but as with all destinations we recommend exercising the same caution you would at home. Be careful with valuable belongings, and if something feels uncomfortable, trust your instincts. Having a chauffeur-guide with you can add reassurance compared with booking local transfers, buses or trains, and we provide 24-hour support on the ground.",
};

const visa: Faq = {
  question: "Do I need a visa?",
  answer:
    "If you are travelling on a British passport, you need to obtain an Electronic Travel Authorization (ETA) online before you travel. As of 25 May 2026, the tourist ETA is free for British passport holders for a stay of up to 30 days. Visa rules and fees can change, so check the official ETA portal and the UK Foreign Travel Advice website before departure. Please ask us if you need more help.",
};

const childrenQuestion = "Is Sri Lanka a good place to travel with children?";

const worthIt: Faq = {
  question: "Is Sri Lanka really worth visiting?",
  answer:
    "Yes. Sri Lanka is well worth visiting because of the remarkable variety of things to do and see, from Sigiriya Rock to Yala National Park, and from the tea plantations to the surf beaches of southern Sri Lanka. Sri Lanka arguably has something for everyone.",
};

/** `/`, `/packages`, and every `/packages/*` page. */
export const siteFaqs: Faq[] = [
  bestTime,
  howLong,
  cost,
  tailorMade,
  gettingAround,
  safety,
  visa,
  {
    question: childrenQuestion,
    answer:
      "Sri Lanka is an exceptional option for children of all ages because of its variety, manageable journey times and often-direct flights. Find out more about Little Red Dot in Sri Lanka, created for small children and young families. Sri Lanka is also a brilliant option for teenagers with many different interests and personality types.",
  },
  worthIt,
];

/** `/faq`. */
export const faqPageFaqs: Faq[] = [
  bestTime,
  howLong,
  cost,
  tailorMade,
  gettingAround,
  safety,
  visa,
  {
    question: childrenQuestion,
    answer:
      "Sri Lanka is an exceptional option for children of all ages because of its variety, manageable journey times and often-direct flights. Sri Lanka is also a brilliant option for teenagers with many different interests and personality types.",
  },
  worthIt,
];
