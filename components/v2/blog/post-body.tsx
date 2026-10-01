import Link from "next/link";
import { Fragment } from "react";

import { LogoMark } from "@/components/v2/logo";
import { Section } from "@/components/v2/section";
import type { Block, Inline, Note } from "@/content/blog";
import { SITE_URL } from "@/lib/site";

import { ShareLinks } from "./share-links";

const P = "m-0 text-[19px]/[31px] text-pretty text-[#344458] max-md:text-[17px]/[28px]";
const H2 =
  "mt-9 mb-0 scroll-mt-10 font-display text-[34px]/[42px] font-medium tracking-[-0.005em] text-v2-navy max-md:mt-6 max-md:text-[27px]/[34px]";

function Text({ parts }: { parts: Inline[] }) {
  return parts.map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <Link
        key={i}
        href={part.href}
        className="underline decoration-v2-navy/35 underline-offset-4 hover:decoration-v2-navy"
      >
        {part.text}
      </Link>
    ),
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="m-0 text-[24px]/[36px] text-pretty text-v2-navy max-md:text-[20px]/[31px]">
          <Text parts={block.text} />
        </p>
      );
    case "p":
      return (
        <p className={P}>
          <Text parts={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={block.id} className={H2}>
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="m-0 flex list-disc flex-col gap-3 pl-6 marker:text-v2-sand">
          {block.items.map((item, i) => (
            <li key={i} className={P}>
              <Text parts={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-3 bg-v2-cream px-9 pt-8 pb-5 max-md:px-5 max-md:pt-6">
          <table className="w-full border-collapse">
            <caption className="pb-5 text-left text-[18px]/[26px] font-semibold text-v2-navy">
              {block.caption}
            </caption>
            <thead>
              <tr>
                {block.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`border-b border-v2-navy/20 pb-3.5 text-left text-[14px]/[20px] font-medium text-[#65788c] ${i === 0 ? "w-[40%]" : "w-[30%]"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([head, ...cells]) => (
                <tr key={head} className="border-b border-v2-navy/12 last:border-0">
                  <th
                    scope="row"
                    className="py-4 pr-4 text-left align-top text-[16px]/[24px] font-semibold text-v2-navy max-md:text-[14px]/[21px]"
                  >
                    {head}
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className="py-4 pr-4 align-top text-[16px]/[24px] text-[#344458] max-md:text-[14px]/[21px]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className="mx-0 mt-5 mb-4 flex flex-col gap-3.5 xl:mr-[-120px]">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="block h-[500px] w-full object-cover max-lg:h-[420px] max-md:h-[260px]"
          />
          <figcaption className="text-[14px]/[21px] text-[#65788c]">{block.caption}</figcaption>
        </figure>
      );
    case "quote":
      return (
        <blockquote className="mx-0 my-7 flex flex-col gap-[18px] py-2 max-md:my-4">
          <p className="m-0 font-display text-[36px]/[46px] font-normal tracking-[-0.005em] text-balance text-v2-navy italic max-md:text-[26px]/[34px]">
            {block.text}
          </p>
          <div aria-hidden className="h-0.5 w-14 bg-v2-sky" />
        </blockquote>
      );
    case "note":
      return (
        <aside
          aria-label={block.label}
          className="mt-3 flex flex-col gap-3 bg-v2-navy px-9 py-8 max-md:px-5 max-md:py-6"
        >
          <div className="text-[14px]/[20px] text-v2-sky">{block.label}</div>
          <p className="m-0 text-[17px]/[27px] text-v2-muted max-md:text-[16px]/[25px]">
            {block.text}
          </p>
        </aside>
      );
  }
}

/**
 * The note itself: a sticky contents-and-share column beside a 700px article, ending in
 * the byline and one next step. On tablets and phones the contents list is dropped and
 * the share buttons move under the article.
 */
export function PostBody({ note }: { note: Note }) {
  const headings = note.body.filter((b) => b.type === "h2");
  const next = note.next ?? { label: "Plan your journey", href: "/plan-your-trip" };

  return (
    <Section className="pt-[100px] pb-[110px] max-md:pt-10 max-md:pb-16">
      <div className="flex items-start gap-20 max-lg:flex-col max-lg:gap-12">
        <aside className="sticky top-10 flex w-[260px] shrink-0 flex-col gap-10 max-lg:static max-lg:order-last max-lg:w-full">
          {headings.length > 0 && (
            <nav aria-label="In this note" className="flex flex-col gap-3.5 max-lg:hidden">
              <div className="text-[14px]/[20px] text-[#65788c]">In this note</div>
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="text-[15px]/[22px] text-[#52687b] hover:text-v2-navy"
                >
                  {h.toc ?? h.text}
                </a>
              ))}
            </nav>
          )}
          <div className="flex flex-col gap-3.5 border-t border-v2-navy/12 pt-7">
            <div className="text-[14px]/[20px] text-[#65788c]">Share</div>
            <ShareLinks title={note.title} url={`${SITE_URL}${note.href}`} />
          </div>
        </aside>

        <article className="flex w-[700px] max-w-full min-w-0 shrink-0 flex-col gap-6 max-lg:w-full max-lg:max-w-[700px] max-lg:shrink max-md:gap-5">
          {note.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}

          <div className="mt-10 flex items-center justify-between gap-[30px] border-t border-v2-navy/12 pt-8 max-md:mt-6 max-md:flex-col max-md:items-start max-md:gap-6">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e9e5da]"
              >
                <LogoMark className="h-[19px] w-[28px]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[16px]/[22px] font-semibold text-v2-navy">
                  {note.author.name}
                </div>
                <div className="text-[14px]/[20px] text-[#65788c]">{note.author.role}</div>
              </div>
            </div>
            <Link
              href={next.href}
              className="flex h-14 shrink-0 items-center gap-4 rounded-full bg-v2-navy pr-1.5 pl-6 transition-transform duration-150 ease-out-quad active:scale-[0.97] motion-reduce:transition-none max-md:w-full max-md:justify-between"
            >
              <span className="text-[15px]/[20px] text-white">{next.label}</span>
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-v2-sky text-[15px] text-[#10212b]"
              >
                →
              </span>
            </Link>
          </div>
        </article>
      </div>
    </Section>
  );
}
