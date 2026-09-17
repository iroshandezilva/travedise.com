/**
 * Package detail pages (`/packages/<slug>`): hero, photo gallery and day-by-day itinerary.
 * Copy is verbatim from the Webflow CMS — typos, inconsistent dashes ("Day 2-3" / "Days 5–6")
 * and all — so the migrated pages render exactly as before. Don't "fix" it here without a
 * content decision.
 */
import type { PackageSlug } from "@/content/packages";

export type ResponsiveImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

export type ItineraryStop = {
  /** Overline with the calendar icon: "Day 1", "Days 4-5"… */
  days: string;
  /** Overline with the pin icon. */
  place: string;
  title: string;
  description: string;
  /**
   * The "You’ll stay at" hotel. Omit for no hotel. `null` is a CMS item whose hotel field is
   * bound but empty: nothing shows, but the empty block still adds its gap under the text.
   */
  stay?: { hotel: string; image: ResponsiveImage } | null;
  /**
   * Photos beside the text. Omit for none. `[]` renders the CMS empty state
   * ("No items found."), as the Webflow page does for Hill Country.
   */
  photos?: ResponsiveImage[];
};

export type PackageDetail = {
  title: string;
  /** Grey serif line under the title. */
  summary: string;
  /** The large hero photo. Opens `gallery` in the lightbox. */
  cover: ResponsiveImage;
  /** Thumbnails over the bottom of the cover. */
  gallery: ResponsiveImage[];
  itinerary: ItineraryStop[];
};

// `sizes` hints exactly as Webflow generated them (they also decide which file loads).
const FULL_WIDTH = "100vw";
const HOTEL_SIZES = "(max-width: 767px) 100vw, (max-width: 991px) 727px, 939px";
const PHOTO_SIZES = "(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px";

/**
 * A Webflow asset with its responsive variants: `widths` lists every variant width, the last
 * being the original (`/assets/x.jpg` → `/assets/x-p-500.jpg 500w, …, /assets/x.jpg 1200w`).
 */
function photo(src: string, widths: number[] = [], sizes?: string): ResponsiveImage {
  if (!widths.length) return { src, sizes };
  const dot = src.lastIndexOf(".");
  const variant = (w: number, i: number) =>
    i === widths.length - 1 ? src : `${src.slice(0, dot)}-p-${w}${src.slice(dot)}`;
  return { src, sizes, srcSet: widths.map((w, i) => `${variant(w, i)} ${w}w`).join(", ") };
}

/**
 * Keyed by slug. `null` — the CMS page exists but has no package content yet, so only the
 * shared sections (navbar, FAQ, footer) render.
 */
export const packageDetails: Record<PackageSlug, PackageDetail | null> = {
  "best-of-sri-lanka": {
    title: "Sri lanka With Little Ones",
    summary: "Family-paced and full of things to point at.",
    cover: photo("/assets/6a41dd7eab34901277d0a2df_6.jpg", [500, 800, 1080, 1500], FULL_WIDTH),
    gallery: [
      photo(
        "/assets/6a34fe1ef0bb9659676e77e8_pexels-naveen-3885421-5780322-1.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85d049dd0c867f75bb1fb0_tom-paisley-v2zEiziFb44-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
    ],
    itinerary: [
      {
        days: "Days 1–2",
        place: "Kandy",
        title: "An Easy Start for the Family",
        description:
          "The dance show’s fire-walkers thrill the kids; the Botanical Gardens have lawns to run on and a treetop bat colony.",
        stay: {
          hotel: "Myst by Cinnamon",
          image: photo(
            "/assets/6a8205a7578bf13b655eb832_mystbycinnomon.jpg",
            [500, 800, 900],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85caa3b24274cca9f6b538_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85caa28a3782248e1325cc_promodhya-abeysekara-gjd-7_3Ek_w-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Days 3–4",
        place: "Nuwara Eliya",
        title: "Boats, Ponies and Cool Green Air",
        description:
          "Lake Gregory brings pedal boats and pony rides, plus a tea factory visit, all at a family pace.",
        stay: {
          hotel: "Araliya Green",
          image: photo(
            "/assets/6a821a5ef8c5e1a53bcbcfb8_Araliya-Green.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cab51c8f537ecd5c1d22_juho-s-uDk9n1yKxTw-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cab545d11fde2087318e_yasasi-rajapakse-poadBPsShxg-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Days 5–6",
        place: "Weerawila",
        title: "The Bit They’ll Never Forget",
        description:
          "Safari. Jeep drives for elephants, deer and crocodiles, with pool time in between.",
        stay: {
          hotel: "Double Tree by Hilton",
          image: photo(
            "/assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85d04945d11fde208b9d2e_kanchana-amilani-fSf4hHZVA5E-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d049729f85529f8e8328_paul-kapischka-43fXBR3mqoY-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d049dd0c867f75bb1fb0_tom-paisley-v2zEiziFb44-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Days 7–8",
        place: "Galle",
        title: "Beach Days on the Coast",
        description:
          "An easy, walkable fort with ice-cream stops one day, the beach and pool the next.",
        stay: {
          hotel: "Jetwing Lighthouse",
          image: photo(
            "/assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Day 9",
        place: "Colombo",
        title: "One Last City Night",
        description:
          "A final city night for shopping, a good meal and a quick look around the capital.",
        stay: {
          hotel: "Hilton Colombo",
          image: photo(
            "/assets/6a821ae61c4e4e5a87d3db02_Hilton-Colombo.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85d08e49debf4a9d6c9a77_alex-azabache-8weolGgaa9w-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d08e5a0e4c58b8c2b47b_igor-savelev-K2iffxrHpjk-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d08e29a3907af03f4843_jalitha-hewage-Dw2QYtzSNn0-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Day 10",
        place: "Airport",
        title: "Time to Fly Home",
        description: "Short transfer to the airport for your flight home.",
      },
    ],
  },
  "dream-honeymoon-in-sri-lanka": {
    title: "Honeymoon In Sri Lanka",
    summary: "Slow, intimate and indulgent, written for two.",
    cover: photo(
      "/assets/6a41d8a9f90b0844dda793bf_Couple-on-Bentota-Beach.webp",
      [500, 800, 1080, 1600, 2000, 2600, 2699],
      FULL_WIDTH,
    ),
    gallery: [
      photo(
        "/assets/6a85caa3b24274cca9f6b538_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cadcae81d435ad91cca6_mika-wegelius-4myLzGehR-A-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
    ],
    itinerary: [
      {
        days: "Days 1–2",
        place: "Kandy",
        title: "A Gentle Start for Two",
        description:
          "Arrival into Sri Lanka. Water buffalo walking the streets, monkeys scampering alongside the road, bright tuk-tuks, displaying peacocks, palm trees and banana plantations will all keep little people engaged as your private driver takes you from the airport to your hotel",
        stay: {
          hotel: "Tharu Village",
          image: photo(
            "/assets/6a821b5ca09db9b6fb389c89_Tharu-Village.jpeg",
            [500, 701],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85caa3b24274cca9f6b538_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85caa28a3782248e1325cc_promodhya-abeysekara-gjd-7_3Ek_w-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Day 2 - 3",
        place: "Nuwara Eliya",
        title: "Planter’s Bungalows, Just for You",
        description:
          "Explore endless tea plantations, misty mountains, scenic waterfalls, Gregory Lake, charming colonial buildings, and the breathtaking beauty of Horton Plains. A perfect escape for nature, adventure, relaxation, and unforgettable views.",
        stay: {
          hotel: "Ceylon Tea Trails",
          image: photo(
            "/assets/6a82185461ff4081ebc3ae71_Ceylon-Tea-Trails.jpg",
            [500, 800, 1024],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cab51c8f537ecd5c1d22_juho-s-uDk9n1yKxTw-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cab545d11fde2087318e_yasasi-rajapakse-poadBPsShxg-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Days 5–6",
        place: "Yala",
        title: "A Little Wildness Together",
        description:
          "Experience Sri Lanka’s wild side with an exciting safari through Yala National Park, home to leopards, elephants, crocodiles, and incredible birdlife.",
        stay: {
          hotel: "Hilton Yala",
          image: photo(
            "/assets/6a4694ef97b30cec1228a1ba_hilton-yala-resort.jpg",
            [500, 800, 1080, 1400],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Days 7–9",
        place: "Tangalle",
        title: "The Heart of the Honeymoon",
        description:
          "Three nights on a quiet stretch of sand. Beach, pool, couples’ treatments and long dinners.",
        stay: {
          hotel: "Anantara Peace Haven",
          image: photo("/assets/6a8207271ef510e93459e0fc_Anantara-Peace-Haven.avif"),
        },
        photos: [
          photo(
            "/assets/6a85cadcb5e51023ec716dd9_jannes-jacobs-L9GKXQwpadw-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cadcae81d435ad91cca6_mika-wegelius-4myLzGehR-A-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cadc004b944edbd46b9c_pexels-esrageziyor-45760220-11490128.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Days 9",
        place: "Galle",
        title: "The Most Romantic Nights on the Coast",
        description:
          "Explore the iconic Galle Fort, stroll through charming colonial streets, enjoy beautiful beaches, and experience the perfect blend of history, culture, and coastal charm .",
        stay: {
          hotel: "Selenya Talpe",
          image: photo("/assets/6a97d8d83660a4acd16cb9ad_hero-poster.avif"),
        },
        photos: [
          photo(
            "/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
    ],
  },
  hillcountry: {
    title: "Hill Country & Beach",
    summary:
      "Escape to Sri Lanka’s breathtaking hill country and golden beaches. Enjoy cool mountain scenery, tea plantations, waterfalls, and unwind on pristine tropical shores for the perfect blend of relaxation and adventure.",
    cover: photo(
      "/assets/6a41dca96291ea3120748b1b_R806lZ8a9OCcxaRnHAtBY8t7F3ZIFpQdlaRoFCYK.jpg",
      [500, 800, 1080, 1200],
      FULL_WIDTH,
    ),
    gallery: [
      photo(
        "/assets/6a41dcaf0426a2d1ca0c18f8_rRQEdwLLHTRS2VchZxX9x2zoKTwSlevfwwWKqqPJ.jpg",
        [500, 800, 1080, 1200],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a41dcb30f8b718ed78a3194_aoE6iw4OzAGMm9KAx8xSM2gMjKZAwrWGRZ9JhgHm.jpg",
        [500, 800, 1080, 1200],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a41dceae7f211ad542c5b87_ella-hill-country-tour-a-perfect-day-tour-in-sri-lanka-768x432.jpg",
        [500, 768],
        FULL_WIDTH,
      ),
    ],
    itinerary: [
      {
        days: "Day 1",
        place: "Kandy",
        title: "Sri Lanka's Last Kingdom",
        description:
          "Discover Sri Lanka’s cultural heart with the Temple of the Sacred Tooth Relic, scenic Kandy Lake, lush hills, and rich traditions.",
        stay: {
          hotel: "Myst by Cinnamon",
          image: photo(
            "/assets/6a8205a7578bf13b655eb832_mystbycinnomon.jpg",
            [500, 800, 900],
            FULL_WIDTH,
          ),
        },
        photos: [],
      },
      {
        days: "Day 2",
        place: "Nuwara Eliya",
        title: "Little England in the Clouds",
        description:
          "Explore endless tea plantations, misty mountains, scenic waterfalls, Gregory Lake, charming colonial buildings, and the breathtaking beauty of Horton Plains. A perfect escape for nature, adventure, relaxation, and unforgettable views.",
        stay: {
          hotel: "Araliya Green",
          image: photo(
            "/assets/6a821a5ef8c5e1a53bcbcfb8_Araliya-Green.jpg",
            [500, 800, 1024],
            FULL_WIDTH,
          ),
        },
        photos: [],
      },
      {
        days: "Day 3",
        place: "Ella",
        title: "Ridgelines and Railway Bridges",
        description:
          "A day on foot: Little Adam’s Peak, the Nine Arches Bridge and Ravana Falls, with cafe hopping to finish.",
        stay: {
          hotel: "Anasa Wellness Resort",
          image: photo("/assets/6a81fb7ea325af1ae46b6b37_Anasa_Wellness_Resort_logo.jpg"),
        },
        photos: [],
      },
      {
        days: "Days 4-5",
        place: "Yala",
        title: "Down to Leopard Country",
        description:
          "Two days of jeep safaris in leopard country, plus elephants and birdlife. Mornings for the animals, afternoons by the pool.",
        stay: {
          hotel: "Hilton Yala",
          image: photo(
            "/assets/6a8206e661ff4081ebbfb01e_Hilton-Yala.webp",
            [500, 800, 1080, 1600, 1920],
            FULL_WIDTH,
          ),
        },
        photos: [],
      },
      {
        days: "Day 6",
        place: "Tangalle",
        title: "Your First Taste of the Coast",
        description:
          "Your first taste of the coast. Slow days between the sea and the spa, with the Hummanaya blow hole nearby.",
        stay: {
          hotel: "Anantara Peace Haven",
          image: photo("/assets/6a8207271ef510e93459e0fc_Anantara-Peace-Haven.avif"),
        },
        photos: [],
      },
      {
        days: "Days 7–8",
        place: "Galle",
        title: "The Fort by the Sea",
        description:
          "Explore the iconic Galle Fort, stroll through charming colonial streets, enjoy beautiful beaches, and experience the perfect blend of history, culture, and coastal charm .",
        stay: {
          hotel: "Jetwing Lighthouse",
          image: photo(
            "/assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg",
            [500, 800, 1024],
            FULL_WIDTH,
          ),
        },
        photos: [],
      },
      {
        days: "Day 9",
        place: "Airport Transfer",
        title: "Time to Fly Home",
        description: "Private transfer to Colombo airport for your flight home.",
        stay: null,
      },
    ],
  },
  "scenic-sri-lanka": {
    title: "Scenic Sri Lanka",
    summary: "From Sigiriya rock fortress to Yala National Park and breathtaking views.",
    cover: photo("/assets/6a31a10cd01707ff15b90bad_lou-lou-b-photo-xSI-8hwyUzE-unsplash-1.jpg"),
    gallery: [
      photo(
        "/assets/6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85d94dc43e510d7a07dad5_agnieszka-stankiewicz-OMgi4DfiO3c-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85d903e535476624425061_sander-traa-PPEP9eGTsnI-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
    ],
    itinerary: [
      {
        days: "Day 1",
        place: "Kandy",
        title: "A City Around a Lake",
        description:
          "Ringed by hills. The Temple of the Sacred Tooth Relic and the Royal Botanical Gardens, then a viewpoint at dusk.",
        stay: {
          hotel: "Myst by Cinnamon",
          image: photo(
            "/assets/6a8205a7578bf13b655eb832_mystbycinnomon.jpg",
            [500, 800, 900],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85caa2930e02b5d0264fbc_arto-suraj-g2VBsOPD4T8-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85caa3b24274cca9f6b538_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85caa28a3782248e1325cc_promodhya-abeysekara-gjd-7_3Ek_w-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Day 2-3",
        place: "Dambulla & Polonnaruwa",
        title: "Into the Cultural Triangle",
        description:
          "Climb Dambulla’s golden cave temples, then cycle the ancient royal ruins of Polonnaruwa.",
        stay: {
          hotel: "Jetwing Lake",
          image: photo(
            "/assets/6a8207f984c3f3b8a29e0871_Jetwing-Lake-1920x1000-1.jpg",
            [500, 800, 1080, 1920],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85d944f46e4b541b677481_datingjungle-AnW9vbHAN7U-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85d9446e7c60a73e959066_rathna-deepaya-KkDMH8GaDaQ-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85d94dc43e510d7a07dad5_agnieszka-stankiewicz-OMgi4DfiO3c-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Day",
        place: "Sigiriya",
        title: "The Rock That Rises From the Plain",
        description:
          "Climb the 200-metre fortress early for one of the great views in Asia. Neighbouring Pidurangala frames it against the sky.",
        stay: {
          hotel: "Sigiriya King's Resort",
          image: photo(
            "/assets/6a85e9717a590275616f1011_Sigiriya-King-s-Resort.jpg",
            [500, 800, 1024],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85d902ab9b547b27490300_lou-lou-b-photo-xSI-8hwyUzE-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85d9028972827837d2ee54_sander-traa-BiB2Lq63Nn8-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85d903e535476624425061_sander-traa-PPEP9eGTsnI-unsplash-2.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Days 5–7",
        place: "Yala National Park",
        title: "The Dry Zone at Its Most Dramatic",
        description:
          "Three days in scrub, granite and lagoon scenery, with leopards, elephants and birdlife on morning and afternoon safaris.",
        stay: {
          hotel: "Double Tree by Hilton",
          image: photo(
            "/assets/6a461c29fd0d6e940f90de7f_Pool-at-DoubleTree-Weerawila-1068x801.jpg",
            [500, 800, 1068],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Day 8",
        place: "Tangalle",
        title: "The Coast Arrives Like an Exhale",
        description: "Wide, quiet beaches, with the Hummanaya blow hole nearby.",
        stay: {
          hotel: "Anantara Peace Haven",
          image: photo("/assets/6a8207271ef510e93459e0fc_Anantara-Peace-Haven.avif"),
        },
        photos: [
          photo(
            "/assets/6a85cadcb5e51023ec716dd9_jannes-jacobs-L9GKXQwpadw-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cadcae81d435ad91cca6_mika-wegelius-4myLzGehR-A-unsplash.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
          photo(
            "/assets/6a85cadc004b944edbd46b9c_pexels-esrageziyor-45760220-11490128.jpg",
            [500, 640],
            FULL_WIDTH,
          ),
        ],
      },
      {
        days: "Days 9–10",
        place: "Galle",
        title: "The Old Fort by the Ocean",
        description:
          "Ramparts, galleries and a lighthouse at the point. One day for history, one for the beach.",
        stay: {
          hotel: "Jetwing Lighthouse",
          image: photo(
            "/assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg",
            [500, 800, 1024],
            FULL_WIDTH,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Day 11",
        place: "Airport",
        title: "The Full Sweep Behind You",
        description:
          "Private transfer to Colombo airport, the whole island gathered into one journey.",
        stay: null,
      },
    ],
  },
  "simply-srilanka": null,
  "wildlife-package": {
    title: "Wildlife Package",
    summary: "Nature end to end, from gardens to leopard country.",
    cover: photo(
      "/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg",
      [500, 750],
      FULL_WIDTH,
    ),
    gallery: [
      photo(
        "/assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
      photo(
        "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
        [500, 640],
        FULL_WIDTH,
      ),
    ],
    itinerary: [
      {
        days: "Days 1–2",
        place: "Sigiriya",
        title: "Rock fortress and wildlife",
        description:
          "Day one, the Temple of the Sacred Tooth Relic and a dance show. Day two: giant trees, orchids and a treetop bat colony.",
        stay: {
          hotel: "Jetwing Lake",
          image: photo("/assets/6a97db693e8b196e3ca74e68_jetwing-lake.jpg"),
        },
        photos: [
          photo("/assets/6a97dc9551f90341d964a424_209329-sigiriya-rock-fortress-sri-lanka.jpg"),
          photo("/assets/6a97dc9a2011f106f35dfd8b_Sigiriya-4.jpg"),
          photo("/assets/6a97dca45af87a267af356ae_Minneriya-National-Park.jpg"),
        ],
      },
      {
        days: "Day 3",
        place: "Kandy",
        title: "The last kingdom in sri lanka",
        description:
          "Discover Sri Lanka’s cultural heart with the Temple of the Sacred Tooth Relic, scenic Kandy Lake, lush hills, and rich traditions.",
        stay: {
          hotel: "Cinnamon Kandy",
          image: photo("/assets/6a97dd5991c3c6b5f19a4a98_Cinnamon-Citadel-Kandy-800x520-1.jpg"),
        },
        photos: [
          photo(
            "/assets/6a97dd12dc2bb83ea205120f_a_realistic_high_detail_travel_photograph_of_kandy-2.jpeg",
          ),
        ],
      },
      {
        days: "Day 4",
        place: "Ella",
        title: "Where the Train Threads the Jungle",
        description:
          "An active hill day: Little Adam’s Peak, the Nine Arches Bridge and Ravana Falls, alive with birds and butterflies.",
        stay: {
          hotel: "98 Acres Resort & Spa",
          image: photo("/assets/6a81fb7ea325af1ae46b6b37_Anasa_Wellness_Resort_logo.jpg"),
        },
        photos: [
          photo(
            "/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d552540f9e4ab4d3965d_matt-dany-KhVYyckCj_8-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85d55282af03360bc76fcf_praveen-maleesha-Qjbu8uEnyeo-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Days 5–6",
        place: "Yala",
        title: "The Highest Leopard Density on Earth",
        description:
          "The heart of the trip. Two days of safaris for leopards, elephants, sloth bears and dazzling birdlife.",
        stay: {
          hotel: "Double Tree by Hilton",
          image: photo(
            "/assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Days 7–8",
        place: "Galle",
        title: "Fort, Beach and Blue Whales",
        description:
          "Wind down at the fort and the beach. In season (Nov–Apr), add blue whale watching off nearby Mirissa.",
        stay: {
          hotel: "Jetwing Lighthouse",
          image: photo(
            "/assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg",
            [500, 800, 1024],
            HOTEL_SIZES,
          ),
        },
        photos: [
          photo(
            "/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
          photo(
            "/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg",
            [500, 640],
            PHOTO_SIZES,
          ),
        ],
      },
      {
        days: "Day 9",
        place: "Airport",
        title: "Home Bound",
        description:
          "This morning you’ll be driven to the airport at Colombo to board your flight home. Time to revel in the memories and plan your next trip.",
      },
    ],
  },
};
