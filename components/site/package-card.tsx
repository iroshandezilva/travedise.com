import Link from "next/link";

import { OutlinePill } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { TravelPackage } from "@/content/packages";
import { cn } from "@/lib/cn";

/**
 * A package photo card: full-bleed photo, dark gradient at the bottom with the price
 * overline, serif title and a "More info" pill. Identical on every page; only the grid
 * around it differs (see `PackageCardGrid`).
 *
 * The Webflow card has no hover state — its IX2 hover timelines target elements the
 * card doesn't contain — so none is added here (the card isn't a `group`, so
 * `OutlinePill` doesn't roll either).
 */
export function PackageCard({ pkg, className }: { pkg: TravelPackage; className?: string }) {
  return (
    <Link
      href={pkg.href}
      className={cn("flex h-[520px] max-w-full flex-col no-underline max-md:h-full", className)}
    >
      <div className="relative isolate flex size-full flex-col items-center justify-end overflow-hidden rounded-3xl shadow-[0_0_0_1px_#00000021]">
        <img
          src={pkg.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-1 size-full max-w-none object-cover"
        />
        <div className="flex w-full flex-col items-center gap-2 rounded-3xl bg-[linear-gradient(#0000,#000c_75%)] px-6 pt-10 pb-5 max-md:h-[400px] max-md:justify-end">
          <div className="flex flex-col items-center gap-1">
            <div className="text-white">{pkg.priceLine}</div>
            <div className="min-h-[60px] text-center font-serif text-[28px]/[113%] font-light text-white">
              {pkg.title}
            </div>
          </div>
          <OutlinePill>More info</OutlinePill>
        </div>
      </div>
    </Link>
  );
}

const GRID = {
  /** Home "Travel Packages" — `.collection-list-packages` */
  home: "grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-6",
  /** /packages tabs — `.packages-collection-list` */
  listing:
    "grid-cols-3 gap-x-[25px] gap-y-[30px] max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-10 max-sm:gap-3",
};

/**
 * A grid of package cards. Each card slides in from the bottom (100ms delay) when it
 * scrolls into view; pass `reveal={false}` for lists that appear without it (the
 * non-"All" tabs on /packages).
 */
export function PackageCardGrid({
  packages,
  layout,
  reveal = true,
  className,
}: {
  packages: TravelPackage[];
  layout: keyof typeof GRID;
  reveal?: boolean;
  className?: string;
}) {
  return (
    <div role="list" className={cn("grid w-full", GRID[layout], className)}>
      {packages.map((pkg) =>
        reveal ? (
          <Reveal key={pkg.slug} role="listitem" delay={100}>
            <PackageCard pkg={pkg} />
          </Reveal>
        ) : (
          <div key={pkg.slug} role="listitem">
            <PackageCard pkg={pkg} />
          </div>
        ),
      )}
    </div>
  );
}
