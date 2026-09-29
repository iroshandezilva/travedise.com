import Link from "next/link";
import type { ReactNode } from "react";

import type { Note } from "@/content/blog";

/** Sets the last occurrence of `em` inside `text` in italics: "Which coast, *and when*". */
export function withEmphasis(text: string, em?: string): ReactNode {
  const at = em ? text.lastIndexOf(em) : -1;
  if (!em || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="italic">{em}</em>
      {text.slice(at + em.length)}
    </>
  );
}

/**
 * A note in a grid: photo, category and reading time, title and one line. Shared by the
 * /blog grid and "Keep reading" under each post.
 */
export function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={note.href} className="group flex flex-col gap-3">
      <div className="h-[250px] w-full overflow-clip max-md:h-[220px]">
        <img
          src={note.image.src}
          alt={note.image.alt}
          loading="lazy"
          className="v2-card-img block size-full object-cover"
          style={{ objectPosition: note.image.position }}
        />
      </div>
      <div className="mt-1.5 text-[14px]/[20px] text-[#65788c]">{note.meta}</div>
      <h3 className="m-0 text-[24px]/[32px] font-semibold tracking-[-0.01em] text-v2-navy transition-colors duration-300 group-hover:text-[#344458] max-md:text-[21px]/[28px]">
        {note.title}
      </h3>
      <p className="m-0 text-[15px]/[23px] text-[#52687b]">{note.dek}</p>
    </Link>
  );
}
