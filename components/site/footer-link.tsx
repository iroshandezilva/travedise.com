"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

/**
 * A footer link that marks itself `aria-current="page"` (and renders `currentClassName`)
 * when its href is the current route — Webflow's `w--current`. `currentPath` overrides
 * the detected route (used by the preview page).
 */
export function FooterLink({
  href,
  currentPath,
  className,
  currentClassName,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  currentPath?: string;
  currentClassName?: string;
}) {
  const pathname = usePathname();
  const path = (currentPath ?? pathname ?? "").replace(/(.)\/$/, "$1");
  const current = path === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(className, current && currentClassName)}
      {...props}
    />
  );
}
