/**
 * Travel packages as shown on cards (home "Travel Packages" section and the /packages tabs).
 * Text is copied verbatim from the Webflow CMS — including its inconsistencies
 * ("$ 3000", "NIGHTS", trailing spaces) — so the migrated pages render exactly as before.
 */

export type PackageSlug =
  | "simply-srilanka"
  | "best-of-sri-lanka"
  | "scenic-sri-lanka"
  | "hillcountry"
  | "wildlife-package"
  | "dream-honeymoon-in-sri-lanka";

/** Filter keys for the /packages tabs (see `packageTabs`). */
export type PackageCategory = "honeymoon" | "family" | "seasonal" | "adventure";

export type TravelPackage = {
  slug: PackageSlug;
  href: `/packages/${PackageSlug}`;
  title: string;
  /** The overline above the title: price per person / duration. */
  priceLine: string;
  /** Card background photo. */
  image: string;
  /** Which /packages tabs (besides "All") list this package. */
  categories: PackageCategory[];
};

const pkg = (p: Omit<TravelPackage, "href">): TravelPackage => ({
  ...p,
  href: `/packages/${p.slug}`,
});

export const packages: Record<PackageSlug, TravelPackage> = {
  "simply-srilanka": pkg({
    slug: "simply-srilanka",
    title: "Simply Sri Lanka",
    priceLine: "$3000 PP / 10 Nights",
    image: "/assets/6a6d9f9f00db30d38bd252e1_d6f4a52ad327b383ba0943fdf8286174.jpg",
    categories: [],
  }),
  "best-of-sri-lanka": pkg({
    slug: "best-of-sri-lanka",
    title: "Sri lanka With Little Ones",
    priceLine: "$3200 PP / 11 Nights",
    image: "/assets/6a41dd7eab34901277d0a2df_6.jpg",
    categories: [],
  }),
  "scenic-sri-lanka": pkg({
    slug: "scenic-sri-lanka",
    title: "Scenic Sri Lanka ",
    priceLine: "$2600 PP / 8 Days",
    image: "/assets/6a31a10cd01707ff15b90bad_lou-lou-b-photo-xSI-8hwyUzE-unsplash-1.jpg",
    categories: ["seasonal"],
  }),
  hillcountry: pkg({
    slug: "hillcountry",
    title: "Hill Country & Beach",
    priceLine: "$2500 PP / 8 Nights",
    image: "/assets/6a41dca96291ea3120748b1b_R806lZ8a9OCcxaRnHAtBY8t7F3ZIFpQdlaRoFCYK.jpg",
    categories: ["family"],
  }),
  "wildlife-package": pkg({
    slug: "wildlife-package",
    title: "Wildlife Package ",
    priceLine: "$ 3000 PP / 8 Nights",
    image:
      "/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg",
    categories: ["adventure"],
  }),
  "dream-honeymoon-in-sri-lanka": pkg({
    slug: "dream-honeymoon-in-sri-lanka",
    title: "Honeymoon In Sri Lanka",
    priceLine: "$4000 PP / 10 NIGHTS",
    image: "/assets/6a41d8a9f90b0844dda793bf_Couple-on-Bentota-Beach.webp",
    categories: ["honeymoon"],
  }),
};

/**
 * Which packages each listing shows, in display order. The listings differ on purpose:
 * /packages no longer lists "Simply Sri Lanka", while the home page still leads with it.
 */
export const packageListings = {
  home: ["simply-srilanka", "best-of-sri-lanka", "scenic-sri-lanka"],
  packagesPage: [
    "best-of-sri-lanka",
    "scenic-sri-lanka",
    "hillcountry",
    "wildlife-package",
    "dream-honeymoon-in-sri-lanka",
  ],
} as const satisfies Record<string, readonly PackageSlug[]>;

export type PackageListing = keyof typeof packageListings;

/** The /packages tabs, in order. `category` undefined = "All". Labels are verbatim. */
export const packageTabs: { label: string; category?: PackageCategory }[] = [
  { label: "All" },
  { label: "Honeymoon", category: "honeymoon" },
  { label: "Family toures", category: "family" },
  { label: "Seasonal Tours", category: "seasonal" },
  { label: "Adventure", category: "adventure" },
];

/** Packages for a listing, optionally narrowed to one tab's category (order preserved). */
export function packagesFor(listing: PackageListing, category?: PackageCategory): TravelPackage[] {
  return packageListings[listing]
    .map((slug) => packages[slug])
    .filter((p) => !category || p.categories.includes(category));
}
