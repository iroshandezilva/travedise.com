# Stacki source

`src/editor/frontmatterMove.ts` was added unchanged from revision
`b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`. Cross-page clipboard insertion uses
its subtree dependency discovery. Studio carries the needed frontmatter declarations
and imports as source-range insertions, rebases relative module paths, and commits
the markup and bindings together through shared draft history.

Project insertion uses upstream `defaultSlotInline` from `astroComponentApi.ts`
and follows `appNodeEdits.ts`: seed a text-context default slot with "Text";
leave structural wrappers and components with their own defaults self-closing.

Studio's titlebar play button reuses PreviewIcon and the titlebar/preview-mode styles.
Its interactive workspace overlay, Escape exit, and return to the browsed page follow
AppShell.tsx and appShortcuts.ts from revision `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`,
adapted to authenticated browser preview URLs and checked frame messages.

InsertSearch, astroAssets, and insertTarget were added from Stacki revision
`b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`. Studio uses the original palette,
search ranking, styles, and placement rules. Its adapter forwards browser and
preview shortcuts and commits source-range insertions through shared draft history.
The insert-content defaults follow that revision's pageGestures and nodeFactory.

Selected MIT-licensed modules copied from Stacki revision `ea6bf73d796dacfc6ae16baf62ec459720520607`.
The copyright holder is credited by the public account name flowtricks in LICENSE; the MIT license terms are retained. These modules supply Astro parsing, prop schemas, preview morphing, icons, and desktop styling.

Studio adapts `morphClient.ts` to read an inert server-rendered baseline embedded in the initial response. This prevents edits during slow script loading from being skipped by the first DOM diff. Authored HTML 404 responses are accepted as renderings so the error-page preview can morph without reloading. The upstream fetch fallback and three-tree patch behavior are retained.
Studio also accepts server-rendered HTML pushed through the authenticated Vite preview
socket. This avoids a second browser/server round trip for prop previews. Queued renders
are coalesced by URL, stale results are discarded, and the existing fetch path recovers
when push delivery is unavailable. Runtime DOM state still uses the three-tree morph.

Navigator/structure, component palette, property and rich-text controls, Style panel,
CodeMirror, preview toolbar/sizing/canvas, outline renderer and measurement dependencies
were added from Stacki revision `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`.
The original global stylesheet and icon components provide the hover/selected treatments.

Browser adaptations replace Electron asset/style IPC with authenticated Studio routes,
use `navigator.platform` for shortcuts, add accessible expand/collapse labels and stable
drop-zone attributes, and forward source invalidation to breakpoint frames using the
preview origin. `usePreviewSizing.ts` is extracted from the upstream viewport module.
Studio-owned adapters preserve source ranges, connect Yjs undo and style commands,
provide touch dragging, and render collaborator overlays alongside Stacki’s own outlines.

The Style panel's file-list hook uses Studio's bounded startup retries and explicit
retry action, retaining loaded sources through temporary network failures. Concurrent
stylesheet reads share in-flight HTTP requests. Selector matching, chip rendering,
selection and filters remain the upstream implementation.

PageSwitcher, pageOrder and pageTree were added from the same `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`
revision. PageSwitcher adds browser accessibility labels and narrow-window positioning.
Studio's rail, page tree, asset browser and inspector use the upstream CSS and icons;
asset thumbnails use the existing authenticated browser asset adapter. File sessions
retain shell state while preserving separate collaboration lifecycles.
The extracted preview sizing hook accepts app-owned dimensions so custom canvas
width and height survive file switches along with the chosen breakpoint.

CodePanel and codePanelModel were added from the same `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`
revision. Studio supplies the located source model and shared selection, retaining
Stacki's source emphasis, scrolling, code-to-canvas selection and component links.
Studio enables CodeMirror's standard Tab/Shift+Tab indentation binding in the shared
CodeEditor, retaining Escape followed by Tab to move keyboard focus out of the editor.

Studio's component-entry selection follows `src/app/model/nodeFactory.ts` from the
same revision: select the layout body or descend through transparent wrappers to
rendered markup. Existing upstream frameRegions tracking restricts selection and
inspector queries to the opened instance while the page iframe remains mounted.

CodeWindow and codeWindowTarget were imported from the same revision. Studio
connects Enter, navigator double-click and the inspector's Edit code action to
the floating editor, applying frontmatter/raw-block edits to the shared draft.
The window has an accessible dialog name and focuses the code on opening.

The Variables panel, sheet, controls, grouping/parser/editing engine, MoreMenu,
useListReorder and coalescedRun were added from the same revision. Browser adapters
replace Electron IPC and CSS notifications. The engine's filesystem calls operate
on bounded request-local snapshots; Studio checks source versions before committing
edits through shared draft rooms. The scan covers Studio-editable source under src
and public. Variable history uses relative Studio paths and its existing undo stack.
Undo/redo compare every expected stylesheet before restoring a batch, so newer
collaborator changes are preserved. Sparse table cells accept JSON null values.

The AssetsPanel, assetPaths, assetPanelBridge and ConfirmDialog were added from
`b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`. The panel retains upstream markup and
styling; browser file inputs and File drops replace Electron's native paths.
Authenticated draft routes handle folder creation, uploads, rename, move and delete.
Deletion wording describes draft removal rather than the desktop Bin. Studio's
storage cleanup controls are available in the account menu.

The component hover renderer (`electron/previewServer/componentPreview.ts`) was
added unchanged from `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`. Studio registers
its generated dev route and metadata plugin. PalettePanel accepts an optional
URL resolver for Studio's authenticated preview host. At the user's request,
Studio opens the card immediately on hover with a loading state until rendering
finishes. Sample inputs, card dimensions, fitting, and suppression of empty
components retain upstream behavior.

Studio's component counts and usage popup reuse `instancesIn` from the upstream
componentUsage module. A bounded Studio scan supplies relative draft paths and
refreshes counts after source changes; the instance buttons and usage list retain
Stacki's markup, styling, ordering, and current-page selection behavior.
The count row reserves its final height while loading to prevent layout shifts.

The component Properties panel, its field controls, save guard, window-return
watcher, property definition/rename engine and consumer import resolution were
added from `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`. The panel retains upstream
markup, styles, type/default controls, declaration details and reorder gestures.
`propertyPlan.ts` extracts the upstream batch planner; Studio replaces Electron
IPC and document actors with authenticated draft routes and serialized shared-room
commits. Source revisions are checked before writes, failed batches are rolled
back, and bounded server-side undo tokens restore only unchanged revisions.

PageSwitcher consumes Escape when closing its menu, so Studio's component-back
shortcut does not also navigate away on the same keypress.

Style-panel browser parity was audited against the same upstream checkout. The
complete `src/features/style` tree is retained, including selector provenance
colors, all property sections, query/context editing, CSS editing, variable
connections, popovers, scrubbing, layer operations, and declaration provenance.
`src/editor/classAttr.ts` and `electron/preload/frameStyleSources.ts` were added
unchanged. Studio's style-query target lookup follows `frameQueries.ts`, using
marker runs, focused instances, and text-parent fallback. Browser adapters carry
rendered classes, inherited-style sources, modifier keys, and canvas-ready/cache
notifications. Background thumbnails translate the virtual project prefix into
authenticated asset URLs. Style writes compare the exact originating document
version; failed source reads remain errors instead of becoming empty stylesheets.
The browser source inventory recognizes CSS/SCSS/Sass/Less and global Astro styles
within Studio's editable `src` and `public` roots. `scripts/auditStyleParity.ts`
reports upstream differences in the StylePanel runtime dependency graph.

The CMS panel, collection sheet/settings/field controls, Astro content editor,
collection parsers, source writers, format adapters, schema workers, and supporting
handler modules were added from `b8594ed7ab13868deb1d5f6f7a6b34a185e8f121`.
Studio replaces Electron IPC with authenticated HTTP and runs upstream handlers in
bounded temporary snapshots. Writes, creates, deletes and renames are committed
through shared draft rooms after source revision checks, with batch recovery.
Content-loader paths are restricted to editable project source. Field types and
deletion inventory live in reserved source data files so cloud restarts preserve
them. The UI retains upstream desktop markup; phone sheets stack list and details.
Pending content edits flush when switching entries or closing a collection, and
CMS undo checks its expected data before replacing a collaborator's content.
Module discovery includes general-only exported settings throughout `src`, such
as `src/consts.ts`, instead of restricting those modules to `src/data`. Existing
content filtering keeps executable-only modules out of the panel.

`smol-toml` is the upstream TOML parser used by its source-preserving format adapter.
Node has no TOML parser. This small runtime dependency keeps TOML entries editable
with the same supported formats as Stacki instead of introducing a second parser.

Studio's switchable Client editing mode adds an optional `clientMode` to the
structure panel/tree: frontmatter and root drop gaps are omitted, the layout
cannot be dragged, and its destructive context-menu actions are disabled.
Context-menu items now expose their disabled state to assistive technology.
The new `CodeAccess` context defaults to full access upstream; Studio disables it
in Client mode so code/expression editors and data-binding code controls do not
mount. Plain string property inputs remain editable. Studio's role store and
command policies protect component entry, source boundaries and Designer undo
history. This is a local role preview, not an authentication or server permission.

The Style panel's background rebuild hooks retain the last complete scan when a
browser stylesheet read fails and throttle failed retries. Computed-style and color
hooks use Studio's `useStableStyleValue` to retain the last answer for the same
selection/property during cache invalidation, preventing fields and swatches from
flashing fallback values during live editing. A new selection or property does not
inherit another target's answer; settled replies still replace or clear old values.

Studio adapts deletion selection to prefer the previous sibling, then the next sibling,
then the parent, and uses upstream `insertTargetFor` for both palette insertion paths. Source-offset remapping keeps
positional parser IDs attached to the same collaborator selections after mutations.
The existing PropsPanel slot dropdown now receives the direct parent's scanned slots.
`astroComponentApi` additionally recognizes Lumos's `tag: Tag = "h2"` destructuring
from Astro.props for root-tag nesting rules and default text-slot detection.

Class suggestions and class-family menus use Stacki's `popupBox` placement rule
through Studio's `useClassPopup` adapter. They render in a body portal, open above
when needed, cap their scrollable height to the viewport, and reposition on panel
scroll, window resize, and mobile keyboard changes. Keyboard-highlighted class
suggestions scroll into view.

Studio adds a prop-preview context to the vendored dropdown/property controls so enum
hover previews can use complete Astro renderings without writing source. Its morph
adapter accepts optimistic text/structure baselines before authoritative rendering
and reconciles them through the existing three-tree morph. Lumos instance recipes
are implemented in Studio-owned insertion code, leaving component prop definitions
and upstream generic insertion defaults intact.
