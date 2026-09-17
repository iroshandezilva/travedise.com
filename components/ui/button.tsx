import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & { children: ReactNode };

/**
 * Two stacked copies of a label; on hover of the nearest `group` the first rolls up and
 * the second (lighter, when `lightSecond`) rolls in from below.
 */
export function TextRoll({
  children,
  lightSecond = false,
  className,
}: {
  children: ReactNode;
  lightSecond?: boolean;
  className?: string;
}) {
  const line = "block transition-transform duration-350 group-hover:-translate-y-full";
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <span className={line}>{children}</span>
      <span
        aria-hidden
        className={cn(line, "absolute inset-x-0 top-full", lightSecond && "font-light")}
      >
        {children}
      </span>
    </span>
  );
}

const ARROW = {
  light: "/assets/69c38c90a6a389dfc58351ff_Frame-2147223741-2-.webp", // white arrow on navy
  glass: "/assets/69c38c90a6a389dfc58351fe_Frame-2147223741-1-.webp", // navy arrow on white
};

/**
 * The site's primary call to action ("Book Now"): a pill with a label and a round arrow
 * badge. On hover a fill sweeps in from the right, the label rolls, and the arrow flies out
 * to the top-right while a second one flies in.
 *
 * - `light` — white pill, navy badge, fills navy (on light backgrounds)
 * - `glass` — translucent dark pill, white badge, fills white (on photos / dark sections)
 */
export function ArrowButton({
  variant = "light",
  className,
  children,
  ...props
}: LinkProps & { variant?: "light" | "glass" }) {
  const glass = variant === "glass";
  const arrow =
    "absolute inset-0 flex items-center justify-center transition-transform duration-300";
  return (
    <Link
      className={cn(
        "group relative inline-flex max-w-full items-center justify-center overflow-clip rounded-full border p-[5px] text-center text-base/6 no-underline backdrop-blur-[20px] transition-colors duration-300",
        "max-md:p-[3px] max-md:text-sm/5",
        glass
          ? "border-white/30 bg-black/48 text-white hover:text-navy"
          : "border-navy/12 bg-white text-navy hover:text-white",
        className,
      )}
      {...props}
    >
      <TextRoll
        lightSecond
        className="z-2 mr-4 ml-[21px] h-6 max-lg:mr-3 max-lg:ml-4 max-md:mr-1.5 max-md:ml-2.5 max-md:h-5"
      >
        {children}
      </TextRoll>
      <span
        className={cn(
          "relative z-2 flex size-10 items-center justify-center overflow-clip rounded-full max-lg:size-[35px] max-md:size-[30px]",
          glass ? "bg-white" : "bg-navy",
        )}
      >
        <span className="relative size-4 overflow-clip max-lg:size-[13px]">
          <span
            className={cn(arrow, "group-hover:translate-x-[22px] group-hover:-translate-y-[22px]")}
          >
            <img src={ARROW[variant]} alt="" className="block" />
          </span>
          <span className={cn(arrow, "-translate-x-[22px] translate-y-6 group-hover:translate-0")}>
            <img src={ARROW[variant]} alt="" className="block" />
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-[5px] right-[5px] z-0 w-0 rounded-full transition-[width] duration-300 group-hover:w-[93%] max-md:inset-y-[3px]",
          glass ? "bg-white" : "bg-navy",
        )}
      />
    </Link>
  );
}

/**
 * Solid pill with a rolling label ("Read More Blogs"). `navy` inverts to white with a
 * navy outline on hover; `white` is the bordered variant used on dark sections.
 */
export function PillButton({
  variant = "navy",
  className,
  children,
  ...props
}: LinkProps & { variant?: "navy" | "white" }) {
  return (
    <Link
      className={cn(
        "group block rounded-full px-[21px] py-[13px] text-center no-underline outline-navy-800 transition-colors duration-300 hover:bg-white hover:text-navy hover:outline max-md:py-2",
        variant === "navy" ? "bg-navy text-white" : "border border-line bg-white text-navy",
        className,
      )}
      {...props}
    >
      <TextRoll className="h-6 font-heading tracking-[0.4px]">{children}</TextRoll>
    </Link>
  );
}

/** Small translucent pill used on image cards ("More info"). Rolls its label on card hover. */
export function OutlinePill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-white/24 bg-[#0505051a] px-4 py-[7px] text-white",
        className,
      )}
    >
      <TextRoll className="h-6">{children}</TextRoll>
    </span>
  );
}
