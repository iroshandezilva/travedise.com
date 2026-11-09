/**
 * Travel packages as shown on cards, from `src/content/site/package-listings.json`.
 * Text is copied verbatim from the Webflow CMS — including its inconsistencies
 * ("$ 3000", "NIGHTS", trailing spaces) — so the migrated pages render exactly as before.
 */
import data from "@/content/site/package-listings.json";

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

export const packages = data.packages as Record<PackageSlug, TravelPackage>;

/**
 * Which packages each listing shows, in display order. The listings differ on purpose:
 * /packages no longer lists "Simply Sri Lanka", while the home page still leads with it.
 */
export const packageListings = data.packageListings as Record<"home" | "packagesPage", PackageSlug[]>;

export type PackageListing = keyof typeof packageListings;

/** The /packages tabs, in order. `category` undefined = "All". Labels are verbatim. */
export const packageTabs = data.packageTabs as { label: string; category?: PackageCategory }[];

/** Packages for a listing, optionally narrowed to one tab's category (order preserved). */
export function packagesFor(listing: PackageListing, category?: PackageCategory): TravelPackage[] {
  return packageListings[listing]
    .map((slug) => packages[slug])
    .filter((p) => !category || p.categories.includes(category));
}
