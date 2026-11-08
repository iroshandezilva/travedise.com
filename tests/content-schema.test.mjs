// Guards for editing this site with the Stacki Mac app (see docs/editing-with-stacki.md):
// the things Stacki relies on to open the project and show the content as form fields.
import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

describe("Stacki can open the project", () => {
  it("starts Astro with the dev script", () => {
    // Stacki's rule: if `npm run dev` works in a terminal, the project opens.
    assert.equal(pkg.scripts?.dev, "astro dev");
  });

  it("declares the Node version Astro 7 needs", () => {
    // Astro 7 needs Node 22.12+; Stacki only asks for 18+. Without this, an old Node on the
    // app's PATH fails with a vague "could not be read" error instead of a clear one.
    assert.match(pkg.engines?.node ?? "", /^>=22(\.\d+)*/);
  });

  it("keeps npm's lockfile and Stacki's settings out of Git", () => {
    // `npm install` writes package-lock.json (the lockfile here is pnpm-lock.yaml); Stacki
    // writes .stacki/publish.json, which can point at a host this site does not deploy to.
    const ignore = fs.readFileSync(".gitignore", "utf8");
    assert.match(ignore, /^\/package-lock\.json$/m);
    assert.match(ignore, /^\/\.stacki\/$/m);
  });
});

describe("content schema", () => {
  it("declares collections where Stacki reads them", () => {
    assert.ok(fs.existsSync("src/content.config.ts"));
  });

  it("uses no z.tuple, which the editor cannot open", () => {
    // Tuples become JSON Schema `items: false` and crash the collection view; use
    // z.array(...).length(n) instead, which astro build checks the same way.
    assert.doesNotMatch(fs.readFileSync("src/content.config.ts", "utf8"), /z\.tuple\(/);
  });
});
