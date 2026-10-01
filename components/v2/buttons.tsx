import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "children">;

/**
 * The v2 pill button. One shape, four fills:
 *
 * - `sky` — the accent CTA ("Plan your trip"), navy text on #47cdff
 * - `navy` — solid navy with white text, for a CTA on a light section
 * - `outline` — navy text inside a navy hairline on white
 * - `glass` — white text inside a translucent rim, for use over a photo
 *
 * `block` makes it full width, which is what every one of these does on a phone.
 */
export function PillLink({
  variant = "sky",
  block = false,
  className,
  children,
  ...props
}: LinkProps & {
  variant?: "sky" | "navy" | "outline" | "glass";
  block?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        "inline-flex h-[52px] items-center justify-center rounded-[26px] px-7 text-[15px]/[1.2] font-medium transition-[opacity,transform] duration-150 ease-out-quad hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none max-md:text-[16px]",
        {
          sky: "bg-v2-sky text-[#10212b]",
          navy: "bg-v2-navy text-white",
          outline: "border border-v2-navy bg-white text-v2-navy",
          glass: "border border-white/40 bg-white/12 text-white",
        }[variant],
        block ? "w-full" : "max-md:w-full",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * A wide pill whose label sits left and arrow sits right, rather than centred —
 * used where the button is a destination in itself ("About us", "Plan your trip").
 */
export function SplitPillLink({
  variant = "sky",
  arrow = "↗",
  className,
  children,
  ...props
}: LinkProps & { variant?: "sky" | "outline"; arrow?: string; children: ReactNode }) {
  return (
    <Link
      className={cn(
        "flex h-[52px] items-center justify-between rounded-full pr-5 pl-[22px] transition-[opacity,transform] duration-150 ease-out-quad hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none max-md:justify-center max-md:gap-2",
        variant === "sky" ? "bg-v2-sky" : "border border-v2-navy bg-white",
        className,
      )}
      {...props}
    >
      <span className="text-[16px]/[20px] font-semibold text-v2-navy">{children}</span>
      <span aria-hidden className="text-[18px]/[20px] font-medium text-v2-navy max-md:text-[16px]">
        {arrow}
      </span>
    </Link>
  );
}

/**
 * A label beside a round arrow badge, both inside a hairline rim. Used on dark panels
 * where a solid fill would be too loud.
 */
export function BadgeLink({ className, children, ...props }: LinkProps & { children: ReactNode }) {
  return (
    <Link
      className={cn(
        "flex h-16 shrink-0 items-center gap-[18px] rounded-full border border-white/45 pr-2.5 pl-[30px] transition-[background-color,transform] duration-150 ease-out-quad hover:bg-white/8 active:scale-[0.97] motion-reduce:transition-none max-md:h-14 max-md:gap-3 max-md:pl-6",
        className,
      )}
      {...props}
    >
      <span className="text-[16px]/[20px] text-white">{children}</span>
      <span
        aria-hidden
        className="flex size-11 items-center justify-center rounded-full border border-white/45 text-[16px] text-white max-md:size-10"
      >
        →
      </span>
    </Link>
  );
}

/** The underlined text link that sits opposite a section heading ("Explore our journeys ↗"). */
export function QuietLink({ className, children, ...props }: LinkProps & { children: ReactNode }) {
  return (
    <Link
      className={cn(
        "inline-block border-b border-v2-navy pb-2 text-[16px]/[1.2] text-v2-navy max-md:border-0 max-md:pb-0 max-md:text-[15px]/[20px] max-md:text-[#126a8f]",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
