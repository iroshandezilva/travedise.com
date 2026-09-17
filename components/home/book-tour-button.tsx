import Link from "next/link";

import { cn } from "@/lib/cn";

/** Webflow's "outBack": overshoots, then settles. */
const OUT_BACK = "duration-800 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]";

/**
 * The hero's "Book Your Tour" pill with a lime arrow badge. An SVG "goo" filter blurs and
 * re-thresholds the pair, so on hover — as the badge slides into the pill, turns to point
 * right and the pill fills lime — the two melt into a single shape.
 */
export function BookTourButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group relative z-100 flex items-stretch justify-start whitespace-nowrap text-navy no-underline [filter:url(#book-tour-goo)]"
    >
      <svg aria-hidden width="0" height="0" className="absolute" colorInterpolationFilters="sRGB">
        <defs>
          <filter id="book-tour-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <span
        className={cn(
          "rounded-full bg-white px-[21px] py-[13px] transition-colors",
          OUT_BACK,
          "group-hover:bg-lime",
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "ml-[0.45rem] flex size-[50px] items-center justify-center rounded-full bg-lime transition-[translate,rotate]",
          OUT_BACK,
          "group-hover:-translate-x-4 group-hover:rotate-45",
        )}
      >
        <ArrowUpRight className="size-5" />
      </span>
    </Link>
  );
}

/** The thin ↗ arrow used on the hero buttons and cards. */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center justify-center", className)}>
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden className="block">
        <path
          d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
          fill="#091733"
        />
      </svg>
    </span>
  );
}
