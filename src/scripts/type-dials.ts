/**
 * Heading-size dials (DialKit) for tuning the type scale on the dev site.
 * Loaded only away from travedise.com (see site.ts). Each heading gets a desktop size (at 1440px)
 * and a phone size (at 375px); the CSS token is rebuilt as a fluid clamp() between the two.
 * Values persist in this browser; the panel's Copy button gives the numbers to send back.
 */
import { createDialKit, createDialRoot } from "dialkit/vanilla";
// Linked at runtime: a plain CSS import would be hoisted into every page's <head>.
import panelCss from "dialkit/vanilla/styles.css?url";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = panelCss;
document.head.append(link);

const PHONE = 375;
const DESKTOP = 1440;

/** [token, label, desktop px, phone px] — defaults match src/styles/global.css. */
const HEADINGS = [
  ["display", "Page titles", 48, 40],
  ["hero", "Home hero line", 39.5, 32],
  ["h1", "H1", 46.5, 44],
  ["h2", "H2", 36, 28],
  ["h3", "H3", 30.5, 22.5],
  ["h4", "H4", 26, 22.5],
] as const;

const round = (n: number, d = 2) => Number(n.toFixed(d));

/** Fluid size from `phone` px at 375px wide to `desktop` px at 1440px wide. */
function fluid(desktop: number, phone: number) {
  const lo = Math.min(desktop, phone);
  const hi = Math.max(desktop, phone);
  const slope = (desktop - phone) / (DESKTOP - PHONE);
  const base = phone - slope * PHONE;
  return `clamp(${lo}px, calc(${round(base)}px + ${round(slope * 100, 3)}vw), ${hi}px)`;
}

const config: Record<string, unknown> = {};
for (const [key, label, desktop, phone] of HEADINGS) {
  config[label] = { desktop: [desktop, 12, 160, 0.5], phone: [phone, 12, 120, 0.5] };
}
config["All headings"] = {
  weight: { type: "select", options: ["300", "400"], default: "300" },
  lineHeight: [1.04, 0.85, 1.5, 0.01],
  letterSpacing: [-0.015, -0.06, 0.05, 0.001],
};

createDialRoot({ position: "bottom-left", theme: "light", defaultOpen: false });
const kit = createDialKit("Heading sizes", config as never, { id: "travedise-type", persist: true });

const root = document.documentElement.style;
kit.subscribe((v: Record<string, any>) => {
  for (const [key, label] of HEADINGS) {
    const h = v[label];
    if (h) root.setProperty(`--fs-${key}`, fluid(h.desktop, h.phone));
  }
  const all = v["All headings"];
  if (all) {
    root.setProperty("--w-head", String(all.weight));
    root.setProperty("--lh-head", String(all.lineHeight));
    root.setProperty("--ls-head", `${all.letterSpacing}em`);
  }
});
