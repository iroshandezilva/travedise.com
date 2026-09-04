/** Request every asset the rendered pages reference and report anything that 404s. */
const NEXT = "http://localhost:3111";
const ROUTES = [
  "/",
  "/about",
  "/packages",
  "/contact",
  "/blog",
  "/faq",
  "/packages/best-of-sri-lanka",
  "/packages/dream-honeymoon-in-sri-lanka",
  "/packages/hillcountry",
  "/packages/scenic-sri-lanka",
  "/packages/simply-srilanka",
  "/packages/wildlife-package",
  "/blog-posts/family-friendly-destinations-that-everyone-will-love",
  "/blog-posts/the-ultimate-honeymoon-destination",
  "/blog-posts/why-2026-is-the-best-year-for-travel-and-tour",
];

const urls = new Set();
for (const route of ROUTES) {
  let html = await fetch(NEXT + route).then((r) => r.text());
  for (const enc of html.match(/%3C[^"<]+/g) ?? []) {
    try {
      html += "\n" + decodeURIComponent(enc);
    } catch {}
  }
  for (const m of html.matchAll(/(?:src|href|data-src|poster)="(\/[^"]*)"/g)) urls.add(m[1]);
  for (const m of html.matchAll(/srcset="([^"]*)"/g)) {
    for (const c of m[1].split(",")) {
      const u = c.trim().split(/\s/)[0];
      if (u.startsWith("/")) urls.add(u);
    }
  }
  for (const m of html.matchAll(/url\((["']?)(\/[^"')]+)\1\)/g)) urls.add(m[2]);
  for (const m of html.matchAll(/"url":\s*"(\/[^"]+)"/g)) urls.add(m[1]);
  // Script chain + asset URLs inside the escaped RSC flight payload.
  for (const m of html.matchAll(/\\"(?:src|href)\\":\\"(\/[^\\"]+)\\"/g)) urls.add(m[1]);
}

// Everything the stylesheet pulls in, too.
const css = await fetch(NEXT + "/css/travedise-com.webflow.shared.4454c9861.css").then((r) =>
  r.text(),
);
for (const m of css.matchAll(/url\("(\/[^"]+)"\)/g)) urls.add(m[1]);

const bad = [];
await Promise.all(
  [...urls].map(async (u) => {
    const res = await fetch(NEXT + u, { method: "HEAD" });
    if (!res.ok) bad.push(`${res.status} ${u}`);
  }),
);

console.log(`checked ${urls.size} URLs`);
if (bad.length) {
  bad.sort().forEach((b) => console.log("  ✗ " + b));
  process.exitCode = 1;
} else console.log("all assets resolve");
