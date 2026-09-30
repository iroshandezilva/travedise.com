import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** The v2 section backgrounds. Every section picks one of these three. */
export const surfaces = {
  white: "bg-white",
  cream: "bg-v2-cream",
  navy: "bg-v2-navy",
} as const;

export type Surface = keyof typeof surfaces;

/**
 * A full-width v2 section: background, vertical rhythm and the page gutter, wrapping its
 * children in the 1280px container.
 *
 * `bleed` drops the gutter on phones so a card rail inside can scroll edge to edge — the
 * rail then carries its own `px-5`.
 */
export function Section({
  surface = "white",
  bleed = false,
  className,
  innerClassName,
  children,
  ...props
}: {
  surface?: Surface;
  bleed?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "className" | "children">) {
  return (
    <section
      className={cn(
        "w-full shrink-0 gutter-v2",
        surfaces[surface],
        bleed && "overflow-clip max-md:px-0",
        className,
      )}
      {...props}
    >
      <div className={cn("container-v2", innerClassName)}>{children}</div>
    </section>
  );
}
