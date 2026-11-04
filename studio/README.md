# Astro Studio

An open-source visual CMS for Astro, with a studio at `/studio`. The editor reuses Stacki's MIT-licensed Astro parser, property schemas, icons, stylesheet, and preview morphing code. See [the attribution](vendor/stacki/PROVENANCE.md).

All authored application code, scripts, and tests are TypeScript. Features live together under `src/features`; the app composes them, and the server and Cloudflare Worker handle transport. Strict compiler checks, ESLint, formatting, and regression tests enforce the project rules in [AGENTS.md](AGENTS.md).

## Run locally

Requires Node 22.19+ and npm. This CMS lives in the Astro project’s `studio/` directory. The website’s `src/`, `public/`, and Astro configuration remain at the project root; all CMS source, tools, deployment configuration, dependencies, and local drafts live here.

```sh
# From the Astro project root:
npm ci
npm --prefix studio ci
npm run studio
```

Alternatively, run `npm run dev` from `studio/`; it opens the parent Astro project.

Open <http://localhost:4350/studio>. The editable copy lives in `studio/.studio/workspace` relative to the website root. Local development trusts loopback requests; GitHub login is enforced by the hosted Worker.

Stacki's interface sound effects are enabled by default. Open the logo menu and
toggle **Sound effects** to mute them. This browser remembers the preference and
shares it between Studio tabs. The role menu uses Phosphor's regular paint-brush
and user-circle icons (MIT; see `vendor/phosphor/LICENSE`).

The titlebar play icon opens Stacki's interactive preview across the full workspace.
Click it again or press Escape to return to editing. Links work normally, and the
editor follows the page you browsed to when you exit; the design canvas keeps its
breakpoint and size. Preview still requires the authenticated draft session.

In the code editor, Tab indents the current line or selected lines by two spaces;
Shift+Tab outdents. Press Escape followed by Tab to move focus out of the editor.
The direct `@codemirror/commands` dependency supplies the standard indentation commands.

While editing a component, open **Properties** in the left rail (shortcut **K**)
to manage its prop declarations with Stacki's controls: types, defaults, tooltips,
required/readonly flags, option lists, and ordering. Renames update supported
instances across the draft; undo/redo checks every affected source revision.
Returning to a page hides the component-only panel.

To open another existing Astro project after building:

```sh
STUDIO_WORKSPACE=.studio/my-site node dist/cli.mjs dev /absolute/path/to/site
```

The runner supports `astro.config.ts`, `.mts`, `.cts`, `.js`, `.mjs`, or `.cjs`, and projects without a config. The project should use npm and have a lockfile; the runner reuses installed dependencies when available. Tested with Astro 7.3.8. Other major versions and package managers are not yet certified.

## Available in this implementation

- Stacki-based dark editor shell with pages, navigator, components, assets, collections, AI, and settings.
- Stacki navigator, component palette, props, rich text, code and Style panels. Drag rows or components to reorder/nest, including touch dragging; double-click components to edit their source in the current page preview. Exact Stacki hover/selection outlines, icons, spacing highlights, prop dropdown hover previews, and responsive/multiple-breakpoint canvases.
- Props inferred from Astro source, including imported local types, variants, defaults, class suggestions, expression controls, and literal object/list fields. No per-component CMS schema registration.
- Yjs merged text editing, project-wide collaborator presence, live named cursors with matching selection colors, profile pictures, and continuous avatar following across pages, selections, canvas scroll, panels, and nested panel scroll positions. Click the outlined avatar again to unfollow. Your own outlines keep Stacki’s normal colors. Press `/` in the preview or choose **Cursor chat** from the Stacki logo menu to type a live message beside your cursor. The message follows your pointer and stays until you erase all its text with Backspace; Enter and Escape finish typing without clearing it. Everyone can select elements and insert children. Settings stay read-only while another editor owns the element; **Take over** in the inspector transfers editing access while keeping both selections. Per-editor text/layout/style undo, persistent draft identities, reconnection, and browser IndexedDB recovery of pending edits.
- Immediate shared previews for literal text, reordering, duplication, deletion, and supported component insertion, reconciled with server-rendered Astro. A bounded frame cache retains recent pages and prewarms hovered destinations. Enum previews use complete Astro-rendered HTML, including markup changes; numeric controls update verified CSS bindings immediately. A live iframe preview using Stacki DOM morphing. Ordinary prop/text/layout changes do not navigate the page. Astro still renders the affected preview and compiles invalidated modules; script changes or failed morphs may reload for correctness.
- New Lumos component instances receive editor-owned starter text, nested children, and Grid/Slider props without changing component field definitions.
- Cross-page copy/paste carries required component imports, asset imports, and dependent frontmatter declarations. Relative module paths are rebased for the destination, existing bindings are reused, and a single undo restores both markup and imports. Component insertion recognizes alias and relative imports of the same file.
- JSON and Markdown/frontmatter collection fields, nested values, and draggable lists. Files remain in the project.
- Shared draft asset uploads, copied into the GitHub publish snapshot.
- GitHub source updates arrive automatically every 15 seconds while editors are connected. Three-way merges preserve draft edits on conflicting lines and bring in unrelated GitHub changes. Runtime/dependency and binary changes still require a fresh container revision.
- Publish refreshes GitHub first, validates a captured snapshot using the site's build script, then commits to the configured branch. A confirmed competing commit triggers a fresh merge/build (at most three attempts); uncertain network failures are not retried. Everyone sees the same progress, including after reconnecting. Connect the branch to your Cloudflare build/deploy pipeline.
- Codex-style AI panel with saved parallel chats, per-chat model selection, browser dictation, image upload/paste/drop, and stop controls. Configurable OpenAI-compatible service with bounded context, reviewable replacements, stale-edit checks, and an explicit apply action. See [AI chat configuration](docs/ai-chat.md).
- Cloudflare Worker/GitHub login, repository collaborator access, verified GitHub profile pictures, an account/sign-out menu, an isolated preview host, a single shared Container, and R2 persistence for draft recovery. Sign-in cooldowns count down automatically; shared installation tokens and rate-limit backoff reduce redundant GitHub requests.

## Installability

The package includes a CLI, integration, editor assets, attributed source, and Cloudflare template. It has **not been published to npm**; `astro-studio-cms` is a working package name, not a claim of registry availability.

```sh
npm pack
# In a separate Astro project:
npm install /absolute/path/to/astro-studio-cms-0.1.0.tgz
npx astro-studio dev .
```

For Cloudflare, read [the deployment guide](docs/cloudflare.md). `astro-studio init-cloudflare ./studio-cloudflare` copies the deployment template into a new directory. No cloud resources are created by that command.

## Verification

Run these commands from `studio/`. Unit tests include their own source fixture. The browser suite expects the bundled homepage fixture in an isolated draft; follow the browser-check steps in [SETUP.md](../SETUP.md#8-verify-and-hand-off).

```sh
npm run verify
npm run test:browser   # requires the local studio to be running
```

The browser suite uses installed Chrome on macOS; set `CHROME_PATH` for another installation, and `STUDIO_URL` to override the local address. It exercises two independent browser sessions, preview updates without navigation, drag sorting and undo, class suggestions, and mobile layout. Screenshots go into `test-results/`.

See [architecture and current limits](docs/architecture.md) for implementation boundaries. Verify GitHub sign-in, collaboration, publishing, and recovery on your own hosted installation before giving clients access.
