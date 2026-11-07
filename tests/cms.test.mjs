// Guards for the Stacki Studio editor in studio/ (see docs/cms.md): who may edit, where
// Publish writes, and the content schema shapes the editor can show as form fields.
import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";

const editorConfig = fs.readFileSync("studio/cloudflare/wrangler.jsonc", "utf8");
const varOf = (name) => editorConfig.match(new RegExp(`"${name}":\\s*"([^"]*)"`))?.[1];

describe("CMS editor config", () => {
  it("only lets the listed GitHub accounts edit", () => {
    // "github" would let anyone with a GitHub account edit and publish the shared draft, and
    // "repository" would need editors to have Write access (which also lets them merge PRs).
    assert.equal(varOf("EDITOR_ACCESS"), "allowlist");
    const ids =
      varOf("EDITOR_GITHUB_IDS")
        ?.split(",")
        .map((id) => id.trim()) ?? [];
    assert.ok(ids.length > 0, "EDITOR_GITHUB_IDS lists at least one editor");
    for (const id of ids) assert.match(id, /^\d+$/, "EDITOR_GITHUB_IDS holds numeric GitHub IDs");
    assert.ok(ids.includes("55875936"), "the owner can always sign in");
  });

  it("serves the editor at travedise.com/studio with its preview on a sibling subdomain", () => {
    assert.equal(varOf("STUDIO_ORIGIN"), "https://travedise.com");
    assert.equal(varOf("PREVIEW_ORIGIN"), "https://preview.travedise.com");
  });

  it("publishes to the cms branch, never to a protected branch", () => {
    assert.equal(varOf("GITHUB_BRANCH"), "cms");
    assert.equal(varOf("GITHUB_REPOSITORY"), "iroshandezilva/travedise.com");
  });
});

describe("content schema", () => {
  it("uses no z.tuple, which the editor cannot open", () => {
    // Tuples become JSON Schema `items: false` and crash the collection view; use
    // z.array(...).length(n) instead, which astro build checks the same way.
    assert.doesNotMatch(fs.readFileSync("src/content.config.ts", "utf8"), /z\.tuple\(/);
  });
});

describe("/studio on Cloudflare Pages", async () => {
  const { onRequest } = await import("../functions/studio/[[path]].js");
  const request = new Request("https://travedise.com/studio/edit", {
    headers: { Upgrade: "websocket" },
  });

  it("hands the request, unchanged, to the editor Worker", async () => {
    let seen;
    const env = { STUDIO: { fetch: async (r) => ((seen = r), new Response("editor")) } };
    assert.equal(await (await onRequest({ request, env })).text(), "editor");
    assert.equal(seen, request);
  });

  it("says the editor isn't set up yet when the binding is missing", async () => {
    const response = await onRequest({ request, env: {} });
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  });
});
