import fs from "node:fs";
import path from "node:path";

const SRC = "/Users/iroshandezilva/Downloads/us.sitesucker.mac.sitesucker-pro";
const SITE = path.join(SRC, "travedise.com");
const ROOT = "/Users/iroshandezilva/dev/travedise.com";
const PUB = path.join(ROOT, "public");
const SITE_ID = "69c38c8fa6a389dfc5835058";

/** URL-safe name for a file SiteSucker wrote to disk. */
const safeName = (name) =>
  name
    .replace(/﹪/g, "pct") // SiteSucker's stand-in for '%'
    .replace(/﹖/g, "q") // SiteSucker's stand-in for '?'
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const decodeEntities = (s) =>
  s
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");

/** Resolve a reference to the file SiteSucker actually wrote, trying its escapes. */
function resolveOnDisk(p) {
  const candidates = [p, decodeURIComponent(p)];
  for (const c of [...candidates]) candidates.push(c.replace(/%/g, "﹪"), c.replace(/\?/g, "﹖"));
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

const htmlFiles = [
  ...fs
    .readdirSync(SITE)
    .filter((f) => f.endsWith(".html") && f !== "_downloads.html")
    .map((f) => f),
  ...fs.readdirSync(path.join(SITE, "packages")).map((f) => `packages/${f}`),
  ...fs.readdirSync(path.join(SITE, "blog-posts")).map((f) => `blog-posts/${f}`),
];

/* Collect every asset reference across the export (including the URL-encoded
   Webflow collection templates embedded in <script> tags). */
const refs = new Set();
for (const rel of htmlFiles) {
  const file = path.join(SITE, rel);
  let html = fs.readFileSync(file, "utf8");
  for (const encoded of html.match(/%3C[^"<]+/g) ?? []) html += "\n" + decodeURIComponent(encoded);

  // Absolute CDN URLs (Webflow collection templates keep them un-relativised).
  for (const m of html.matchAll(/https:\/\/cdn\.prod\.website-files\.com\/([^"'\s,\\)]+)/g)) {
    refs.add(path.join(SRC, "cdn.prod.website-files.com", decodeURIComponent(m[1])));
  }

  for (const m of html.matchAll(/(?:src|href|srcset|data-src|poster)="([^"]*)"/g)) {
    for (const candidate of m[1].split(",")) {
      const url = decodeEntities(candidate.trim().split(/\s/)[0]);
      if (!url || /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.endsWith(".html")) continue;
      refs.add(path.normalize(path.join(path.dirname(file), url)));
    }
  }
  for (const m of html.matchAll(/url\((?:&quot;|["']?)([^"'()]+)/g)) {
    const url = decodeEntities(m[1]);
    if (/^(https?:|data:|#)/i.test(url)) continue;
    refs.add(path.normalize(path.join(path.dirname(file), url)));
  }
}

/* Assets the stylesheet asks for, resolved relative to <site-id>/css/. */
const cssSrc = path.join(SRC, "cdn.prod.website-files.com", SITE_ID, "css");
for (const f of fs.readdirSync(cssSrc)) {
  const css = fs.readFileSync(path.join(cssSrc, f), "utf8");
  for (const m of css.matchAll(/url\(\s*"([^"]*)"\s*\)/g)) {
    if (/^(data:|https?:|#)/i.test(m[1])) continue;
    refs.add(path.normalize(path.join(cssSrc, m[1])));
  }
}

/* ------------------------------------------------------------------- copying */

fs.rmSync(path.join(PUB, "assets"), { recursive: true, force: true });
fs.mkdirSync(path.join(PUB, "assets"), { recursive: true });

const map = {}; // on-disk basename (and its decoded form) -> public URL
const taken = new Map();
let missing = 0;

for (const ref of [...refs].sort()) {
  const onDisk = resolveOnDisk(ref);
  if (!onDisk) {
    console.warn(`  ! missing ${ref}`);
    missing++;
    continue;
  }

  const base = path.basename(onDisk);
  let safe = safeName(base);
  if (taken.has(safe) && taken.get(safe) !== onDisk) {
    // Different files, same sanitised name: disambiguate with the parent folder.
    safe = `${safeName(path.basename(path.dirname(onDisk)))}-${safe}`;
  }
  taken.set(safe, onDisk);

  fs.copyFileSync(onDisk, path.join(PUB, "assets", safe));
  const url = `/assets/${safe}`;
  map[base] = url;
  map[decodeURIComponent(path.basename(ref))] = url;
  map[path.basename(ref)] = url;
}

/* Stylesheet + Webflow/jQuery/GSAP runtime, kept byte-identical. */
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) {
    const p = path.join(from, f);
    if (fs.statSync(p).isFile()) fs.copyFileSync(p, path.join(to, safeName(f)));
  }
}
copyDir(cssSrc, path.join(PUB, "css"));
copyDir(path.join(SRC, "cdn.prod.website-files.com", SITE_ID, "js"), path.join(PUB, "js"));
copyDir(
  path.join(SRC, "cdn.prod.website-files.com", "gsap", "3.15.0"),
  path.join(PUB, "js", "gsap"),
);
fs.copyFileSync(
  path.join(
    SRC,
    "d3e54v103j8qbb.cloudfront.net/js",
    `jquery-3.5.1.min.dc5e7f18c8﹖site=${SITE_ID}.js`,
  ),
  path.join(PUB, "js", "jquery-3.5.1.min.js"),
);
fs.copyFileSync(
  path.join(SRC, "ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"),
  path.join(PUB, "js", "webfont.js"),
);

fs.writeFileSync(path.join(ROOT, "scripts/asset-map.json"), JSON.stringify(map, null, 2));
console.log(
  `copied ${taken.size} assets (${Object.keys(map).length} lookup keys)${missing ? `, ${missing} MISSING` : ""}`,
);
