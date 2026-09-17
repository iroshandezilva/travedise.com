"use client";

import { useId, useState } from "react";

import type { Highlight } from "@/content/about";
import { cn } from "@/lib/cn";

/**
 * Stack of expanding cards (Webflow tabs styled as an accordion): exactly one is open,
 * clicking another opens it instantly and closes the rest.
 */
export function AboutHighlights({ items }: { items: Highlight[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2.5">
      {items.map((item, i) => {
        const active = i === open;
        return (
          <button
            key={item.title}
            type="button"
            aria-expanded={active}
            aria-controls={`${id}-${i}`}
            onClick={() => setOpen(i)}
            className="flex w-full cursor-pointer flex-col rounded-[15px] bg-navy-800 bg-[url(/assets/69c38c90a6a389dfc583523d_Vector.webp)] bg-size-[16px] aria-expanded:bg-[url(/assets/69c38c90a6a389dfc583523e_minus.webp)] bg-position-[94%_25px] bg-no-repeat px-[25px] py-5 text-left text-white max-lg:px-4"
          >
            <span className="flex items-center justify-between">
              <span className="text-h6 font-medium">{item.title}</span>
            </span>
            <span
              id={`${id}-${i}`}
              className={cn(
                "w-full max-w-[700px] flex-col gap-5 overflow-clip max-lg:gap-4",
                active ? "flex" : "hidden",
              )}
            >
              <span className="block pt-4 text-[18px]/6 text-slate-300 max-lg:pt-3 max-md:text-base/6 max-sm:pt-[25px]">
                {item.description.map((line, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
