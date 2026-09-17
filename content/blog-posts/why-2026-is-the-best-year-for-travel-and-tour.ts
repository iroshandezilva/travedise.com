import { BLANK_LINE as BLANK, type BlogPostBody } from "./types";

export const body: BlogPostBody = {
  details: [
    { type: "h5", text: "A Land Unlike Any Other" },
    {
      type: "p",
      lines: [
        "Sri Lanka is a destination that feels like a dream. Often referred to as the “ Pearl Of the Indian Ocean,” this tiny kingdom is where nature, tradition, and happiness coexist in harmony.",
      ],
    },
    { type: "h5", text: "Why Visit " },
    { type: "p", lines: [BLANK] },
    { type: "h6", text: " Untouched Beauty" },
    {
      type: "p",
      lines: ["With over 70% forest cover, the country is a paradise for nature lovers."],
    },
    { type: "h6", text: "3. Spiritual Depth" },
    {
      type: "p",
      lines: ["With hundreds of monasteries,  Sri Lanka is a haven for soul searchers."],
    },
    { type: "h6", text: "4. Unique Culture" },
    {
      type: "p",
      lines: [
        "Witness colorful festivals like Kandy Esala Perahera and traditional sri lankan dress.",
      ],
    },
    { type: "h5", text: "Must-Visit Places in Sri Lanka" },
    {
      type: "ul",
      items: [
        ["Temple Of the Tooth"],
        ["Sigiriya Lion Rock"],
        ["Galle Dutch Fort"],
        ["Yala National Park"],
      ],
    },
  ],
  figure: {
    image: {
      src: "/assets/6a4200b0684d228cb5390483_sigiriya.webp",
      srcSet:
        "/assets/6a4200b0684d228cb5390483_sigiriya-p-500.webp 500w, /assets/6a4200b0684d228cb5390483_sigiriya-p-800.webp 800w, /assets/6a4200b0684d228cb5390483_sigiriya-p-1080.webp 1080w, /assets/6a4200b0684d228cb5390483_sigiriya-p-1600.webp 1600w, /assets/6a4200b0684d228cb5390483_sigiriya.webp 1920w",
      sizes: "100vw",
    },
    caption: "Tiger’s Nest Monastery",
  },
  tips: [
    { type: "h5", text: "Travel Tips for Sri Lanka" },
    {
      type: "ul",
      items: [
        [
          { text: "Tour Packages:", href: "#" },
          " Has a daily tariff that covers accommodation, guide, and meals.",
        ],
        [
          { text: "Best Time to Visit:", href: "#" },
          "  South Coast July - January, Rest of the country throughout the year.",
        ],
        [{ text: "Respect:", href: "#" }, " Dress modestly when visiting religious sites."],
      ],
    },
  ],
  closing: [
    { type: "h5", text: "Final Thoughts" },
    {
      type: "p",
      lines: [
        "Sri Lanka is more than just a destination it's a journey inward. Whether you’re seeking peace, culture, or scenic adventure, this Island welcomes you with open arms and warm smiles.",
      ],
    },
  ],
};
