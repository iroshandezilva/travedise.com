// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://travedise.com",
  // Fully static: every page is HTML at build time. The only server code is the
  // Cloudflare Pages Functions in `functions/`, which sit outside Astro.
  output: "static",
  // `about.html`, not `about/index.html` — the same files the Next.js export wrote, so
  // Cloudflare's clean URLs, `_routes.json` and the tests keep working unchanged.
  build: { format: "file" },
  trailingSlash: "never",
  integrations: [react()],
  fonts: [
    {
      // Display face — a variable font with weight and width axes; the italic is its own file.
      name: "Ragmont",
      cssVariable: "--font-ragmont",
      provider: fontProviders.local(),
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Ragmont-Variable.woff2"],
            weight: "100 900",
            style: "normal",
            stretch: "75% 150%",
          },
          {
            src: ["./src/assets/fonts/Ragmont-Variable-Italic.woff2"],
            weight: "100 900",
            style: "italic",
            stretch: "75% 150%",
          },
        ],
      },
    },
    {
      name: "Inter Tight",
      cssVariable: "--font-inter-tight",
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
