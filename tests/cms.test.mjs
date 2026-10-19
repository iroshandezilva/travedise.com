// Guards for the Stacki Studio editor in studio/ (see docs/cms.md): who may edit, where
// Publish writes, and the content schema shapes the editor can show as form fields.
import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";

const editorConfig = fs.readFileSync("studio/cloudflare/wrangler.jsonc", "utf8");
const varOf = (name) => editorConfig.match(new RegExp(`"${name}":\\s*"([^"]*)"`))?.[1];

describe("CMS editor config", () => {
  it("only lets repository collaborators edit", () => {
    // "github" would let anyone with a GitHub account edit and publish the shared draft.
    assert.equal(varOf("EDITOR_ACCESS"), "repository");
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
