// Keeps the Travedise Standard (docs/design.html) in step with the code: every photo has its
// colour measurements, every icon the Icon component names has a drawing, and the colour and
// motion tokens the standard documents exist in global.css.
import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";

const read = (f) => fs.readFileSync(f, "utf8");

describe("Travedise Standard", () => {
  it("every photo in photos.ts has colour measurements (run `pnpm photo-colours`)", () => {
    const keys = [...read("src/data/photos.ts").matchAll(/^\s+(\w+):\s*(?:own|stock)\("/gm)].map((m) => m[1]);
    const colours = JSON.parse(read("src/data/photo-colours.json"));
    const missing = keys.filter((k) => !colours[k]);
    assert.deepEqual(missing, [], `No colour data for: ${missing.join(", ")}`);
    for (const [k, v] of Object.entries(colours)) {
      assert.ok(["green", "sea", "earth", "dusk", "night"].includes(v.family), `${k} has family "${v.family}"`);
    }
  });

  it("every icon name in Icon.astro has an SVG (run `pnpm icons`)", () => {
    const src = read("src/components/Icon.astro");
    for (const [type, dir] of [["UiIcon", "ui"], ["SpotIcon", "spot"]]) {
      const union = src.match(new RegExp(`export type ${type} =([^;]+);`))[1];
      const names = [...union.matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
      const files = fs.readdirSync(`src/assets/icons/${dir}`).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4));
      assert.deepEqual([...names].sort(), [...files].sort(), `${type} and src/assets/icons/${dir} differ`);
    }
  });

  it("the documented tokens exist in global.css", () => {
    const css = read("src/styles/global.css");
    const tokens = ["paper", "mist", "wash", "sand", "stone", "dune", "clay", "bark", "umber", "ink", "error", "ok",
      "ease-out", "ease-in-out", "ease-drawer", "dur-press", "dur-hover", "dur-ui", "dur-sheet", "dur-reveal", "dur-settle"];
    for (const t of tokens) assert.match(css, new RegExp(`--${t}:`), `--${t} is missing from global.css`);
  });

  it("the page background is the very light paper, not pure white", () => {
    assert.match(read("src/styles/global.css"), /--paper:#FCFBF8/);
  });
});
