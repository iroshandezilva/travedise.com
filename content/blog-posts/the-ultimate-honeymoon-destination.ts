import { BLANK_LINE as BLANK, type BlogPostBody } from "./types";

export const body: BlogPostBody = {
  details: [
    { type: "p", lines: ["Honeymoon in Sri Lanka – A Journey of Love"] },
    {
      type: "p",
      lines: [
        BLANK,
        "1. Romantic Hill Country",
        "Escape to the cool mountains of Kandy and Nuwara Eliya, where scenic train rides, waterfalls, tea plantations, and cozy hotels create the perfect romantic setting.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "2. Tropical Beach Escape",
        "Relax on Sri Lanka’s golden beaches, enjoy breathtaking sunsets, private dinners by the ocean, and luxurious beachfront resorts along the southern coast.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "3. Adventure Together",
        "Create unforgettable memories with wildlife safaris, whale watching, hiking, hot air balloon rides, and exciting outdoor experiences designed for couples.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "4. Luxury & Cultural Experiences",
        "Discover ancient temples, UNESCO World Heritage sites, authentic Sri Lankan cuisine, relaxing spa treatments, and warm hospitality that make every honeymoon truly special.",
        "Sri Lanka offers the perfect blend of romance, adventure, relaxation, and culture, making it an unforgettable honeymoon destination for couples from around the world.",
      ],
    },
    { type: "p", lines: [BLANK] },
  ],
  // The CMS has no photo for this post; only the caption shows.
  figure: { caption: "Tiger’s Nest Monastery" },
  tips: [
    {
      type: "p",
      lines: [
        "Travel Tips for Your Honeymoon in Sri Lanka",
        "1. Check Your Visa Requirements",
        "Most travelers need an Electronic Travel Authorization (ETA) before arriving in Sri Lanka. Apply in advance and ensure your passport is valid for at least six months.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "2. Best Time to Visit",
        "Sri Lanka is a year-round destination. The south and west coasts are best from December to April, while the east coast is ideal from May to September.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "3. Respect the Local Culture",
        "Dress modestly when visiting temples, remove your shoes before entering sacred sites, and always ask permission before taking photos of people.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "4. Plan a Balanced Itinerary",
        "Combine the hill country, beaches, wildlife, and cultural attractions to experience the best of Sri Lanka in one romantic journey.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "5. Choose Romantic Accommodation",
        "Stay in boutique hotels, luxury resorts, or private villas with scenic views for a memorable honeymoon experience.",
      ],
    },
    {
      type: "p",
      lines: [
        BLANK,
        "6. Pack Smart",
        "Bring lightweight clothing, comfortable walking shoes, sunscreen, insect repellent, and a light jacket for cooler evenings in the hill country.",
        "With a little planning, your honeymoon in Sri Lanka will be filled with breathtaking scenery, warm hospitality, unforgettable experiences, and memories to last a lifetime.",
      ],
    },
    { type: "p", lines: [BLANK] },
  ],
  closing: [
    { type: "h5", text: "Final Thoughts" },
    {
      type: "h5",
      text: "Sri Lanka is more than just a destination it's a journey inward. Whether you’re seeking peace, culture, or scenic adventure, this island welcomes you with open arms and warm smiles.",
    },
  ],
};
