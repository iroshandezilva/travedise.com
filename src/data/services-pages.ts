/**
 * Lists for the services, weddings, group trips and vehicles pages (and two small helpers the
 * tour pages share). Repeating lists live here; one-off page text lives in the page components.
 */
import type { PhotoKey } from "./photos";

/** Escape text before it goes into a `set:html` heading. */
export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** A heading from data, with its last word in italics to match the hand-written headings. */
export const emLast = (s: string) => {
  const t = esc(s.trim());
  const i = t.lastIndexOf(" ");
  return i < 0 ? `<em>${t}</em>` : `${t.slice(0, i)} <em>${t.slice(i + 1)}</em>`;
};

/** "Premium SUV" → "premium SUV", for use mid-sentence. */
export const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/* ---------- Services ---------- */

export const SVC_DETAIL: { t: string; photo: PhotoKey; href: string; go: string; ask: string; lede: string; items: string[] }[] = [
  {
    t: "Tailor-made trips",
    photo: "trainRed",
    href: "/packages",
    go: "See the tours",
    ask: "Ask us about a tailor-made trip",
    lede: "Private trips around Sri Lanka and the Maldives, written around your dates, your pace and what you came for.",
    items: [
      "A first route and a full price within a few working days, free",
      "Stays we have slept in, chosen for you",
      "Your own driver-guide, airport to airport",
      "A planner who replies within a day, before and during the trip",
    ],
  },
  {
    t: "Weddings",
    photo: "wedStand",
    href: "/weddings",
    go: "Plan a wedding",
    ask: "Ask us about a wedding",
    lede: "Beach weddings, elopements and vow renewals, with the guests’ travel planned as carefully as the day.",
    items: [
      "Legal ceremonies in Sri Lanka; symbolic ones in the Maldives",
      "Venue, celebrant, photographer, flowers and dinner",
      "Rooms and transfers for every guest",
      "A honeymoon to follow, if you want one",
    ],
  },
  {
    t: "Group trips",
    photo: "groupTable",
    href: "/group-vacations",
    go: "Plan a group trip",
    ask: "Ask us about a group trip",
    lede: "Retreats, reunions, milestones, pilgrimages and clubs, with one planner and one plan for everyone.",
    items: [
      "Routes paced for the whole group",
      "Mini coaches and coaches with an assistant",
      "Rooming lists and dietary needs handled",
      "One invoice, or each person pays their own",
    ],
  },
  {
    t: "Vehicles and drivers",
    photo: "jeep",
    href: "/vehicles",
    go: "See the vehicles",
    ask: "Ask us about a vehicle",
    lede: "Seven vehicles, from a tuk-tuk to a 45-seat coach, each with a licensed driver. For a transfer, a day or the whole trip.",
    items: [
      "Our own vehicles and driver-guides",
      "Airport transfers, timed to your flight",
      "Safari jeeps with park-registered trackers",
      "Coaches for wedding guests and groups",
    ],
  },
];

export const ALSO: [string, string][] = [
  ["Airport transfers", "One way or return, from Colombo to anywhere on the island."],
  ["Train seats", "Reserved seats on the hill-country line, where they can be had."],
  ["Seaplane and domestic flights", "For the Maldives, timed to your arrival."],
  ["Hotel-only bookings", "If you have the route and just want the rooms."],
  ["Private guides", "For a temple at prayer time, a tea factory or a cooking class at home."],
  ["Celebrations", "A dinner on the sand, a birthday cake on a train, a spa day."],
];

/* ---------- Weddings ---------- */

/** Card link labels for the wedding styles, by slug. */
export const WED_GO: Record<string, string> = {
  "beach-weddings": "Plan a beach wedding",
  elopements: "Plan an elopement",
  "vow-renewals": "Plan a vow renewal",
};

/** Where to say it: setting, what it is like, country. */
export const WED_PLACES: [string, string, string][] = [
  ["A south-coast beach", "Private villas and small hotels between Bentota and Tangalle, with a long table under the palms.", "Sri Lanka"],
  ["Galle Fort ramparts", "An elopement at sunrise, before the fort wakes up.", "Sri Lanka"],
  ["A tea estate bungalow", "A planter’s bungalow in the hills, with mist instead of sea.", "Sri Lanka"],
  ["A sandbank", "A symbolic ceremony with the lagoon all round.", "The Maldives"],
];

export const WED_ARRANGE: [string, string][] = [
  ["Venue and permits", "Including the beach, the fort or the estate."],
  ["Registrar or celebrant", "And the paperwork for a legal wedding in Sri Lanka."],
  ["Photographer and film", "People we have worked with, who know the light."],
  ["Flowers and music", "From frangipani to Kandyan drummers."],
  ["Dinner and cake", "At the venue or a long table on the sand."],
  ["Guests’ rooms and transfers", "Booked in one block, with one invoice or many."],
];

/** An example wedding week: day, title, what happens. */
export const WED_WEEK: [string, string, string][] = [
  ["Day 1", "Guests arrive", "Airport pick-ups and a quiet first night by the sea."],
  ["Day 2", "Welcome dinner", "Everyone meets at a long table on the beach."],
  ["Day 3", "The ceremony", "The day itself, with dinner and dancing after."],
  ["Day 4", "A slow day", "Pool, spa, or a boat out to look for whales."],
  ["Day 5", "Onward", "Guests head home or into the hills; you might go to the Maldives."],
];

export const FAQ_WEDDINGS: [string, string][] = [
  ["Can we marry legally in Sri Lanka?", "Yes, with a registrar. Some documents need translating and certifying, so we send the list early."],
  ["And in the Maldives?", "Ceremonies for visitors there are symbolic. Many couples marry legally in Sri Lanka or at home first."],
  ["How many guests can come?", "From just the two of you to large weddings. The venue sets the limit, and we suggest venues to fit."],
  ["What does it cost?", "We price each wedding after a first call, because the guest list and the venue decide most of it."],
];

/** /weddings/plan: what to put in the first message. */
export const WED_TELL: [string, string][] = [
  ["The kind of wedding", "A beach wedding, an elopement or a vow renewal, and whether the ceremony is legal or symbolic."],
  ["Roughly when", "A month or a season is enough. November to April suits the west and south coasts."],
  ["How many guests", "From just the two of you to about eighty. A rough number is fine."],
  ["Where appeals", "A beach, Galle Fort, a tea estate, or not sure yet. We suggest settings to fit."],
  ["Your planner", "Whether you already have a wedding planner, or would like us to suggest people we trust."],
  ["What makes it yours", "Traditions, music, the people who must be there, and anything already booked."],
];

/** /weddings/plan: what happens after the first message. */
export const WED_NEXT: [string, string][] = [
  ["We reply within a day", "Usually with a few questions first, before any ideas."],
  ["A call", "To talk through the feeling you want, the guests and the dates."],
  ["A proposal", "Venues, a schedule for the days and a clear quote, with the guests’ travel listed separately."],
];

/* ---------- Group trips ---------- */

/** Group size, what we use, the vehicle and its page. */
export const GROUP_SIZES: { k: string; v: string; w: string; href: string }[] = [
  { k: "Up to 8 people", v: "A family van, high-roofed, with forward-facing seats.", w: "Family van", href: "/vehicles/family-van" },
  { k: "9 to 22 people", v: "A mini coach, with an assistant on longer tours.", w: "Mini coach", href: "/vehicles/mini-coach" },
  { k: "23 to 45 people", v: "A full-size touring coach.", w: "Luxury coach", href: "/vehicles/luxury-coach" },
  { k: "More than 45", v: "Two coaches, or a coach with vans for the airport runs.", w: "Mixed fleet", href: "/vehicles" },
];

export const GROUP_STEPS: [string, string][] = [
  ["Tell us the group", "Who, how many, roughly when, and what brings you together."],
  ["Route and price", "A route and a per-person price, free, within a few working days."],
  ["Names and deposits", "Each person or family can pay their own share."],
  ["Travel", "Your planner stays reachable, with an assistant on the coach for larger groups."],
];

export const FAQ_GROUPS: [string, string][] = [
  ["What counts as a group?", "Six travellers or more. For smaller parties, one of our tours, changed to suit you, usually works better."],
  ["Can people pay separately?", "Yes. We can invoice each person or family, or one organiser."],
  ["Can the group split up for a day?", "Yes. Some go to the park, some stay by the pool. We plan both and bring everyone back for dinner."],
  ["How is a group trip priced?", "Per person, after we understand the group. The quote lists each service, so you can add or remove parts and see the difference."],
  ["Do you run conferences?", "We plan the travel and the days around a conference, and can book the venue in Colombo or on the coast."],
];

/* ---------- Vehicles ---------- */

/** Size chips: label and the "low-high" range a vehicle must overlap (see site.ts). */
export const VEHICLE_SIZES: { range: string; label: string }[] = [
  { range: "0-999", label: "Any size" },
  { range: "1-2", label: "1 or 2" },
  { range: "3-4", label: "3 or 4" },
  { range: "5-8", label: "5 to 8" },
  { range: "9-22", label: "9 to 22" },
  { range: "23-45", label: "23 to 45" },
];

/** Ways to book: how, what it is, which vehicles. */
export const WAYS_TO_BOOK: [string, string, string][] = [
  ["Airport transfer", "One way or return, timed to your flight.", "Any vehicle"],
  ["By the day", "A car and driver for a day out, from where you are staying.", "Any vehicle"],
  ["The whole trip", "The same driver-guide from arrival to departure. This is how most of our trips work.", "Car, SUV or van"],
  ["Safari", "Morning, afternoon or full-day game drives with a park-registered driver and tracker.", "Safari jeep"],
];

export const FAQ_VEHICLES: [string, string][] = [
  ["Can we book a car without a tour?", "Yes. Book a transfer, a day or a week, and plan the rest yourselves."],
  ["How is it priced?", "Per vehicle, per day, including the driver. We quote once we know the route."],
  ["Can we drive ourselves?", "We only hire vehicles with a driver. Sri Lanka's roads are busy and the rules are local, and a good driver also knows where to stop."],
  ["Can you combine vehicles?", "Yes. A wedding might use a coach for guests, an SUV for the couple and vans for the families. We plan them as one booking."],
  ["Do drivers speak other languages?", "All speak English. Ask us about other languages when you book."],
  ["How far ahead should we book?", "A few days is enough for a car or a van out of season. For December to March, coaches and wedding dates, book as early as you can."],
];
