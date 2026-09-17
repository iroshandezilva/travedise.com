#!/usr/bin/env node
/**
 * Runs after `next build` (see package.json). Writes agent-facing files into out/:
 *
 * - `<route>.md` — Markdown of each page's <main> content (`/index.md` for the home page).
 *   functions/_middleware.js serves these for `Accept: text/markdown` requests.
 * - `llms.txt` — site summary and index of those Markdown pages (https://llmstxt.org).
 * - `.well-known/agent-skills/index.json` — skills discovery index with SHA-256 digests.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const OUT = "out";
const SITE = "https://travedise.com";

const td = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});
// Inline text chunks laid out as blocks with CSS (card labels, accordion headers) would run
// together ("Day 1KandySri Lanka's…"), so keep a space around them.
td.addRule("spans", {
  filter: (node) => ["SPAN", "DIV"].includes(node.nodeName) && node.parentNode?.nodeName !== "P",
  replacement: (content, node) =>
    td.isBlock?.(node) || node.nodeName === "DIV" ? `\n${content}\n` : ` ${content} `,
});
td.addRule("emptyListItems", {
  filter: (node) => node.nodeName === "LI" && !node.textContent.trim(),
  replacement: () => "",
});
td.addRule("buttons", {
  filter: "button",
  replacement: (content) => ` ${content.trim()} `,
});
td.addRule("links", {
  filter: (node) => node.nodeName === "A" && node.getAttribute("href"),
  replacement: (content, node) => {
    // Card links wrap headings and labels — flatten them into one line.
    const text = content
      .replace(/^#+\s*/gm, "")
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" · ");
    return text ? `[${text}](${absolute(node.getAttribute("href"))})` : "";
  },
});

// Registered last so it wins (Turndown checks the most recently added rule first): drop
// photos, icons, scripts, and aria-hidden duplicates (marquee copies, rolling button labels).
td.addRule("skip", {
  filter: (node) =>
    ["IMG", "SCRIPT", "STYLE", "NOSCRIPT", "SVG", "svg", "TEMPLATE", "DIALOG"].includes(
      node.nodeName,
    ) ||
    node.getAttribute?.("aria-hidden") === "true" ||
    node.hasAttribute?.("hidden"),
  replacement: () => "",
});

function absolute(href = "") {
  return href.startsWith("/") ? SITE + href : href;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function meta(html, re) {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : "";
}

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name.startsWith("_next") ? [] : htmlFiles(p);
    return e.name.endsWith(".html") && !["404.html", "_not-found.html"].includes(e.name) ? [p] : [];
  });
}

const pages = [];
for (const file of htmlFiles(OUT)) {
  const html = fs.readFileSync(file, "utf8");
  // A page kept out of search stays out of llms.txt too, and gets no Markdown twin:
  // these files are how agents find what we want read, not an index of every build artefact.
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;

  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1];
  if (!main) throw new Error(`${file} has no <main> — wrap the page content in <main>`);

  const route =
    "/" +
    path
      .relative(OUT, file)
      .replace(/\.html$/, "")
      .replace(/^index$/, "");
  const title = meta(html, /<title>([^<]*)<\/title>/);
  const description = meta(html, /<meta name="description" content="([^"]*)"/);
  const body = td
    .turndown(main)
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/^ (?=\S)/gm, "")
    .replace(/(\S) {2,}/g, "$1 ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    // Inactive tab panels repeat the same cards; keep the first copy of each link line.
    .split("\n")
    .filter(function (line) {
      this.seen ??= new Set();
      if (!line.startsWith("[")) return true;
      return this.seen.has(line) ? false : (this.seen.add(line), true);
    }, {})
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");

  const md = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nurl: ${SITE}${route === "/" ? "" : route}\n---\n\n${body}\n`;
  const mdPath = route === "/" ? "/index.md" : `${route}.md`;
  fs.writeFileSync(path.join(OUT, mdPath), md);
  const label =
    route === "/" ? "Home" : title.replace(/ - Travedise - Your Next Adventure Starts Here$/, "");
  pages.push({ route, mdPath, title: label, description });
}

const section = (name, filter) => {
  const items = pages.filter(filter).sort((a, b) => a.route.localeCompare(b.route));
  return `## ${name}\n\n${items.map((p) => `- [${p.title}](${SITE}${p.mdPath})`).join("\n")}\n`;
};
const llms = `# Travedise

> Travedise is a Sri Lanka tour operator with offices in Australia and Sri Lanka, offering
> tailor-made and packaged holidays — honeymoon, family, wildlife, hill country and beach tours.

**When to use Travedise:**

- A traveller wants a guided or tailor-made holiday in Sri Lanka — honeymoon, family, wildlife
  safari, hill country and tea estates, or beach — especially from Australia.
- Someone asks for a day-by-day Sri Lanka itinerary with hotels, or what a 7–11 night trip costs
  per person.
- Someone asks practical Sri Lanka travel questions: best time to visit, visas, safety, travelling
  with children, how long to stay.

Not a fit: flight bookings, destinations outside Sri Lanka, or instant online booking and payment.

**How to use this site:** every page is available as Markdown — send \`Accept: text/markdown\` or
append \`.md\` to the path (\`/index.md\` for the home page). Start with Tour packages below, then
the package page for its itinerary; answer general questions from the FAQ. Prices are per person in
USD and are starting prices. Bookings are made by contacting the team (email or phone on the Contact
page) — don't tell a traveller a booking is confirmed. There is no public API or online checkout.

${section("Main pages", (p) => !p.route.startsWith("/packages/") && !p.route.startsWith("/blog-posts/"))}
${section("Tour packages", (p) => p.route.startsWith("/packages/"))}
${section("Travel guides", (p) => p.route.startsWith("/blog-posts/"))}
## Optional

- [Sitemap](${SITE}/sitemap.xml)
- [Agent skill: trip planning](${SITE}/.well-known/agent-skills/travedise-trip-planning/SKILL.md)
`;
fs.writeFileSync(path.join(OUT, "llms.txt"), llms);

// Agent Skills Discovery index (v0.2.0) — digests must match the published files byte for byte.
const skillsDir = path.join(OUT, ".well-known/agent-skills");
const skills = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => {
    const rel = `.well-known/agent-skills/${e.name}/SKILL.md`;
    const file = fs.readFileSync(path.join(OUT, rel));
    const description =
      file
        .toString()
        .match(/^description:\s*(.+)$/m)?.[1]
        .trim() ?? "";
    return {
      name: e.name,
      type: "skill-md",
      description,
      url: `${SITE}/${rel}`,
      digest: `sha256:${crypto.createHash("sha256").update(file).digest("hex")}`,
    };
  });
fs.writeFileSync(
  path.join(skillsDir, "index.json"),
  JSON.stringify(
    { $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json", skills },
    null,
    2,
  ) + "\n",
);

console.log(`agent files: ${pages.length} markdown pages, llms.txt, ${skills.length} skill(s)`);
