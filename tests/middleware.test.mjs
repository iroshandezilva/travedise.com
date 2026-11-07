// Cloudflare Pages middleware: Markdown negotiation, 404s and discovery headers.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { markdownPath, onRequest } from "../functions/_middleware.js";

const PAGES = { "/index.md": "---\ntitle: Home\n---\n\n# Your Next Adventure Starts Here\n" };

function context(path, { accept = "text/html", method = "GET", htmlStatus = 200 } = {}) {
  const request = new Request(`https://travedise.com${path}`, {
    method,
    headers: { Accept: accept },
  });
  return {
    request,
    env: {
      ASSETS: {
        fetch: async (url) => {
          const body = PAGES[new URL(url).pathname];
          return body ? new Response(body) : new Response("<h1>404</h1>", { status: 404 });
        },
      },
    },
    next: async () =>
      new Response("<!doctype html><title>Travedise</title>", {
        status: htmlStatus,
        headers: { "Content-Type": "text/html; charset=utf-8", Vary: "Accept-Encoding" },
      }),
  };
}

describe("markdownPath", () => {
  it("maps routes to their Markdown twins", () => {
    assert.equal(markdownPath("/"), "/index.md");
    assert.equal(markdownPath("/packages/hillcountry"), "/packages/hillcountry.md");
    assert.equal(markdownPath("/faq/"), "/faq.md");
  });
});

describe("Accept: text/markdown", () => {
  it("returns the page as Markdown with Vary: Accept and a token estimate", async () => {
    const res = await onRequest(context("/", { accept: "text/markdown" }));
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("Content-Type"), "text/markdown; charset=utf-8");
    assert.match(res.headers.get("Vary"), /\bAccept\b/);
    assert.ok(Number(res.headers.get("x-markdown-tokens")) > 0);
    assert.match(res.headers.get("Link"), /rel="canonical"/);
    assert.match(await res.text(), /# Your Next Adventure Starts Here/);
  });

  it("matches when text/markdown is one of several accepted types", async () => {
    const res = await onRequest(context("/", { accept: "text/markdown, text/html;q=0.8" }));
    assert.equal(res.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  });

  it("returns an empty body for HEAD", async () => {
    const res = await onRequest(context("/", { accept: "text/markdown", method: "HEAD" }));
    assert.equal(res.status, 200);
    assert.equal(await res.text(), "");
  });

  it("returns a Markdown 404 for unknown pages", async () => {
    const res = await onRequest(context("/no-such-page", { accept: "text/markdown" }));
    assert.equal(res.status, 404);
    assert.equal(res.headers.get("Content-Type"), "text/markdown; charset=utf-8");
    assert.match(res.headers.get("Vary"), /\bAccept\b/);
    const body = await res.text();
    assert.ok(body.length >= 20);
    assert.match(body, /\/no-such-page/);
    assert.match(body, /https:\/\/travedise\.com\/llms\.txt/);
    assert.match(body, /https:\/\/travedise\.com\/sitemap\.xml/);
  });
});

describe("HTML responses", () => {
  it("stay HTML by default and add Vary, Content-Signal and discovery links on the home page", async () => {
    const res = await onRequest(context("/"));
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("Content-Type"), "text/html; charset=utf-8");
    assert.match(res.headers.get("Vary"), /Accept-Encoding/);
    assert.match(res.headers.get("Vary"), /\bAccept\b/);
    assert.equal(res.headers.get("Content-Signal"), "search=yes, ai-input=yes, ai-train=no");
    const link = res.headers.get("Link");
    for (const target of [
      "/index.md",
      "/llms.txt",
      "/.well-known/agent-skills/index.json",
      "/.well-known/ai-catalog.json",
      "/sitemap.xml",
    ]) {
      assert.ok(link.includes(`<${target}>`), `Link header should reference ${target}`);
    }
    assert.match(link, /rel="describedby"/);
  });

  it("only adds the home-page discovery links on /", async () => {
    const link = (await onRequest(context("/about"))).headers.get("Link");
    assert.equal(link, '</about.md>; rel="alternate"; type="text/markdown"');
  });

  it("keeps 404 pages as 404 without advertising a Markdown alternate", async () => {
    const res = await onRequest(context("/no-such-page", { htmlStatus: 404 }));
    assert.equal(res.status, 404);
    assert.equal(res.headers.get("Link"), null);
  });
});

describe("/studio", () => {
  it("is passed through untouched, even for Markdown requests", async () => {
    for (const path of ["/studio", "/studio/api/session"]) {
      const response = await onRequest(context(path, { accept: "text/markdown" }));
      assert.equal(response.headers.get("Content-Signal"), null);
      assert.match(await response.text(), /<title>Travedise<\/title>/);
    }
  });
});
