import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** The "✦ Our Tour Activities" label above section headings. `white` is for dark backgrounds. */
export function SectionTag({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "white";
  className?: string;
}) {
  const border = tone === "white" ? "border-white/10" : "border-line";
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        tone === "white" ? "text-white" : "text-navy",
        className,
      )}
    >
      <span className={cn("flex size-9 items-center justify-center rounded-full border", border)}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
          <path
            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={cn("rounded-full border px-[15px] py-2", border)}>{children}</span>
    </div>
  );
}
