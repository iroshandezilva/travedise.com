import Link from "next/link";

import { ArrowButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { NavbarFrame } from "./navbar-frame";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/plan-your-trip", label: "Plan your trip" },
  { href: "/blog", label: "Blog" },
] as const;

export type NavHref = (typeof LINKS)[number]["href"];

const LOGO = {
  light: "/assets/6a90409b2572838714e11678_image-4-Vectorized-.svg", // navy wordmark
  transparent: "/assets/69e71a6f589fe83624cd3faf_travedise-logo.svg", // white wordmark
};

export type NavbarProps = {
  /**
   * `light` — navy links on a clear bar that fills white (with a hairline) as the page scrolls.
   * `transparent` — white links and glass pills over a photo hero; the bar fills navy.
   */
  variant?: "light" | "transparent";
  /** The link shown as the current page. */
  current?: NavHref;
  /** Fill the bar over the first 3% of page scroll. `false` = solid white from the start. */
  fillOnScroll?: boolean;
  /** Slide the bar up while scrolling down and back in when scrolling up. */
  hideOnScroll?: boolean;
};

/**
 * Site header: logo, pill menu and "Book Now". Collapses to a hamburger dropdown at ≤991px.
 *
 * | page                                  | props                                               |
 * | ------------------------------------- | --------------------------------------------------- |
 * | `/`                                   | `variant="transparent" current="/" hideOnScroll={false}` |
 * | `/about`                              | `variant="transparent" current="/about"`            |
 * | `/blog-posts/*`                       | `variant="transparent"`                             |
 * | `/blog`, `/packages`                  | `current="/blog"` · `"/packages"`                   |
 * | `/faq`                                | (none)                                              |
 * | `/packages/*` (package detail)        | `fillOnScroll={false} hideOnScroll={false}`          |
 */
export function Navbar({
  variant = "light",
  current,
  fillOnScroll = true,
  hideOnScroll = true,
}: NavbarProps) {
  const transparent = variant === "transparent";
  const aria = (href: string) => (href === current ? ("page" as const) : undefined);

  const book = (className?: string) => (
    <ArrowButton
      href="/plan-your-trip"
      variant={transparent ? "glass" : "light"}
      aria-current={aria("/plan-your-trip")}
      className={className}
    >
      Book Now
    </ArrowButton>
  );

  return (
    <NavbarFrame
      variant={variant}
      fillOnScroll={fillOnScroll}
      hideOnScroll={hideOnScroll}
      brand={
        <Link
          href="/"
          aria-current={aria("/")}
          className="relative block w-[105px] max-lg:flex max-lg:items-center max-sm:w-20"
        >
          <img src={LOGO[variant]} alt="Travedise Logo" className="block w-full" />
        </Link>
      }
      menu={
        <div
          className={cn(
            "relative z-1 flex items-center justify-between gap-[5px] rounded-full border p-[5px]",
            "max-lg:flex-col max-lg:items-start max-lg:gap-3 max-lg:rounded-xl max-lg:border-0 max-lg:px-6 max-lg:pt-6 max-lg:pb-[26px] max-lg:shadow-[0_2px_5px_#0003]",
            transparent
              ? "border-white/30 bg-black/48 backdrop-blur-[20px] max-lg:bg-navy max-md:overflow-auto"
              : "border-navy/12 max-lg:bg-white",
          )}
        >
          {LINKS.map(({ href, label }) => {
            const active = href === current;
            return (
              <Link
                key={href}
                href={href}
                aria-current={aria(href)}
                className={cn(
                  "z-10 rounded-full px-4 py-2 no-underline transition-all duration-250 ease-[ease] max-lg:rounded-none max-lg:bg-transparent max-lg:p-0",
                  transparent
                    ? active
                      ? "bg-white text-navy max-lg:text-white"
                      : "text-white hover:bg-white hover:text-navy max-lg:text-slate-300 max-lg:hover:bg-transparent max-lg:hover:text-white"
                    : active
                      ? "bg-navy text-white max-lg:text-navy"
                      : "text-navy hover:bg-navy hover:text-white max-lg:text-slate max-lg:hover:bg-transparent max-lg:hover:text-navy",
                )}
              >
                {label}
              </Link>
            );
          })}
          {book("hidden max-lg:mx-auto max-lg:inline-flex")}
        </div>
      }
      actions={<div className="max-lg:hidden">{book()}</div>}
    />
  );
}
