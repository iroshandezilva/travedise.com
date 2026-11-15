/** The Sri Lanka and Maldives destination pages: facts, regions, culture, food, wildlife and questions. */
import type { PhotoKey } from "./photos";

type Fact = [label: string, value: string, note: string];
export type Region = { k: string; n: string; photo: PhotoKey; places: string[]; best: string; stay: string; tag?: string; text: string };

export const LK = {
  facts: [
  [
    "Size",
    "65,610 km²",
    "About the size of Ireland or Tasmania"
  ],
  [
    "World Heritage Sites",
    "8",
    "Six cultural, two natural"
  ],
  [
    "Best months",
    "December to April",
    "For the south, west and hills. The east coast is best May to September."
  ],
  [
    "Arriving",
    "Colombo (CMB)",
    "Bandaranaike International, north of the city. We meet you at arrivals."
  ],
  [
    "Visa",
    "ETA online",
    "Most visitors apply before they fly"
  ],
  [
    "Money",
    "Sri Lankan rupee",
    "Cards in hotels, cash for markets and tips"
  ]
] as Fact[],
  regions: [
  {
    "k": "triangle",
    "n": "Cultural Triangle",
    "photo": "sigAerial",
    "places": [
      "Sigiriya",
      "Dambulla",
      "Polonnaruwa",
      "Anuradhapura"
    ],
    "best": "Most of the year. Hottest April to September, so the ruins go first thing.",
    "stay": "2 to 3 nights",
    "text": "The dry plains north of Kandy hold the island’s ancient capitals: the rock palace at Sigiriya, the cave temples of Dambulla, and Polonnaruwa, seen by bicycle. Four of the eight World Heritage Sites are here."
  },
  {
    "k": "hills",
    "n": "Hill Country",
    "photo": "teaMist",
    "places": [
      "Kandy",
      "Nuwara Eliya",
      "Ella",
      "Horton Plains"
    ],
    "best": "December to April for clear mornings. The eastern hills around Ella stay drier into the summer.",
    "stay": "3 to 4 nights",
    "text": "Tea estates climb from Kandy to the highest town on the island. The train between them is slow on purpose, and the nights are cool enough for a fire."
  },
  {
    "k": "south",
    "n": "South and west coast",
    "photo": "galleAerial",
    "places": [
      "Galle",
      "Mirissa",
      "Tangalle",
      "Bentota"
    ],
    "best": "December to April.",
    "stay": "3 to 5 nights",
    "text": "The walled fort at Galle, whale boats out of Mirissa, and long empty beaches past Tangalle. The classic place to finish a trip in the northern winter."
  },
  {
    "k": "east",
    "n": "East coast",
    "photo": "arugAerial",
    "places": [
      "Trincomalee",
      "Pasikuda",
      "Arugam Bay"
    ],
    "best": "May to September, while the south has its rain.",
    "stay": "3 to 4 nights",
    "text": "Calm bays and quiet beaches that come into season just as the south coast gets wet. Surf at Arugam Bay, snorkelling off Pigeon Island near Trincomalee."
  },
  {
    "k": "parks",
    "n": "National parks",
    "photo": "leopard",
    "places": [
      "Yala",
      "Udawalawe",
      "Minneriya",
      "Wilpattu"
    ],
    "best": "Yala February to July. The elephant gathering at Minneriya, July to September.",
    "stay": "2 nights a park",
    "text": "Scrub, lagoons and grassland with leopards, elephants, sloth bears and more birds than most people expect. We book the first jeeps of the day."
  },
  {
    "k": "north",
    "n": "The north and the dry zone",
    "photo": "jafClock",
    "places": [
      "Jaffna",
      "Delft Island",
      "Mannar",
      "Point Pedro"
    ],
    "best": "January to September. Hot and dry from May.",
    "stay": "2 to 3 nights",
    "tag": "On request",
    "text": "Flat palmyra country, lagoons and Hindu temples, with its own Tamil cooking and festivals. Near Point Pedro, the Manalkadu sand dunes are the closest the island comes to a desert."
  }
] as Region[],
  culture: [
  {
    "photo": "dambCave",
    "t": "Buddhist heritage",
    "d": "Cave temples, stupas and the Temple of the Tooth in Kandy. Cover shoulders and knees, take shoes and hats off, and never pose with your back to a Buddha."
  },
  {
    "photo": "jafParade",
    "t": "The Hindu north and east",
    "d": "Kovils with carved towers, temple chariots and the long Nallur festival in Jaffna each August."
  },
  {
    "photo": "dancer1",
    "t": "Kandyan dance",
    "d": "Drummers and dancers in silver and red, at the perahera or an evening performance in Kandy."
  },
  {
    "photo": "mask",
    "t": "Masks and crafts",
    "d": "Carved masks from Ambalangoda, batik, lacquer work and handloom, still made in family workshops."
  },
  {
    "photo": "stilt1",
    "t": "Stilt fishing",
    "d": "The poles off Koggala and Ahangama are still there. Most fishermen now pose for photos, and we tell you that before you pay."
  }
] as { photo: PhotoKey; t: string; d: string }[],
  fest: [
  [
    "January",
    "Duruthu Perahera",
    "Kelaniya, near Colombo",
    "A full-moon procession of elephants and dancers at the Kelaniya temple."
  ],
  [
    "January",
    "Thai Pongal",
    "Tamil homes island-wide",
    "The Tamil harvest festival: milk rice boiled over in a new pot."
  ],
  [
    "February",
    "Navam Perahera",
    "Gangaramaya, Colombo",
    "Colombo’s own procession around Beira Lake."
  ],
  [
    "April",
    "Sinhala and Tamil New Year",
    "Everywhere",
    "The island goes home to family. Kiribath, kavum and closed shops for a few days."
  ],
  [
    "May",
    "Vesak",
    "Everywhere",
    "Lanterns, pandals and free food stalls for the Buddha’s birth, enlightenment and passing."
  ],
  [
    "June",
    "Poson",
    "Mihintale and Anuradhapura",
    "Pilgrims climb to the place Buddhism first reached the island."
  ],
  [
    "July or August",
    "Esala Perahera",
    "Kandy",
    "Ten nights of drummers, dancers and robed elephants. Rooms in Kandy go months ahead."
  ],
  [
    "August",
    "Nallur festival",
    "Jaffna",
    "Twenty-five days at the Nallur Kandaswamy temple, ending with the chariot festival."
  ],
  [
    "October or November",
    "Deepavali",
    "Tamil areas",
    "Oil lamps and sweets for the festival of lights."
  ],
  [
    "Every full moon",
    "Poya",
    "Everywhere",
    "A public holiday each month. Temples are busy and alcohol is not sold."
  ]
] as [month: string, name: string, where: string, about: string][],
  food: [
  [
    "Everyday dishes",
    [
      [
        "Rice and curry",
        "The everyday meal: rice with five or six curries, from dhal to jackfruit, and pol sambol on the side.",
        "Lunch"
      ],
      [
        "Hoppers",
        "Bowl-shaped rice-flour pancakes, crisp at the edge. Order one with an egg cracked into the middle.",
        "Breakfast or dinner"
      ],
      [
        "String hoppers",
        "Nests of steamed rice noodles with a thin coconut curry. A south-coast breakfast.",
        "Breakfast"
      ],
      [
        "Kottu roti",
        "Chopped flatbread stir-fried on a hot plate with egg, chicken or vegetables. You hear it before you see it.",
        "Street food"
      ],
      [
        "Lamprais",
        "Rice, curries and a frikkadel baked in a banana leaf. A Dutch Burgher dish, best on a Sunday in Colombo.",
        "Colombo"
      ],
      [
        "Jaffna crab curry",
        "Lagoon crab in a dark, peppery curry. Worth the drive north on its own.",
        "Jaffna"
      ]
    ]
  ],
  [
    "Desserts and drinks",
    [
      [
        "Curd and treacle",
        "Buffalo curd set in clay pots, with kithul palm treacle poured over. Sold by the road on the way south.",
        "Dessert"
      ],
      [
        "Watalappan",
        "A spiced coconut and jaggery custard from the Malay kitchen, made for every celebration.",
        "Dessert"
      ],
      [
        "Kavum and kokis",
        "Oil cakes and crisp lattice biscuits, made by the trayful for the April New Year.",
        "New Year"
      ],
      [
        "Ceylon tea",
        "Grown from the low country to around 2,000 metres. We take you to a factory in Nuwara Eliya or Ella to taste it fresh.",
        "Hill country"
      ],
      [
        "King coconut",
        "Orange coconuts cut open at the roadside. The best drink on a hot day.",
        "Everywhere"
      ]
    ]
  ]
] as [heading: string, dishes: [name: string, about: string, tag: string][]][],
  wild: [
  [
    "leopard",
    "Leopards",
    "Yala and Wilpattu",
    "February to July",
    "Yala has one of the densest leopard populations anywhere. Its busiest block closes for a few weeks around September."
  ],
  [
    "elephants",
    "Asian elephants",
    "Minneriya, Kaudulla, Udawalawe",
    "All year; the gathering July to September",
    "Hundreds come to the grass by the Minneriya tank as the dry season peaks."
  ],
  [
    "whaleTail",
    "Blue whales",
    "Off Mirissa and Trincomalee",
    "November to April in the south; March to August in the east",
    "Boats leave early. Sightings are likely, never promised."
  ],
  [
    "slothBear",
    "Sloth bears",
    "Wilpattu and Yala",
    "June and July",
    "Best when the palu trees fruit and the bears come down to feed."
  ],
  [
    "kingfisher",
    "Endemic birds",
    "Sinharaja rainforest, Horton Plains",
    "November to April",
    "More than thirty birds found nowhere else, with a forest guide who knows their calls."
  ],
  [
    "turtleBeach",
    "Turtles",
    "Rekawa, near Tangalle",
    "All year, after dark",
    "Green turtles nest on the beach. We go with the local conservation project, without torches."
  ]
] as [photo: PhotoKey | null, name: string, where: string, when: string, about: string][],
  faq: [
  [
    "Do we need a visa?",
    "Most visitors need an Electronic Travel Authorisation (ETA) before they fly. You apply online; we send the link and check your dates match the plan."
  ],
  [
    "How long should we stay?",
    "Ten nights covers the Cultural Triangle, the hills and the south coast without rushing. Two weeks lets you add the east coast or a second park. Seven nights works if you pick two regions, not four."
  ],
  [
    "When is the best time to go?",
    "December to April for the south and west coasts and the hills; May to September for the east coast. The Cultural Triangle works most of the year. The month planner above shows each region."
  ],
  [
    "Is it easy to get around?",
    "Yes, with your own driver-guide. Distances are short but the roads are slow, so we keep most drives short and use the train where it has the better view."
  ],
  [
    "What should we wear at temples?",
    "Shoulders and knees covered, shoes and hats off at the entrance. A light scarf in a day bag solves most of it."
  ],
  [
    "Can we add the Maldives?",
    "Yes. It is a short flight from Colombo to Malé, and the most common way to end a Sri Lanka trip slowly."
  ]
] as [string, string][],
};

export const MV = {
  facts: [
  [
    "Islands",
    "About 1,190",
    "Across 26 natural atolls"
  ],
  [
    "Best months",
    "December to April",
    "The dry season. May to November is warmer and wetter, with mantas in Baa."
  ],
  [
    "Arriving",
    "Malé (MLE)",
    "Velana International, on its own island"
  ],
  [
    "Transfers",
    "Boat, seaplane or flight",
    "Decided by how far your island is"
  ],
  [
    "Money",
    "US dollars at resorts",
    "The rufiyaa is used on local islands"
  ],
  [
    "Ceremonies",
    "Symbolic only",
    "Legal weddings for visitors are not possible here"
  ]
] as Fact[],
  steps: [
  [
    "Arrive in Malé",
    "The airport has its own island. Resort staff meet you at arrivals."
  ],
  [
    "Transfer to your island",
    "A speedboat for the atolls near Malé, a seaplane further out, or a domestic flight then a boat for the far south. Seaplanes fly in daylight only, so we time flights to suit."
  ],
  [
    "One island, one resort",
    "Each resort is its own island, so the choice of resort is the choice of everything: reef, food, quiet."
  ]
] as [string, string][],
  atolls: [
  [
    "North Malé",
    "Closest to the airport, by speedboat. Good for a short stay at the end of a Sri Lanka trip."
  ],
  [
    "South Malé",
    "Also by speedboat, with channels for diving and a few quieter resorts."
  ],
  [
    "Baa",
    "A UNESCO Biosphere Reserve. Manta rays gather at Hanifaru Bay, roughly June to November."
  ],
  [
    "Ari",
    "Reached by seaplane. Whale sharks feed off South Ari all year."
  ],
  [
    "Raa and Lhaviyani",
    "Newer resorts by seaplane, and long sandbanks."
  ],
  [
    "Laamu and the south",
    "A domestic flight then a boat. Quieter, with surf breaks and big reef channels."
  ]
] as [string, string][],
  under: [
  [
    "mvManta",
    "Manta rays",
    "Baa in the southwest monsoon; other sites through the year."
  ],
  [
    "mvRay",
    "House reefs",
    "Snorkel straight from the beach at the right resort. We pick for the reef, not the brochure."
  ],
  [
    "whaleShark",
    "Whale sharks",
    "South Ari Atoll, all year. Boats go out with a marine biologist."
  ],
  [
    "mvTurtle",
    "Turtles",
    "Green and hawksbill turtles on most reefs, often close to the shore."
  ]
] as [photo: PhotoKey | null, title: string, about: string][],
  faq: [
  [
    "Can we marry in the Maldives?",
    "Ceremonies for visitors are symbolic, not legal. Many couples marry legally in Sri Lanka or at home, then hold the ceremony on a sandbank."
  ],
  [
    "Is alcohol served?",
    "At resorts, yes. On local islands it is not sold, and dress is more covered."
  ],
  [
    "How many nights?",
    "Three nights feels short once you count the transfers. Four or five is the usual end to a Sri Lanka trip; a week if it is the whole holiday."
  ],
  [
    "Water villa or beach villa?",
    "A water villa has the lagoon under the deck; a beach villa has the sand at the door and more shade. Many couples split the stay."
  ]
] as [string, string][],
};
