/**
 * Blog post bodies as typed blocks (the Webflow CMS rich-text fields, copied verbatim).
 * Rendered by `components/blog/rich-text.tsx`; the page template is `components/blog/blog-post.tsx`.
 */

/** A zero-width joiner — Webflow's placeholder for an empty line (keeps a blank line's height). */
export const BLANK_LINE = "‍";

export type RichInline = string | { text: string; href: string };

export type RichBlock =
  | { type: "h5" | "h6"; text: string }
  /** One paragraph; `lines` are separated by line breaks. */
  | { type: "p"; lines: string[] }
  /** A bulleted list; each item is a run of text and links. */
  | { type: "ul"; items: RichInline[][] };

export type BlogImage = { src: string; srcSet?: string; sizes?: string; alt?: string };

export type BlogPostBody = {
  /** First rich-text field (Webflow `.blog-details-1`): headings, paragraphs, marker lists. */
  details: RichBlock[];
  /** The wide photo between the text fields, with its caption. The image is optional. */
  figure: { image?: BlogImage; caption: string };
  /** Second rich-text field (`.blog-details-2`): travel tips, bulleted lists with links. */
  tips?: RichBlock[];
  /** Third rich-text field (`.blog-details-3`): closing thoughts. */
  closing?: RichBlock[];
};
