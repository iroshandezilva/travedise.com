import { cn } from "@/lib/cn";

/**
 * The faint lime wash behind the top 870px of inner pages (Webflow `div.gradient-body`).
 * Positioned against the document, so render it first inside the page wrapper and don't
 * give that wrapper `position: relative` unless it starts at the top of the page.
 */
export function PageGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-1 h-[870px] bg-[linear-gradient(#a0f7510a,#a0f75100_39.9%)]",
        className,
      )}
    />
  );
}
