// Checks the static export in out/ (run `pnpm build` first): the machine-readable files and
// homepage signals that search engines and AI agents rely on.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const OUT = "out";
const SITE = "https://travedise.com";

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  throw new Error("out/ is missing — run `pnpm build` before `pnpm test`");
}

const read = (file) => fs.readFileSync(path.join(OUT, file), "utf8");

function pageRoutes(dir = OUT) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory())
      return e.name.startsWith("_next") || e.name.startsWith(".") ? [] : pageRoutes(p);
    if (!e.name.endsWith(".html") || ["404.html", "_not-found.html"].includes(e.name)) return [];
    return [
      "/" +
        path
          .relative(OUT, p)
          .replace(/\.html$/, "")
          .replace(/^index$/, ""),
    ];
  });
}

const routes = pageRoutes();
const home = read("index.html");
const text = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

describe("robots.txt", () => {
  const robots = read("robots.txt");

  it("has a wildcard group, explicit AI crawler groups and Content-Signal", () => {
    assert.match(robots, /^User-agent: \*$/m);
    for (const bot of ["GPTBot", "OAI-SearchBot", "Claude-Web", "Google-Extended", "CCBot"]) {
      assert.match(robots, new RegExp(`^User-agent: ${bot}$`, "m"));
    }
    assert.match(robots, /^Content-Signal: search=yes, ai-input=yes, ai-train=no$/m);
  });

  it("references the sitemap", () => {
    assert.match(robots, new RegExp(`^Sitemap: ${SITE}/sitemap\\.xml$`, "m"));
  });
});

describe("sitemap.xml", () => {
  const xml = read("sitemap.xml");
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);

  it("lists every page exactly once", () => {
    const locs = urls.map((u) => u.match(/<loc>(.*?)<\/loc>/)[1]).sort();
    const expected = routes.map((r) => (r === "/" ? SITE : SITE + r)).sort();
    assert.deepEqual(locs, expected);
  });

  it("gives every URL a valid lastmod", () => {
    for (const u of urls) {
      const lastmod = u.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
      assert.ok(lastmod, `missing lastmod in ${u}`);
      assert.ok(!Number.isNaN(Date.parse(lastmod)), `bad lastmod ${lastmod}`);
    }
  });
});

describe("Markdown twins and llms.txt", () => {
  it("has a Markdown file with front matter for every page", () => {
    for (const route of routes) {
      const md = read(route === "/" ? "index.md" : `${route.slice(1)}.md`);
      assert.match(md, /^---\ntitle: .+\ndescription: .+\nurl: https:\/\/travedise\.com/);
      assert.ok(md.length > 200, `${route}.md is suspiciously short`);
    }
  });

  it("llms.txt follows llmstxt.org: H1, summary, when-to-use guidance, and links that resolve", () => {
    const llms = read("llms.txt");
    assert.match(llms, /^# Travedise\n\n> /);
    assert.match(llms, /\*\*When to use Travedise:\*\*/);
    const intro = llms.slice(0, llms.indexOf("\n## "));
    assert.doesNotMatch(
      intro.split("\n").slice(1).join("\n"),
      /^#/m,
      "no headings before the first H2 section",
    );
    const links = [...llms.matchAll(/\]\((https:\/\/travedise\.com\/[^)]+)\)/g)].map((m) => m[1]);
    assert.ok(links.length >= routes.length);
    for (const link of links) {
      assert.ok(
        fs.existsSync(path.join(OUT, new URL(link).pathname)),
        `llms.txt links to missing ${link}`,
      );
    }
  });
});

describe(".well-known", () => {
  it("agent skills index matches the published SKILL.md digests", () => {
    const index = JSON.parse(read(".well-known/agent-skills/index.json"));
    assert.equal(index.$schema, "https://schemas.agentskills.io/discovery/0.2.0/schema.json");
    assert.ok(index.skills.length > 0);
    for (const skill of index.skills) {
      const file = fs.readFileSync(path.join(OUT, new URL(skill.url).pathname));
      assert.equal(
        skill.digest,
        `sha256:${crypto.createHash("sha256").update(file).digest("hex")}`,
      );
      assert.match(skill.name, /^[a-z0-9-]+$/);
      assert.equal(skill.type, "skill-md");
    }
  });

  it("ai-catalog.json entries have an identifier, type and exactly one of url/data", () => {
    const catalog = JSON.parse(read(".well-known/ai-catalog.json"));
    assert.ok(catalog.specVersion && catalog.host?.displayName && catalog.entries.length);
    for (const entry of catalog.entries) {
      assert.match(entry.identifier, /^urn:air:travedise\.com:/);
      assert.ok(entry.displayName && entry.type);
      assert.equal(("url" in entry) + ("data" in entry), 1);
      assert.ok(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5);
    }
  });
});

describe("homepage", () => {
  it("has lang, canonical, og:type and og:image", () => {
    assert.match(home, /<html lang="en"/);
    assert.match(home, /<link rel="canonical" href="https:\/\/travedise\.com"\/>/);
    assert.match(home, /<meta property="og:type" content="website"\/>/);
    assert.match(
      home,
      /<meta property="og:image" content="https:\/\/travedise\.com\/og\/travedise\.jpg"\/>/,
    );
    assert.ok(fs.existsSync(path.join(OUT, "og/travedise.jpg")));
  });

  it("has Organization JSON-LD with contact points and postal addresses", () => {
    const scripts = [
      ...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ];
    assert.equal(scripts.length, 1);
    const graph = JSON.parse(scripts[0][1])["@graph"];
    const org = graph.find((n) => [].concat(n["@type"]).includes("Organization"));
    assert.ok(org, "Organization node");
    assert.equal(org.name, "Travedise");
    assert.equal(org.url, SITE);
    assert.ok(org.contactPoint.length > 0);
    for (const point of org.contactPoint) {
      assert.equal(point["@type"], "ContactPoint");
      assert.ok(point.contactType && (point.email || point.telephone));
    }
    assert.ok(org.address.length > 0);
    for (const address of org.address) {
      assert.equal(address["@type"], "PostalAddress");
      assert.ok(address.streetAddress && address.addressLocality && address.addressCountry);
    }
    assert.ok(org.sameAs.every((u) => u.startsWith("https://")));
    assert.ok(graph.some((n) => n["@type"] === "WebSite"));
  });

  it("has one h1 first and no skipped heading levels", () => {
    const levels = [...home.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    assert.equal(levels[0], 1, "first heading is h1");
    assert.equal(levels.filter((l) => l === 1).length, 1, "exactly one h1");
    levels.reduce((prev, level) => {
      assert.ok(level <= prev + 1, `heading jumps from h${prev} to h${level}`);
      return level;
    });
  });

  it("serves meaningful content without JavaScript", () => {
    const main = home.match(/<main[^>]*>([\s\S]*)<\/main>/)[1];
    assert.ok(text(main).length > 500);
  });
});

describe("trust pages", () => {
  for (const route of ["/about", "/contact", "/privacy"]) {
    it(`${route} exists with at least 500 characters of visible text`, () => {
      const html = read(`${route.slice(1)}.html`);
      const body = html
        .match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
        .replace(/<script[\s\S]*?<\/script>/g, "");
      assert.ok(text(body).length >= 500, `${route} has ${text(body).length} characters`);
    });
  }

  it("links to the privacy policy from every page", () => {
    for (const route of routes) {
      const html = read(route === "/" ? "index.html" : `${route.slice(1)}.html`);
      assert.match(html, /href="\/privacy"/, `${route} doesn't link to /privacy`);
    }
  });
});
