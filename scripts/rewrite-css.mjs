import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/iroshandezilva/dev/travedise.com";
const map = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/asset-map.json"), "utf8"));
const cssDir = path.join(ROOT, "public/css");

for (const file of fs.readdirSync(cssDir)) {
  const p = path.join(cssDir, file);
  const missing = new Set();
  let rewritten = 0;

  const css = fs.readFileSync(p, "utf8").replace(/url\(\s*"([^"]*)"\s*\)/g, (whole, url) => {
    if (/^(data:|https?:|#|\/)/.test(url)) return whole;
    if (url.includes("d3e54v103j8qbb.cloudfront.net")) {
      rewritten++;
      return `url("/assets/${path.basename(url)}")`;
    }
    // The Webflow stylesheet lives in <site-id>/css/, so "../X" resolves to <site-id>/X
    const decoded = decodeURIComponent(url.replace(/^\.\.\//, ""));
    const hit = map[decoded];
    if (!hit) {
      missing.add(url);
      return whole;
    }
    rewritten++;
    return `url("${hit}")`;
  });

  fs.writeFileSync(p, css);
  console.log(
    `${file}: ${rewritten} rewritten${missing.size ? `, MISSING ${[...missing].join(", ")}` : ""}`,
  );
}
