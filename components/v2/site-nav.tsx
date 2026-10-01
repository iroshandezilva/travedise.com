import Link from "next/link";

import { navLinks } from "@/content/v2/shared";

import { LogoMark } from "./logo";
import { MobileMenu } from "./mobile-menu";

/**
 * The bar that floats over every v2 hero: wordmark, glass pill of links, and the trip
 * CTA. On a phone the links collapse into the hamburger and the whole bar becomes one
 * glass pill.
 *
 * It expects to sit inside a `relative` container that is the hero's inner column.
 * `current` is the href of the page's own section; that link gets the accent underline.
 */
export function SiteNav({ current }: { current?: string } = {}) {
  return (
    <div className="absolute inset-x-0 top-[22px] flex h-[70px] items-center justify-between max-md:top-3.5 max-md:right-4 max-md:left-4 max-md:h-15 max-md:rounded-full max-md:border max-md:border-white/22 max-md:bg-[#10253280] max-md:pr-2 max-md:pl-4 max-md:backdrop-blur-[16px]">
      <Link
        href="/"
        aria-label="Travedise home"
        className="flex h-11 w-[205px] shrink-0 items-center gap-2 max-lg:w-auto"
      >
        <LogoMark className="h-[30px] w-[43px] max-md:h-6 max-md:w-[34px]" />
        <span className="font-display text-[28px]/[34px] font-medium text-white max-md:text-[21px]/[26px]">
          Travedise
        </span>
      </Link>

      <nav
        aria-label="Main"
        className="flex h-14 items-center gap-[26px] rounded-full border border-white/29 bg-[#102532a8] px-[26px] backdrop-blur-[18px] max-lg:hidden"
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            aria-current={href === current ? "page" : undefined}
            className="text-[15px]/[1.2] text-white aria-[current=page]:underline aria-[current=page]:decoration-v2-sky aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[7px]"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex w-[205px] shrink-0 items-center justify-end max-lg:w-auto">
        <Link
          href="/plan-your-trip"
          className="rounded-[50px] border border-v2-sky bg-v2-sky px-[22px] py-[13px] text-[15px]/[1.2] font-medium text-[#10212b] max-md:hidden"
        >
          Plan your journey ↗
        </Link>
        <MobileMenu />
      </div>
    </div>
  );
}

/**
 * The wash that makes hero text legible over a photo: a darkening gradient plus a blurred
 * strip under the nav. The phone variant darkens from the bottom, where its headline sits.
 */
export function HeroScrim({ desktop }: { desktop: string }) {
  return (
    <>
      <div className="absolute inset-0 max-md:hidden" style={{ backgroundImage: desktop }} />
      <div
        className="absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage:
            "linear-gradient(0deg, oklab(0.182 -0.013 -0.008 / 0.82) 0%, oklab(0 0 0 / 0) 58%), linear-gradient(180deg, oklab(0.2 -0.014 -0.012 / 0.5) 0%, oklab(0 0 0 / 0) 34%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[190px] bg-[#09161d21] backdrop-blur-[22px] max-md:hidden"
        style={{ maskImage: "linear-gradient(black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)" }}
      />
    </>
  );
}
