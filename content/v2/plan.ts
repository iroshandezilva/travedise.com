/**
 * Copy for the trip-planning page (`app/plan-your-trip`), which replaced the old
 * contact page: the hero, the help panel beside the form, and the choices in the form.
 */
import { images } from "./images";
import { journeys } from "./journeys";

export const planHero = {
  title: "Plan your Sri Lanka journey",
  body: "Two short steps. The first is about the trip, the second is how we reach you. Nothing here is fixed, it just gives us a good place to begin.",
  image: images.honeymoon,
  alt: "A couple walking the beach at dusk, past a table set for two",
};

export const planHelp = {
  heading: "A real person is here to help.",
  body: "Tell us what you are considering. We can help you find a good place to begin, even if the dates are still loose.",
  contacts: [
    { label: "Call Australia", value: "+61 426 965 569", href: "tel:+61426965569" },
    { label: "Call Sri Lanka and global", value: "+94 76 397 2171", href: "tel:+94763972171" },
    { label: "Email", value: "contact@travedise.com ↗", href: "mailto:contact@travedise.com" },
  ],
  next: {
    heading: "What happens next",
    steps: [
      "A travel designer reads what you sent, not a bot and not a sales rep.",
      "We reply within a day, with questions before suggestions.",
      "Then a route to react to, which we change as often as you like.",
    ],
  },
  offices: [
    { place: "Australia", address: "5/22-30 Brighton St, Bundeena NSW 2230" },
    { place: "Sri Lanka", address: "212A Inland Hill Road, Karapitiya, Galle" },
  ],
};

/** Where the enquiry goes. The site has no form backend, so sending opens an email. */
export const enquiryEmail = "contact@travedise.com";

export const journeyOptions = journeys.map((j) => j.name);

export const durations = [
  "Under a week",
  "7 to 9 nights",
  "10 to 12 nights",
  "13 nights or more",
  "Not sure yet",
];

export const budgets = [
  "Under $2,500",
  "$2,500 to $3,500",
  "$3,500 to $5,000",
  "Over $5,000",
  "Not sure yet",
];

export const interests = [
  "Wildlife",
  "Hill country",
  "Beaches",
  "Culture and history",
  "Food",
  "Slow travel",
  "Travelling with kids",
  "Honeymoon",
];

export const channels = ["Email", "Phone call", "WhatsApp", "Video call"];

export const countryCodes = ["+61", "+94", "+44", "+1", "+971", "+64", "Other"];

export const countries = [
  "Australia",
  "New Zealand",
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "Other",
];

export const heardFrom = [
  "A friend or family",
  "Instagram",
  "Google",
  "A previous trip with us",
  "Somewhere else",
];
