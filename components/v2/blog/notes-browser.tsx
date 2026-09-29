"use client";

import { useState } from "react";

import { Section } from "@/components/v2/section";
import type { Category, Note } from "@/content/blog";
import { cn } from "@/lib/cn";

import { NoteCard } from "./note-card";

const PAGE = 9;

/**
 * "Everything we have written": topic chips that filter the grid, a live count, and a
 * "More notes" button once there are more than nine to show.
 */
export function NotesBrowser({ notes, categories }: { notes: Note[]; categories: Category[] }) {
  const [topic, setTopic] = useState<Category | "All">("All");
  const [limit, setLimit] = useState(PAGE);

  const matching = notes.filter((n) => topic === "All" || n.category === topic);
  const shown = matching.slice(0, limit);

  return (
    <Section className="pt-20 pb-[110px] max-md:pt-12 max-md:pb-16">
      <div className="mb-11 flex items-end justify-between gap-15 border-b border-v2-navy/12 pb-7 max-md:mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <div className="flex flex-col gap-[22px] max-md:gap-4">
          <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
            Everything we have written.
          </h2>
          <div role="group" aria-label="Filter notes by topic" className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((label) => {
              const on = label === topic;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setTopic(label);
                    setLimit(PAGE);
                  }}
                  className={cn(
                    "h-11 cursor-pointer rounded-full border px-5 text-[15px]/[1] transition-colors duration-250 motion-reduce:transition-none max-md:h-10 max-md:px-4 max-md:text-[14px]",
                    on
                      ? "border-v2-navy bg-v2-navy text-white"
                      : "border-v2-navy/20 bg-transparent text-v2-navy hover:border-v2-navy/45",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div aria-live="polite" className="shrink-0 text-[15px]/[22px] text-[#65788c]">
          {matching.length === 1 ? "1 note" : `${matching.length} notes`}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-8 gap-y-15 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-y-10">
        {shown.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>

      {matching.length > limit && (
        <div className="mt-[72px] flex justify-center max-md:mt-12">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="flex h-15 cursor-pointer items-center gap-4 rounded-full border border-v2-navy/30 bg-transparent pr-2 pl-7 text-[16px] text-v2-navy transition-transform duration-150 ease-out-quad active:scale-[0.97] motion-reduce:transition-none"
          >
            <span>More notes</span>
            <span
              aria-hidden
              className="flex size-11 items-center justify-center rounded-full bg-v2-navy text-[16px] text-white"
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </Section>
  );
}
