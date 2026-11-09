# Astro 7

This site is built with Astro 7 (pinned to 7.3.x).
APIs differ from older Astro releases you may know: content collections use loaders
(`src/content.config.ts`, `glob()` from `astro/loaders`), Zod comes from `astro/zod`, and fonts are
configured in `astro.config.mjs` and rendered with `<Font>` from `astro:assets`. Check the
installed package (`node_modules/astro`) or https://docs.astro.build before writing code.
