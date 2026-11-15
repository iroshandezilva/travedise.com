// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://travedise.com",
  // Fully static: every page is HTML at build time. The only server code is the
  // Cloudflare Pages Functions in `functions/`, which sit outside Astro.
  output: "static",
  // `about.html`, not `about/index.html`, so Cloudflare's clean URLs, `_routes.json`
  // and the tests keep working unchanged.
  build: { format: "file" },
  trailingSlash: "never",
  fonts: [
    {
      // Headings. Newsreader stands in for Nocturne Serif until a webfont licence is bought.
      name: "Newsreader",
      cssVariable: "--font-display",
      provider: fontProviders.google(),
      weights: [300, 400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
    },
    {
      name: "Schibsted Grotesk",
      cssVariable: "--font-sans",
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
    },
  ],
});
