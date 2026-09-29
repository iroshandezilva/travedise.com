import Link from "next/link";

import { Section } from "@/components/v2/section";
import type { Note } from "@/content/blog";

/** The newest note, given the width of the page: photo left, the note on cream right. */
export function FeaturedNote({ note }: { note: Note }) {
  return (
    <Section className="pt-[100px] pb-[30px] max-md:pt-12 max-md:pb-2">
      <Link
        href={note.href}
        className="group flex h-[520px] items-stretch bg-v2-cream max-lg:h-auto max-lg:flex-col"
      >
        <div className="relative w-[60%] shrink-0 overflow-clip max-lg:h-[380px] max-lg:w-full max-md:h-[260px]">
          <img
            src={note.image.src}
            alt={note.image.alt}
            className="v2-card-img block size-full object-cover"
            style={{ objectPosition: note.image.position }}
          />
          <span className="absolute top-5 left-5 border border-white/24 bg-v2-navy/72 px-3.5 py-2 text-[13px]/[17px] text-white backdrop-blur-[12px] max-md:top-4 max-md:left-4">
            Latest note
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5 px-[52px] pt-[52px] pb-12 max-md:gap-3.5 max-md:px-5 max-md:pt-6 max-md:pb-6">
          <div className="text-[14px]/[20px] text-[#65788c]">{note.meta}</div>
          <h2 className="m-0 font-display text-[44px]/[52px] font-medium tracking-[-0.005em] text-v2-navy max-md:text-[30px]/[38px]">
            {note.title}
          </h2>
          <p className="m-0 text-[17px]/[27px] text-[#344458] max-md:text-[15px]/[24px]">
            {note.dek}
          </p>
          <div className="mt-auto flex items-center justify-between gap-5 max-lg:pt-4">
            <div className="text-[14px]/[20px] text-[#65788c]">
              By {note.author.name} · {note.dateLabel}
            </div>
            <span
              aria-hidden
              className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-v2-navy/25 text-[17px] text-v2-navy transition-colors duration-200 group-hover:bg-v2-navy group-hover:text-white max-md:size-11"
            >
              ↗
            </span>
          </div>
        </div>
      </Link>
    </Section>
  );
}
