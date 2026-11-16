// The Travedise icon drawings, in one place. `pnpm icons` writes src/assets/icons/ui/*.svg
// (24 grid, 1.5 stroke) and src/assets/icons/spot/*.svg (72 grid, 1.25 stroke). Edit a drawing
// here, never the SVG files. Rules for drawing new ones: docs/design.html#icons.
import fs from "node:fs";
import path from "node:path";
const REPO = process.argv[2] || path.resolve(import.meta.dirname, "..");
const ui = {
  "arrow-right": `<path d="M4 12h16"/><path d="M14 6l6 6-6 6"/>`,
  "arrow-left": `<path d="M20 12H4"/><path d="M10 6l-6 6 6 6"/>`,
  "arrow-up-right": `<path d="M7 17L17 7"/><path d="M8 7h9v9"/>`,
  "chevron-down": `<path d="M6 9l6 6 6-6"/>`,
  "plus": `<path d="M12 5v14"/><path d="M5 12h14"/>`,
  "minus": `<path d="M5 12h14"/>`,
  "close": `<path d="M6 6l12 12"/><path d="M18 6L6 18"/>`,
  "menu": `<path d="M4 9h16"/><path d="M4 15h16"/>`,
  "check": `<path d="M5 12.5l4.5 4.5L19 7"/>`,
  "search": `<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>`,
  "phone": `<path d="M6.5 4h3l1.5 4-2 1.2a10 10 0 0 0 5.8 5.8l1.2-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z"/>`,
  "chat": `<path d="M12 4a8 8 0 0 1 0 16c-1.3 0-2.6-.3-3.7-.9L4 20l.9-4.3A8 8 0 0 1 12 4z"/><path d="M9 12h.01"/><path d="M12 12h.01"/><path d="M15 12h.01"/>`,
  "mail": `<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>`,
  "pin": `<path d="M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0c0 5.5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.25"/>`,
  "calendar": `<rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M3.5 10h17"/><path d="M8 3.5v4"/><path d="M16 3.5v4"/>`,
  "clock": `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  "people": `<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M15.5 14.3a4.5 4.5 0 0 1 5 4.7"/>`,
  "car": `<path d="M3.5 16v-3.5l2-5a2 2 0 0 1 1.9-1.3h9.2a2 2 0 0 1 1.9 1.3l2 5V16"/><path d="M3.5 16h17"/><path d="M5.5 12h13"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>`,
  "plane": `<path d="M12 3.5c.8 0 1.4.7 1.4 1.5v5l6.6 4v1.8l-6.6-2v4.4l2 1.5v1.6L12 20.3l-3.4 1v-1.6l2-1.5v-4.4l-6.6 2V14l6.6-4V5c0-.8.6-1.5 1.4-1.5z"/>`,
  "sun": `<circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v2"/><path d="M12 18.5v2"/><path d="M3.5 12h2"/><path d="M18.5 12h2"/><path d="M6 6l1.4 1.4"/><path d="M16.6 16.6L18 18"/><path d="M6 18l1.4-1.4"/><path d="M16.6 7.4L18 6"/>`,
  "info": `<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><path d="M12 8h.01"/>`,
  "play": `<path d="M9.5 7.2v9.6a.6.6 0 0 0 .9.5l7.2-4.8a.6.6 0 0 0 0-1l-7.2-4.8a.6.6 0 0 0-.9.5z"/>`,
};
const spot = {
  "compass": { label: "Local knowledge", d: `<circle cx="36" cy="36" r="22"/><path d="M36 19l6.5 17L36 53l-6.5-17z"/><path d="M36 36h.01"/>` },
  "coast": { label: "The coast", d: `<path d="M24 38a12 12 0 0 1 24 0"/><path d="M36 15v5"/><path d="M21.5 21.5l3.5 3.5"/><path d="M50.5 21.5L47 25"/><path d="M15 38h5"/><path d="M52 38h5"/><path d="M15 46q3.5-3.5 7 0t7 0 7 0 7 0 7 0 7 0"/><path d="M15 54q3.5-3.5 7 0t7 0 7 0 7 0 7 0 7 0"/>` },
  "hills": { label: "Hill country", d: `<circle cx="50" cy="21" r="5"/><path d="M10 45q12-14 24-7t28-8"/><path d="M10 53q14-8 28-3t24-3"/><path d="M14 60q14-6 28-2t20-2" stroke-dasharray="0.01 4"/>` },
  "wildlife": { label: "Wildlife", d: `<path d="M26 51c0-7 4.5-12 10-12s10 5 10 12c0 3.6-3 5-5.6 4-1.6-.6-2.8-1-4.4-1s-2.8.4-4.4 1c-2.6 1-5.6-.4-5.6-4z"/><ellipse cx="24" cy="34" rx="3.4" ry="4.4" transform="rotate(-20 24 34)"/><ellipse cx="31.5" cy="27" rx="3.4" ry="4.4" transform="rotate(-6 31.5 27)"/><ellipse cx="40.5" cy="27" rx="3.4" ry="4.4" transform="rotate(6 40.5 27)"/><ellipse cx="48" cy="34" rx="3.4" ry="4.4" transform="rotate(20 48 34)"/>` },
  "culture": { label: "Culture", d: `<path d="M16 55h40"/><path d="M21 55c0-10.5 6.7-18 15-18s15 7.5 15 18"/><path d="M31.5 37v-5h9v5"/><path d="M34 32l2-17 2 17"/>` },
  "route": { label: "Tailor-made", d: `<circle cx="18" cy="53" r="3"/><path d="M21 53c10 0 7-15 17-15s8-10 10-13" stroke-dasharray="0.01 5"/><path d="M54 28s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z"/><path d="M54 18h.01"/>` },
  "support": { label: "Support", d: `<path d="M14 21a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22l-6 5v-5.5a4 4 0 0 1-2-3.5z"/><path d="M58 38a4 4 0 0 0-4-4H36a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h14l6 5v-5.5a4 4 0 0 0 2-3.5z"/><path d="M22 26h.01"/><path d="M27 26h.01"/><path d="M32 26h.01"/><path d="M40 43h.01"/><path d="M45 43h.01"/><path d="M50 43h.01"/>` },
  "rings": { label: "Weddings", d: `<circle cx="29" cy="42" r="12"/><circle cx="43" cy="42" r="12"/><path d="M26 25l3-4 3 4-3 3z"/>` },
  "group": { label: "Groups", d: `<circle cx="36" cy="25" r="5.5"/><path d="M25 50a11 11 0 0 1 22 0"/><circle cx="20" cy="31" r="4.5"/><path d="M11 52a9 9 0 0 1 12.5-8.3"/><circle cx="52" cy="31" r="4.5"/><path d="M61 52a9 9 0 0 0-12.5-8.3"/>` },
  "vehicle": { label: "Vehicles", d: `<path d="M10 48V38l6-12h22l5 12h15a3 3 0 0 1 3 3v7"/><path d="M10 48h6.5"/><path d="M26.5 48h18"/><path d="M54.5 48H61"/><path d="M17.5 30H33v8H13.5z"/><circle cx="21.5" cy="48" r="5"/><circle cx="49.5" cy="48" r="5"/>` },
  "season": { label: "When to go", d: `<rect x="15" y="19" width="42" height="37" rx="4"/><path d="M15 29h42"/><path d="M25 14v9"/><path d="M47 14v9"/><circle cx="36" cy="42" r="5"/><path d="M36 33.5v1.5"/><path d="M36 49v1.5"/><path d="M27.5 42H29"/><path d="M43 42h1.5"/>` },
};
const w = (dir, name, body, size, sw) => fs.writeFileSync(path.join(dir, `${name}.svg`),
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`);
const uiDir = path.join(REPO, "src/assets/icons/ui"), spDir = path.join(REPO, "src/assets/icons/spot");
fs.mkdirSync(uiDir, { recursive: true }); fs.mkdirSync(spDir, { recursive: true });
for (const [n, b] of Object.entries(ui)) w(uiDir, n, b, 24, 1.5);
for (const [n, { d }] of Object.entries(spot)) w(spDir, n, d, 72, 1.25);
fs.writeFileSync(path.join(REPO, "src/assets/icons/spot/labels.json"), JSON.stringify(Object.fromEntries(Object.entries(spot).map(([k, v]) => [k, v.label])), null, 1) + "\n");
console.log(Object.keys(ui).length, "ui,", Object.keys(spot).length, "spot");
