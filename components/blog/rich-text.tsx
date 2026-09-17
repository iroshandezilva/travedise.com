import { Fragment } from "react";

import { Reveal } from "@/components/ui/reveal";
import type { RichBlock, RichInline } from "@/content/blog-posts";
import { cn } from "@/lib/cn";

/**
 * Which rich-text field is being rendered. Each Webflow field styled its elements a little
 * differently:
 * - `details` — h5 with 40px above; smaller h6; lists with a round marker image.
 * - `tips` — h5 flush on top; indented disc lists with navy links.
 * - `closing` — h5 flush on top.
 */
export type RichTextVariant = "details" | "tips" | "closing";

type Element = "h5" | "h6" | "ul" | "li";

const STYLES: Record<RichTextVariant, Record<Element, string>> = {
  details: {
    h5: "mt-10 mb-[15px] max-md:mt-[30px]",
    h6: "mt-5 mb-[15px] text-[18px]/[150%] max-md:mt-[15px] max-md:mb-2.5",
    ul: "flex list-none flex-col gap-[15px] pl-0 max-sm:gap-2.5",
    li: "bg-[url(/assets/69c38c90a6a389dfc5835283_marker.webp)] bg-size-[24px] bg-left bg-no-repeat pl-[35px] max-sm:bg-size-[16px] max-sm:bg-position-[0_15%] max-sm:pl-5",
  },
  tips: {
    h5: "mt-0 mb-5 max-md:mb-4",
    h6: "my-0",
    ul: "flex list-disc flex-col items-start justify-center gap-2 pl-5",
    li: "",
  },
  closing: {
    h5: "mt-0 mb-[15px]",
    h6: "my-0",
    ul: "list-disc pl-10",
    li: "",
  },
};

function Inline({ part }: { part: RichInline }) {
  if (typeof part === "string") return part;
  return (
    <a href={part.href} className="text-navy no-underline">
      {part.text}
    </a>
  );
}

function Block({ block, variant }: { block: RichBlock; variant: RichTextVariant }) {
  const s = STYLES[variant];
  switch (block.type) {
    case "h5":
      return <h5 className={s.h5}>{block.text}</h5>;
    case "h6":
      return <h6 className={s.h6}>{block.text}</h6>;
    case "p":
      return (
        <p className="m-0">
          {block.lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      );
    case "ul":
      return (
        <ul role="list" className={cn("my-0 overflow-hidden", s.ul)}>
          {block.items.map((parts, i) => (
            <li key={i} className={s.li}>
              {parts.map((part, j) => (
                <Inline key={j} part={part} />
              ))}
            </li>
          ))}
        </ul>
      );
  }
}

/** A post's rich-text field: a centered 608px column that fades up into view. */
export function RichText({
  blocks,
  variant,
  className,
}: {
  blocks: RichBlock[];
  variant: RichTextVariant;
  className?: string;
}) {
  return (
    <Reveal delay={100} className={cn("mx-auto w-full max-w-[608px]", className)}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} variant={variant} />
      ))}
    </Reveal>
  );
}
