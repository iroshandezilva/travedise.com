#!/usr/bin/env node
/**
 * Visual diff: reference site (Webflow build) vs candidate (your Tailwind build).
 *
 *   node scripts/refactor/shots.mjs --route /faq --cand http://localhost:3201 --out /tmp/shots/faq
 *     [--cand-route /faq]            candidate path if different from --route
 *     [--sel "section.footer"]       screenshot one element on the reference…
 *     [--cand-sel "footer"]          …and this element on the candidate (defaults to --sel)
 *     [--widths 1440,991,767,390]
 *     [--hover]                      hover the element (--sel / --cand-sel) before capturing
 *
 * For every width it writes <out>/<width>/slice-NN.png: reference on the LEFT,
 * candidate on the RIGHT, cut into ~1000px-tall slices you can open with Read.
 * diff.png marks differing pixels in red. The summary line gives the mismatch %.
 */
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { REF, args, widthsArg, launch, openPage, settle } from "./lib.mjs";

const a = args();
if (!a.route || !a.cand || !a.out) {
  console.error("usage: shots.mjs --route /path --cand http://localhost:PORT --out DIR [--sel css] [--cand-sel css] [--widths ...]");
  process.exit(1);
}
const candRoute = a["cand-route"] ?? a.route;
const candSel = a["cand-sel"] ?? a.sel;
const SLICE = 1000;

async function capture(browser, url, width, sel) {
  const { page, context } = await openPage(browser, url, width);
  await settle(page);
  let buf;
  if (sel) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    if (a.hover) {
      await el.hover();
      await page.waitForTimeout(900);
    }
    buf = await el.screenshot();
  } else {
    buf = await page.screenshot({ fullPage: true, animations: "disabled" });
  }
  await context.close();
  return PNG.sync.read(buf);
}

function pad(img, w, h) {
  if (img.width === w && img.height === h) return img;
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, Math.min(img.width, w), Math.min(img.height, h), 0, 0);
  return out;
}

const browser = await launch();
for (const width of widthsArg(a.widths)) {
  const dir = path.join(a.out, String(width));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const [ref, cand] = await Promise.all([
    capture(browser, REF + a.route, width, a.sel),
    capture(browser, a.cand + candRoute, width, candSel),
  ]);
  const w = Math.max(ref.width, cand.width);
  const h = Math.max(ref.height, cand.height);
  const R = pad(ref, w, h);
  const C = pad(cand, w, h);
  const diff = new PNG({ width: w, height: h });
  const bad = pixelmatch(R.data, C.data, diff.data, w, h, { threshold: 0.15 });
  fs.writeFileSync(path.join(dir, "diff.png"), PNG.sync.write(diff));

  const gap = 12;
  for (let y = 0, i = 0; y < h; y += SLICE, i++) {
    const sh = Math.min(SLICE, h - y);
    const side = new PNG({ width: w * 2 + gap, height: sh });
    side.data.fill(0);
    for (let p = 3; p < side.data.length; p += 4) side.data[p] = 255;
    PNG.bitblt(R, side, 0, y, w, sh, 0, 0);
    PNG.bitblt(C, side, 0, y, w, sh, w + gap, 0);
    fs.writeFileSync(path.join(dir, `slice-${String(i).padStart(2, "0")}.png`), PNG.sync.write(side));
  }
  const pct = ((bad / (w * h)) * 100).toFixed(2);
  console.log(
    `${width}px  mismatch ${pct}%  ref ${ref.width}x${ref.height}  cand ${cand.width}x${cand.height}` +
      (ref.height !== cand.height ? `  (height off by ${cand.height - ref.height}px)` : "") +
      `  → ${dir}`,
  );
}
await browser.close();
