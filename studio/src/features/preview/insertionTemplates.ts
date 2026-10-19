import { insertionComponents } from '../source/instanceDefaults';
import { isStyleModule } from '../../../vendor/stacki/electron/previewClient/morphAssets';

const templates = new Map<string, Promise<DocumentFragment | undefined>>();
const queue: string[] = [];
let warming = false;
export function prepareInsertionTemplates(input: unknown) {
  if (
    !input ||
    typeof input !== 'object' ||
    !('type' in input) ||
    input.type !== 'studio:prepare-inserts' ||
    !('files' in input) ||
    !Array.isArray(input.files)
  ) {
    return;
  }
  for (const file of input.files.slice(0, 12)) {
    if (valid(file) && !templates.has(file) && !queue.includes(file) && queue.length < 12) {
      queue.push(file);
    }
  }
  void warm();
}
async function warm() {
  if (warming) {
    return;
  }
  warming = true;
  try {
    for (let file = queue.shift(); file; file = queue.shift()) {
      await insertionTemplate(file);
    }
  } finally {
    warming = false;
  }
}
function valid(file: unknown): file is string {
  return (
    typeof file === 'string' && /^src\/components\/[\w/-]+\.astro$/.test(file) && file.length <= 500
  );
}
export function insertionTemplate(
  file: string,
  paired = false,
): Promise<DocumentFragment | undefined> {
  if (!valid(file)) {
    return Promise.resolve(undefined);
  }
  const key = file + (paired && !insertionComponents.includes(file) ? '?paired=1' : '');
  const cached = templates.get(key);
  if (cached) {
    return cached;
  }
  if (templates.size >= 24) {
    const first = templates.keys().next().value;
    if (first) {
      templates.delete(first);
    }
  }
  const loading = load(file, paired).catch(() => undefined);
  templates.set(key, loading);
  return loading;
}
async function load(file: string, paired: boolean): Promise<DocumentFragment | undefined> {
  const response = await fetch(
    '/__studio/insert?p=' + encodeURIComponent(file) + (paired ? '&paired=1' : ''),
    {
      signal: AbortSignal.timeout(15000),
    },
  );
  if (!response.ok) {
    return;
  }
  const html = await response.text();
  if (html.length > 2000000) {
    return;
  }
  const rendered = new DOMParser().parseFromString(html, 'text/html');
  const content = rendered.getElementById('studio-insertion-template');
  if (!content?.children.length) {
    return;
  }
  preloadStyles(rendered);
  // Only styles are preloaded. Behavior scripts run with the authoritative page,
  // where their context and lifecycle match the inserted component.
  for (const script of rendered.querySelectorAll('script[src]')) {
    const src = script.getAttribute('src') ?? '';
    if (
      isStyleModule(src) &&
      ![...document.scripts].some((item) => item.getAttribute('src') === src)
    ) {
      const style = document.createElement('script');
      style.type = 'module';
      style.src = src;
      document.head.append(style);
    }
  }
  const fragment = document.createDocumentFragment();
  for (const node of [...content.childNodes]) {
    fragment.append(document.importNode(node, true));
  }
  for (const script of fragment.querySelectorAll('script')) {
    script.remove();
  }
  return fragment;
}
export function invalidateInsertionTemplates() {
  templates.clear();
  queue.length = 0;
}

function preloadStyles(rendered: Document) {
  for (const style of rendered.querySelectorAll('style[data-vite-dev-id]')) {
    const id = style.getAttribute('data-vite-dev-id');
    if (
      id &&
      ![...document.querySelectorAll('style[data-vite-dev-id]')].some(
        (current) => current.getAttribute('data-vite-dev-id') === id,
      )
    ) {
      document.head.append(document.importNode(style, true));
    }
  }
}
