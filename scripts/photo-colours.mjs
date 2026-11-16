// Reads every photo in src/data/photos.ts and writes src/data/photo-colours.json: its colour
// family, warmth, brightness, how busy it is, five main colours, and whether white text can sit
// in the bottom-left (where hero and band titles go). The image guideline in docs/design.html
// and the image-brief skill choose photos with this file. Run `pnpm photo-colours` after
// adding or replacing a photo.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = fs.readFileSync(path.join(ROOT, "src/data/photos.ts"), "utf8");
const OUT = path.join(ROOT, "src/data/photo-colours.json");

// key: own("file", …) or stock("file", …)
const ENTRIES = [...SRC.matchAll(/^\s+(\w+):\s*(own|stock)\("([^"]+)"/gm)].map(([, key, kind, file]) => ({
  key,
  file: path.join(ROOT, "src/assets", kind === "own" ? "photos" : "stock", `${file}.jpg`),
}));

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function oklab(r, g, b) {
  [r, g, b] = [r / 255, g / 255, b / 255].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function hex([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return (
    "#" +
    [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
      .map((c) => Math.round(Math.min(1, Math.max(0, gam(c))) * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}
const r2 = (n) => Math.round(n * 100) / 100;

// Five main colours: k-means in OKLab, seeded by lightness so the result never changes between runs.
function palette(px, k = 5) {
  const sorted = [...px].sort((p, q) => p[0] - q[0]);
  let cs = Array.from({ length: k }, (_, i) => sorted[Math.floor(((i + 0.5) / k) * sorted.length)].slice());
  let asg = new Array(px.length).fill(0);
  for (let it = 0; it < 12; it++) {
    for (let i = 0; i < px.length; i++) {
      let best = 0, bd = Infinity;
      for (let j = 0; j < k; j++) {
        const d = (px[i][0] - cs[j][0]) ** 2 + (px[i][1] - cs[j][1]) ** 2 + (px[i][2] - cs[j][2]) ** 2;
        if (d < bd) { bd = d; best = j; }
      }
      asg[i] = best;
    }
    cs = cs.map((c, j) => {
      const mine = px.filter((_, i) => asg[i] === j);
      return mine.length ? [0, 1, 2].map((d) => mine.reduce((s, p) => s + p[d], 0) / mine.length) : c;
    });
  }
  return cs
    .map((c, j) => ({ hex: hex(c), share: r2(asg.filter((a) => a === j).length / px.length) }))
    .filter((c) => c.share > 0)
    .sort((a, b) => b.share - a.share);
}

// Families, in the order a tie is broken: the photo's strongest colour signal wins.
//   night  — mostly dark (mean lightness under 0.33)
//   green  — forest, tea, grass: chroma at hues 95–165
//   sea    — water and sky: chroma at hues 165–275
//   dusk   — lamp light, sunsets, saturated warm reds and oranges
//   earth  — stone, sand, wood, skin, ruins: warm and low in colour
// Where the eye disagrees with the numbers, pin the family here and say why.
const PINNED = {
  templeNight: "night", // lamp-lit temple at blue hour: the sky reads as sea, the photo reads as night
  mvSunset: "dusk", // a soft sunset; too low in colour for the dusk test, but it is one
  mist: "green", // forest under morning mist: the pale mist outweighs the green in the numbers
  jeep: "earth", // a sand-coloured jeep on a dirt road; the sky tips it towards dusk
};
function family({ L, wGreen, wSea, wDusk, wEarth }) {
  if (L < 0.33) return "night";
  const w = { green: wGreen, sea: wSea, dusk: wDusk, earth: wEarth };
  return Object.entries(w).sort((a, b) => b[1] - a[1])[0][0];
}

async function measure(file) {
  const N = 64;
  const { data } = await sharp(file).resize(N, N, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = [];
  for (let i = 0; i < data.length; i += 3) px.push(oklab(data[i], data[i + 1], data[i + 2]));
  let sL = 0, sC = 0, warm = 0, cool = 0, wGreen = 0, wSea = 0, wDusk = 0, wEarth = 0, edge = 0, zone = 0, zn = 0;
  px.forEach(([L, a, b], i) => {
    const C = Math.hypot(a, b), H = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
    sL += L; sC += C;
    if (C > 0.02) {
      if (H < 110 || H >= 330) warm += C; else if (H >= 150 && H < 280) cool += C;
    }
    if (H >= 95 && H < 165 && C > 0.03) wGreen += C;
    else if (H >= 165 && H < 275 && C > 0.03) wSea += C;
    else if ((H < 75 || H >= 330) && C > 0.07) wDusk += C * 1.15;
    else if (H < 95 || H >= 330 || C <= 0.03) wEarth += Math.max(C, 0.035);
    const x = i % N, y = Math.floor(i / N);
    if (x < N - 1 && y < N - 1) edge += Math.abs(L - px[i + 1][0]) + Math.abs(L - px[i + N][0]);
    if (x < N * 0.55 && y > N * 0.55) { zone += L; zn++; }
  });
  const n = px.length, L = sL / n;
  return {
    family: family({ L, wGreen, wSea, wDusk, wEarth }),
    warmth: r2((warm - cool) / Math.max(warm + cool, 1e-6)), // −1 cool … +1 warm
    lightness: r2(L), // 0 dark … 1 light (OKLCH L)
    colourfulness: r2(Math.min(1, sC / n / 0.12)), // 0 grey … 1 vivid
    busy: r2(Math.min(1, edge / ((N - 1) * (N - 1) * 2) / 0.12)), // 0 calm … 1 busy
    textZone: r2(zone / zn), // lightness of the bottom-left 55% × 45%
    whiteText: zone / zn < 0.55, // white text there reads with the standard scrim
    colours: palette(px),
  };
}

const DOC = path.join(ROOT, "docs/design.html");
const FAMILIES = [
  ["green", "Green", "Forest, tea, grass and wildlife."],
  ["sea", "Sea and sky", "Water, reef and open sky."],
  ["earth", "Earth", "Stone, sand, wood, skin and ruins: warm and low in colour."],
  ["dusk", "Dusk and lamp light", "Sunsets and warm, saturated light."],
  ["night", "Night", "Mostly dark, lit by lamps."],
];

const out = {};
const files = {};
for (const { key, file } of ENTRIES) {
  files[key] = path.relative(path.dirname(DOC), file);
  if (!fs.existsSync(file)) throw new Error(`Missing photo for ${key}: ${path.relative(ROOT, file)}`);
  out[key] = await measure(file);
  if (PINNED[key]) out[key] = { ...out[key], family: PINNED[key], pinned: true };
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n");

// The photo sheet in docs/design.html, between the photos:start and photos:end markers.
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const sheet = FAMILIES.map(([id, name, line]) => {
  const keys = Object.keys(out).filter((k) => out[k].family === id).sort((a, b) => out[a].lightness - out[b].lightness);
  const figs = keys.map((k) => {
    const p = out[k];
    const chips = p.colours.slice(0, 5).map((c) => `<i style="background:${c.hex};flex:${c.share}"></i>`).join("");
    const notes = [`warmth ${p.warmth}`, `busy ${p.busy}`, p.whiteText ? "white text ok" : "no text on it"].join(" · ");
    return `<figure class="ph"><img src="${files[k]}" alt="" loading="lazy"><span class="chips">${chips}</span><figcaption><b>${esc(k)}</b>${p.pinned ? " (pinned)" : ""}<br>${notes}</figcaption></figure>`;
  }).join("\n      ");
  return `<div class="fam" id="fam-${id}">\n    <div class="fam-h"><h3>${name}</h3><span class="small">${line}</span><span class="cap">${keys.length} photos</span></div>\n    <div class="ph-grid">\n      ${figs}\n    </div>\n  </div>`;
}).join("\n  ");
const doc = fs.readFileSync(DOC, "utf8");
const re = /(<!-- photos:start -->)[\s\S]*?(<!-- photos:end -->)/;
if (!re.test(doc)) throw new Error("docs/design.html has no photos:start / photos:end markers");
fs.writeFileSync(DOC, doc.replace(re, `$1\n  <p class="cap">Written by <code>pnpm photo-colours</code>. Darkest first in each family.</p>\n  ${sheet}\n  $2`));
const tally = Object.values(out).reduce((t, p) => ((t[p.family] = (t[p.family] || 0) + 1), t), {});
console.log(`photo-colours: ${Object.keys(out).length} photos →`, tally);
