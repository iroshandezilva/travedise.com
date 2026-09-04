/**
 * Structural diff between the published Webflow HTML and the Next.js render:
 * same element tree, same attributes, same text — ignoring the URL rewrites and
 * the framework's own markers.
 */
import { parse } from "parse5";

const ORIG = "http://localhost:8111/travedise.com";
const NEXT = "http://localhost:3111";

const PAGES = [
  ["index.html", "/"],
  ["about.html", "/about"],
  ["packages.html", "/packages"],
  ["contact.html", "/contact"],
  ["blog.html", "/blog"],
  ["faq.html", "/faq"],
  ["packages/best-of-sri-lanka.html", "/packages/best-of-sri-lanka"],
  ["packages/dream-honeymoon-in-sri-lanka.html", "/packages/dream-honeymoon-in-sri-lanka"],
  ["packages/hillcountry.html", "/packages/hillcountry"],
  ["packages/scenic-sri-lanka.html", "/packages/scenic-sri-lanka"],
  ["packages/simply-srilanka.html", "/packages/simply-srilanka"],
  ["packages/wildlife-package.html", "/packages/wildlife-package"],
  [
    "blog-posts/family-friendly-destinations-that-everyone-will-love.html",
    "/blog-posts/family-friendly-destinations-that-everyone-will-love",
  ],
  [
    "blog-posts/the-ultimate-honeymoon-destination.html",
    "/blog-posts/the-ultimate-honeymoon-destination",
  ],
  [
    "blog-posts/why-2026-is-the-best-year-for-travel-and-tour.html",
    "/blog-posts/why-2026-is-the-best-year-for-travel-and-tour",
  ],
];

const IGNORED_ATTRS = new Set(["src", "href", "srcset", "data-src", "style", "poster"]);

const find = (node, pred) => {
  if (pred(node)) return node;
  for (const c of node.childNodes ?? []) {
    const hit = find(c, pred);
    if (hit) return hit;
  }
  return null;
};

/** Canonical, whitespace-insensitive outline of a subtree. */
// Asset URLs are expected to differ; compare them by filename only.
const safeDecode = (text) => {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
};

const normaliseUrls = (text) =>
  safeDecode(safeDecode(text)).replace(
    /(?:https:\/\/cdn\.prod\.website-files\.com|(?:\.\.\/)+cdn\.prod\.website-files\.com|\/assets)\/[^"'\\]*?([^/"'\\]+?)(?=\.(?:jpg|jpeg|png|webp|svg|gif|json|mp4|ttf))\.[a-z0-9]+/gi,
    (_, file) => "@" + file.replace(/[^A-Za-z0-9.]/g, ""),
  );

function outline(node, out = [], depth = 0) {
  if (node.nodeName === "#text") {
    const t = normaliseUrls(node.value).replace(/\s+/g, " ").trim();
    if (t) out.push(`${"·".repeat(depth)}"${t}"`);
    return out;
  }
  if (node.nodeName === "#comment" || node.nodeName === "#documentType") return out;

  if (node.tagName === "script") {
    const type = node.attrs?.find((a) => a.name === "type")?.value ?? "";
    // Runtime <script src> ordering is checked separately; only payloads matter here.
    if (type !== "application/json" && type !== "text/x-wf-template") return out;
  }

  const attrs = (node.attrs ?? [])
    .filter((a) => !IGNORED_ATTRS.has(a.name))
    .map((a) => `${a.name}=${a.value.replace(/\s+/g, " ").trim()}`)
    .sort()
    .join(" ");
  out.push(`${"·".repeat(depth)}<${node.tagName}${attrs ? " " + attrs : ""}>`);
  for (const c of node.childNodes ?? []) outline(c, out, depth + 1);
  return out;
}

let failures = 0;
for (const [file, route] of PAGES) {
  const [origHtml, nextHtml] = await Promise.all([
    fetch(`${ORIG}/${file}`).then((r) => r.text()),
    fetch(`${NEXT}${route}`).then((r) => r.text()),
  ]);

  const origBody = find(parse(origHtml), (n) => n.tagName === "body");
  const nextBody = find(parse(nextHtml), (n) => n.tagName === "body");
  // Next.js appends its own hidden route-announcer/overlay hosts to <body>.
  nextBody.childNodes = nextBody.childNodes.filter(
    (n) => !(n.attrs ?? []).some((a) => a.name === "hidden"),
  );

  const a = outline(origBody);
  const b = outline(nextBody);

  if (a.join("\n") === b.join("\n")) {
    console.log(`✓ ${route}  (${a.length} nodes)`);
    continue;
  }
  failures++;
  console.log(`✗ ${route}  orig=${a.length} next=${b.length}`);
  let shown = 0;
  for (let i = 0; i < Math.max(a.length, b.length) && shown < 6; i++) {
    if (a[i] !== b[i]) {
      console.log(`    @${i}\n      orig: ${a[i]}\n      next: ${b[i]}`);
      shown++;
    }
  }
}
console.log(failures ? `\n${failures} page(s) differ` : "\nall pages structurally identical");
