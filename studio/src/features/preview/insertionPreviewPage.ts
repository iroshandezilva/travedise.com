import { access } from 'node:fs/promises';
import path from 'node:path';
import { insertionComponents, defaultInstance } from '../source/instanceDefaults';
import { serializeNodes } from '../../../vendor/stacki/electron/parse/astroSerialize';

// Render the exact same instance recipes used by source insertion. This dev-only
// page does not change the project's components or their field defaults.
export async function insertionPreviewPage(root: string): Promise<string> {
  const available: string[] = [];
  for (const file of insertionComponents) {
    try {
      await access(path.join(root, file));
      available.push(file);
    } catch {
      /* Optional library component. */
    }
  }
  const imports = new Map<string, string>();
  const recipes: string[] = [];
  const known: string[] = [];
  for (const file of available) {
    try {
      const node = defaultInstance(file, (child) => {
        if (!available.includes(child)) {
          throw new Error('Incomplete insertion recipe');
        }
        const name = imports.get(child) ?? 'Insertion' + imports.size;
        imports.set(child, name);
        return name;
      });
      if (node) {
        recipes.push(`{selected === ${JSON.stringify('/' + file)} && (${serializeNodes([node])})}`);
        known.push('/' + file);
      }
    } catch {
      /* A partial library can still render its independent components. */
    }
  }
  return `---
export const prerender = false;
${[...imports].map(([file, name]) => `import ${name} from ${JSON.stringify('/' + file)};`).join('\n')}
const modules = import.meta.glob('/src/components/**/*.astro');
const requested = Astro.url.searchParams.get('p') || '';
const selected = Object.keys(modules).find((file) => file === '/' + requested);
const known = ${JSON.stringify(known)};
if (!selected) { Astro.response.status = 404; }
const Component = selected && !known.includes(selected) ? (await modules[selected]()).default : null;
const paired = Astro.url.searchParams.get('paired') === '1';
---
<html><head><meta charset="utf-8" /></head><body>
<div id="studio-insertion-template">
${recipes.join('\n')}
{Component && (paired ? <Component>Text</Component> : <Component />)}

</div></body></html>`;
}
