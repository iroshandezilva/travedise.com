// Shared helpers for the Tailwind refactor tooling (deleted at cleanup).
import { chromium } from "playwright";

export const REF = process.env.REF_URL ?? "http://localhost:4100";

export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) out[key] = true;
      else (out[key] = next), i++;
    } else out._.push(a);
  }
  return out;
}

export const widthsArg = (v, d = "1440,991,767,390") => String(v ?? d).split(",").map(Number);

export async function launch() {
  const browser = await chromium.launch();
  return browser;
}

/** A page that blocks third-party noise (live chat, analytics) so renders are stable. */
export async function openPage(browser, url, width, height = 900) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  await context.route("**/*", (route) => {
    const u = route.request().url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1)/.test(u) || u.startsWith("data:")) return route.continue();
    if (/fonts\.(googleapis|gstatic)\.com/.test(u)) return route.continue();
    return route.abort();
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return { page, context };
}

/** Scroll through the whole page so scroll-into-view reveals fire, then return to top. */
export async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
  });
  // Reveals run ~1s; let them finish before snapping back up.
  await page.waitForTimeout(1500);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(800);
}
