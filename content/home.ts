/**
 * Home page copy and list data. Text is verbatim from the Webflow page.
 */
import { packages, type PackageSlug, type TravelPackage } from "@/content/packages";

/** Photos the hero background slider cycles through, in order. */
export const heroBackgrounds: string[] = [
  "/assets/6a7b5e527ed926479f4551de_b449690604091d30c4f9bad1af0b251c73918593.png",
  "/assets/6a7b64dfcecf8489daa0771a_eaacba937a80f8dd021492108a25cb2f44bf5f1e.jpg",
  "/assets/6a7b64df34de8d5181eb28a9_045f9591f67f2a87abaf8f99a4533015b051e3ab.jpg",
  "/assets/6a7b64df58d34385d7805459_b4e16006b4e548321525d18672452306ae6a309c.jpg",
];

const heroDeckSlugs: PackageSlug[] = [
  "hillcountry",
  "best-of-sri-lanka",
  "wildlife-package",
  "scenic-sri-lanka",
  "dream-honeymoon-in-sri-lanka",
];

/** The package cards in the hero's scroller. */
export const heroDeck: TravelPackage[] = heroDeckSlugs.map((slug) => packages[slug]);

export type ActivityTab = {
  label: string;
  /** One run of the marquee; it is rendered twice for a seamless loop. */
  images: string[];
};

export const activityTabs: ActivityTab[] = [
  {
    label: "All",
    images: [
      "/assets/6a30c76515a814dcdce30652_pexels-thilina-alagiyawanna-3266092-36638354-1.jpg",
      "/assets/6a30c7acc2c72bdcf3334bec_kavindaf-plate-6316591-1.png",
      "/assets/6a30c7d75601d08b07505cb0_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg",
      "/assets/6a30c7fc9cd3d56da1003d44_pexels-naveen-3885421-5780322-1.jpg",
      "/assets/6a30c81af9f0933ad1bcbbfe_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg",
      "/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg",
      "/assets/6a30c865412d62d1b36615b3_pexels-pok-rie-33563-37208428-1.png",
      "/assets/6a30c88f469a611a86bf765d_pexels-freestockpro-319948-1.jpg",
      "/assets/6a30c8aa925087c35aacbfa1_pexels-thilina-alagiyawanna-3266092-36608901-1.jpg",
      "/assets/6a30c8cb44dbd82ad5fceb77_nilantha-sanjeewa-EXHIHvJu4VU-unsplash-2.jpg",
    ],
  },
  {
    label: "Wildlife",
    images: [
      "/assets/6a30c96facb038e84b6b2cc6_zoshua-colah-chzS0stfVvI-unsplash-1.png",
      "/assets/6a30c989eb1a083d1ae78e2e_pexels-donn-33380230-1.jpg",
      "/assets/6a30c9b0e1bbd9886583089d_pexels-rajee-kumar-1029496084-33130315-1.jpg",
      "/assets/6a30c9c899206a557480ca73_pexels-donn-33718393-1.jpg",
      "/assets/6a30c9ec5a033ac368f366b7_pexels-bopopics-14621285-1.jpg",
      "/assets/6a30ca066cc6b608b4cfaa55_pexels-marina-zvada-844583049-35598981-1.jpg",
      "/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg",
      "/assets/6a30ca33412d62d1b366979c_pexels-steve-hodder-2160406976-37114886-1.jpg",
      "/assets/6a30ca5030eb92a3c26505ca_pexels-symeon-ekizoglou-1107605-9025410-1.jpg",
      "/assets/6a30dcff786134bd999a8430_pexels-sethumadhavan-308835-6252951-1.jpg",
      "/assets/6a30dd1d44dbd82ad5026a8e_sb-bandara-1GJKxIkSR0E-unsplash-1.jpg",
      "/assets/6a30dd46469a611a86c5484d_ajai-s-O_J1nltjMJ4-unsplash.jpg",
      "/assets/6a30dd5fa1435ff084242638_pexels-ihsan-faiz-703148304-37615784-1.jpg",
    ],
  },
  {
    label: "Relaxation",
    images: [
      "/assets/6a30ddb6a35eafeec6ab1c9c_adam-marikar-3sJIC7dKcpQ-unsplash-1-1.jpg",
      "/assets/6a30ddd644dbd82ad502b686_pexels-thilina-alagiyawanna-3266092-36477892-1.jpg",
      "/assets/6a30de0094a94b113934b1c1_pexels-charithk-5991294-1.jpg",
      "/assets/6a30de22c8cf3a07003238cd_pexels-rohan001-7028721-1.jpg",
      "/assets/6a30de535931c63d6ab0d165_pexels-isharakasthuriarachchi-11453113-1.jpg",
      "/assets/6a30de77cdc905fa64376db4_pexels-roman-odintsov-4555781-1.jpg",
      "/assets/6a30de9222694c53c44e6bf8_pexels-roman-odintsov-4870775-1.jpg",
      "/assets/6a30deacc9ad635d08dc4b84_pexels-marina-zvada-844583049-35598983-1.jpg",
      "/assets/6a30df72acb038e84b70fbc8_pexels-esrageziyor-45760220-11495863-1.jpg",
      "/assets/6a30dfa0a63e446cc184a485_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg",
    ],
  },
  {
    label: "Adventure",
    images: [
      "/assets/6a30e226a1435ff08425b1b0_zoshua-colah-chzS0stfVvI-unsplash-1.jpg",
      "/assets/6a30eec236aa45a1594deb08_pexels-rajee-kumar-1029496084-33130315-1.jpg",
      "/assets/6a30eeeac8cf3a07003837a3_pexels-steve-hodder-2160406976-37114886-1.jpg",
      "/assets/6a30ef0244dbd82ad509c788_pexels-donn-33380230-1.jpg",
      "/assets/6a30ef1d3b52c125874cd2f0_pexels-sethumadhavan-308835-6252951-1.jpg",
      "/assets/6a30ef356cc6b608b4dbe2aa_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg",
      "/assets/6a30ef4facb038e84b773018_pexels-marina-zvada-844583049-35598981-1.jpg",
      "/assets/6a30ef7e1171162297987e29_gemmmm-6GJGwKwTsLE-unsplash-1.jpg",
      "/assets/6a30efb2a63e446cc18ae411_pexels-donn-33718393-1.jpg",
      "/assets/6a30efce61ab0577fffda636_pexels-symeon-ekizoglou-1107605-9025410-1.jpg",
    ],
  },
  {
    label: "Historical",
    images: [
      "/assets/6a30f067d94ce26d7f208cd8_javier-saint-jean-r4pIcB2reug-unsplash.jpg",
      "/assets/6a30f06736aa45a1594eab63_anthony-lim-EZGPy_HOZWQ-unsplash-1.jpg",
      "/assets/6a30f068e1bbd988658f05aa_julie-ricard-RmFX5bxHqCg-unsplash-1.jpg",
      "/assets/6a30f068f517588c869d7049_pexels-samirusandeepa-32547976-1.jpg",
      "/assets/6a30f068a6b4b2b3b886e6c9_pexels-sofiia-asmi-3378970-31753811-1.jpg",
      "/assets/6a30f067925087c35ab975c4_agnieszka-stankiewicz-OMgi4DfiO3c-unsplash-1.jpg",
      "/assets/6a30f067f5cabe53dd2d92fe_pexels-marina-zvada-844583049-35598972-1.jpg",
      "/assets/6a30f067acb038e84b78fd84_Activities-Image.jpg",
      "/assets/6a30f06aead42166f50706dc_pexels-ven-vijaya-1243576398-23229191-1.jpg",
      "/assets/6a30f069b0ee3485bed3a824_pexels-thilina-alagiyawanna-3266092-37010222-1.jpg",
      "/assets/6a30f069279ffc899a7e9a8c_pexels-thilina-alagiyawanna-3266092-37010222-1-1.jpg",
    ],
  },
];

export type BookingStep = {
  number: string;
  title: string;
  body: string;
  image: string;
};

export const bookingSteps: BookingStep[] = [
  {
    number: "01",
    title: "Tell Us What You Want",
    body: "Share your dates, interests and travel style. A specialist replies within 24 hours. Not a bot, not a sales rep — an actual travel designer",
    image: "/assets/6a30fab1023e59ceb0236bf7_Booking-Slider-Image.jpg",
  },
  {
    number: "02",
    title: "Select a Package",
    body: "Click on the tour you love to view full details including itinerary, pricing, and inclusions.",
    image: "/assets/6a30fab54cf89df2f63f43b8_oliver-sjostrom-SDrAcUDJ-Qg-unsplash-2.jpg",
  },
  {
    number: "03",
    title: "Confirm & Pay",
    body: "Once you're happy with everything, confirm your trip with secure payment.",
    image: "/assets/6a30fab5dafa1809d13db625_paul-kapischka-43fXBR3mqoY-unsplash.jpg",
  },
  {
    number: "04",
    title: "Pack & Travel",
    body: "We handle all the logistics so you can relax and enjoy your journey from day one.",
    image: "/assets/6a30fab27bbf7979a38659ee_morgan-nott-h9AFT1fFSzE-unsplash-1.jpg",
  },
];

/** "Travelers Review" section — reasons to travel this year. */
export const travelReasons: { title: string; body: string }[] = [
  {
    title: "Free Tourist Visas",
    body: "Sri Lanka is rolling out free 30-day tourist visas for Australian passport holders in 2026, a limited pilot programme valid through March 2027",
  },
  {
    title: "A Direct Route from Melbourne",
    body: "Jetstar launches direct Melbourne to Colombo flights from August 2026, opening the easiest access Australians have ever had to the island",
  },
  {
    title: "Record-Year Quality, Pre-Rush Pricing",
    body: "Sri Lanka recorded its highest-ever arrival numbers in 2025. Hotels and operators are still pricing for recovery, not demand. That window closes soon",
  },
];
