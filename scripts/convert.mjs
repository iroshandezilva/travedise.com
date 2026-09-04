import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";
import { nodesToJsx } from "./lib/jsx.mjs";

const SRC = "/Users/iroshandezilva/Downloads/us.sitesucker.mac.sitesucker-pro";
const SITE = path.join(SRC, "travedise.com");
const ROOT = "/Users/iroshandezilva/dev/travedise.com";
const APP = path.join(ROOT, "app");

const assetMap = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/asset-map.json"), "utf8"));

/* ------------------------------------------------------------------ routes */

const PAGES = [
  { file: "index.html", route: "/", dir: "", name: "Home" },
  { file: "about.html", route: "/about", dir: "about", name: "About" },
  { file: "packages.html", route: "/packages", dir: "packages", name: "Packages" },
  { file: "contact.html", route: "/contact", dir: "contact", name: "Contact" },
  { file: "blog.html", route: "/blog", dir: "blog", name: "Blog" },
  { file: "faq.html", route: "/faq", dir: "faq", name: "Faq" },
];
for (const f of fs.readdirSync(path.join(SITE, "packages"))) {
  const slug = f.replace(/\.html$/, "");
  PAGES.push({
    file: `packages/${f}`,
    route: `/packages/${slug}`,
    dir: `packages/${slug}`,
    name: slug,
  });
}
for (const f of fs.readdirSync(path.join(SITE, "blog-posts"))) {
  const slug = f.replace(/\.html$/, "");
  PAGES.push({
    file: `blog-posts/${f}`,
    route: `/blog-posts/${slug}`,
    dir: `blog-posts/${slug}`,
    name: slug,
  });
}

const htmlToRoute = new Map(PAGES.map((p) => [p.file, p.route]));

/* -------------------------------------------------------------- url mapping */

function rewriteUrlFactory(pageFile) {
  const pageDir = path.dirname(path.join(SITE, pageFile));
  const unresolved = new Set();

  const rewrite = (url) => {
    if (!url) return url;

    // Webflow collection templates keep absolute CDN URLs.
    const cdn = url.match(/^https:\/\/cdn\.prod\.website-files\.com\/(.+)$/i);
    if (cdn) {
      const hit =
        assetMap[decodeURIComponent(path.basename(cdn[1]))] ?? assetMap[path.basename(cdn[1])];
      if (hit) return hit;
      unresolved.add(url);
      return url;
    }
    if (/^(https?:|data:|mailto:|tel:|#|\/)/i.test(url)) return url;

    const [pathPart, hash = ""] =
      url.split(/(?=#)/, 2).length > 1
        ? [url.slice(0, url.indexOf("#")), url.slice(url.indexOf("#"))]
        : [url, ""];

    const abs = path.normalize(path.join(pageDir, decodeURIComponent(pathPart)));
    const relToSite = path.relative(SITE, abs);

    // Another page of the site.
    if (!relToSite.startsWith("..") && relToSite.endsWith(".html")) {
      const route = htmlToRoute.get(relToSite.split(path.sep).join("/"));
      if (route) return route + hash;
    }
    // A downloaded asset.
    const hit = assetMap[path.basename(abs)];
    if (hit) return hit + hash;

    unresolved.add(url);
    return url;
  };

  rewrite.unresolved = unresolved;
  return rewrite;
}

/* ------------------------------------------------------------------- parsing */

const findOne = (node, pred) => {
  if (pred(node)) return node;
  for (const child of node.childNodes ?? []) {
    const hit = findOne(child, pred);
    if (hit) return hit;
  }
  return null;
};

const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;

function readHead(head) {
  const meta = {};
  for (const node of head.childNodes ?? []) {
    if (node.tagName === "title") meta.title = node.childNodes?.[0]?.value ?? "";
    if (node.tagName !== "meta") continue;
    const content = attr(node, "content");
    const key = attr(node, "name") ?? attr(node, "property");
    if (key && content != null) meta[key] = content;
  }
  return meta;
}

/** The executable scripts Webflow appends at the end of <body>, in load order. */
function readBodyScripts(body) {
  const out = [];
  for (const node of body.childNodes ?? []) {
    if (node.tagName !== "script") continue;
    const src = attr(node, "src");
    if (src) out.push({ src });
    else out.push({ inline: node.childNodes?.[0]?.value ?? "" });
  }
  return out;
}

const SCRIPT_URL_MAP = {
  "jquery-3.5.1.min.dc5e7f18c8﹖site=69c38c8fa6a389dfc5835058.js": "/js/jquery-3.5.1.min.js",
  "webfont.js": "/js/webfont.js",
};

function mapScriptSrc(src) {
  const base = decodeURIComponent(path.basename(src));
  if (SCRIPT_URL_MAP[base]) return SCRIPT_URL_MAP[base];
  if (src.includes("/gsap/")) return `/js/gsap/${base}`;
  return `/js/${base}`;
}

/* ------------------------------------------- URLs embedded in <script> payloads */

const EMBEDDED_URL =
  /(?:https:\/\/cdn\.prod\.website-files\.com|(?:\.\.\/)+cdn\.prod\.website-files\.com)\/[^"'\s,)\\]+/g;

const rewriteEmbeddedUrls = (text, rewriteUrl) =>
  text.replace(EMBEDDED_URL, (url) => rewriteUrl(url));

/**
 * Webflow ships two kinds of data payload inside the page: `application/json`
 * lightbox/slider manifests, and URL-encoded `text/x-wf-template` fragments for
 * nested collection lists. Both carry asset URLs that need the same rewrite.
 */
function rewriteScriptPayloads(node, rewriteUrl) {
  if (node.tagName === "script") {
    const type = attr(node, "type");
    const text = node.childNodes?.[0];
    if (text && text.nodeName === "#text") {
      if (type === "application/json") {
        text.value = rewriteEmbeddedUrls(text.value, rewriteUrl);
      } else if (type === "text/x-wf-template") {
        const decoded = rewriteEmbeddedUrls(decodeURIComponent(text.value), rewriteUrl);
        text.value = encodeURIComponent(decoded);
      }
    }
  }
  for (const child of node.childNodes ?? []) rewriteScriptPayloads(child, rewriteUrl);
}

/* ------------------------------------------------------------------ emitting */

const jsStr = (s) => JSON.stringify(s);

function metadataSource(meta, route) {
  const lines = [];
  lines.push(`  title: ${jsStr(meta.title ?? "")},`);
  if (meta.description) lines.push(`  description: ${jsStr(meta.description)},`);
  lines.push(`  alternates: { canonical: ${jsStr(route)} },`);
  const og = [];
  if (meta["og:title"]) og.push(`    title: ${jsStr(meta["og:title"])},`);
  if (meta["og:description"]) og.push(`    description: ${jsStr(meta["og:description"])},`);
  if (meta["og:type"]) og.push(`    type: ${jsStr(meta["og:type"])},`);
  if (og.length) lines.push(`  openGraph: {\n${og.join("\n")}\n  },`);
  const tw = [];
  if (meta["twitter:card"]) tw.push(`    card: ${jsStr(meta["twitter:card"])},`);
  if (meta["twitter:title"]) tw.push(`    title: ${jsStr(meta["twitter:title"])},`);
  if (meta["twitter:description"])
    tw.push(`    description: ${jsStr(meta["twitter:description"])},`);
  if (tw.length) lines.push(`  twitter: {\n${tw.join("\n")}\n  },`);
  return `export const metadata: Metadata = {\n${lines.join("\n")}\n};`;
}

const componentName = (name) =>
  name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("") + "Page";

let totalUnresolved = 0;

for (const page of PAGES) {
  const html = fs.readFileSync(path.join(SITE, page.file), "utf8");
  const doc = parse(html);
  const head = findOne(doc, (n) => n.tagName === "head");
  const body = findOne(doc, (n) => n.tagName === "body");

  const meta = readHead(head);
  const pageId =
    attr(
      findOne(doc, (n) => n.tagName === "html"),
      "data-wf-page",
    ) ?? "";
  const scripts = readBodyScripts(body).map((s) => (s.src ? { src: mapScriptSrc(s.src) } : s));
  const rewriteUrl = rewriteUrlFactory(page.file);
  rewriteScriptPayloads(body, rewriteUrl);

  // Body markup, minus the runtime <script> tags that WebflowScripts re-emits.
  const markup = nodesToJsx(
    body.childNodes.filter((n) => n.tagName !== "script"),
    { rewriteUrl },
  );

  if (rewriteUrl.unresolved.size) {
    totalUnresolved += rewriteUrl.unresolved.size;
    console.warn(`  ! ${page.file}: unresolved ${[...rewriteUrl.unresolved].join(", ")}`);
  }

  const outDir = path.join(APP, page.dir);
  fs.mkdirSync(outDir, { recursive: true });

  const source = `import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

${metadataSource(meta, page.route)}

const WEBFLOW_SCRIPTS: ScriptSpec[] = ${JSON.stringify(scripts, null, 2).replace(/\n/g, "\n")};

export default function ${componentName(page.name)}() {
  return (
    <>
${markup.map((m) => "      " + m).join("\n")}
      <WebflowScripts pageId="${pageId}" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(outDir, "page.tsx"), source);
  console.log(`✓ ${page.route.padEnd(42)} <- ${page.file}`);
}

console.log(totalUnresolved ? `\n${totalUnresolved} unresolved URL(s)` : "\nall URLs resolved");
