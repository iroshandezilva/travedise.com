import {
  elementsWithPath,
  resetFocusCache,
} from '../../../vendor/stacki/electron/preload/frameRegions';
import { record, string } from '../../shared/validation';
import { insertionTemplate } from './insertionTemplates';
import { remapStructure, tagInserted } from './structurePaths';

type Change = ReturnType<typeof parseChange>;
function parseChange(input: unknown) {
  const value = record(input);
  const paths = Object.fromEntries(
    Object.entries(record(value['paths']))
      .slice(0, 10000)
      .map(([from, to]) => [string(from, 1000), string(to, 1000)]),
  );
  return {
    html: typeof value['html'] === 'string' ? string(value['html'], 10000) : '',
    paired: value['paired'] === true,
    kind: string(value['kind'], 30),
    node: string(value['node'], 1000),
    target: string(value['target'], 1000),
    added: string(value['added'], 1000),
    insideAnchor: string(value['insideAnchor'], 1000),
    alternate: string(value['alternate'], 1000),
    placement: string(value['placement'], 20),
    paths,
    component: typeof value['component'] === 'string' ? string(value['component'], 500) : '',
  };
}
// Every speculative edit is reversible. Restore before Astro's three-tree morph
// so its baseline still describes the DOM it originally rendered.
export function installLiveMove() {
  const undo: (() => void)[] = [];
  let generation = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const reset = () => {
    generation++;
    clearTimeout(timer);
    for (const restore of undo.reverse()) {
      restore();
    }
    undo.length = 0;
    resetFocusCache();
  };
  const apply = (change: Change, inserted?: DocumentFragment) => {
    const restore = changeDOM(change, inserted);
    if (!restore) {
      return;
    }
    undo.push(restore);
    clearTimeout(timer);
    timer = setTimeout(reset, 10000);
  };
  document.addEventListener('studio:render-html', reset, true);
  document.addEventListener('studio:render-fallback', reset, true);
  document.addEventListener('avb:morphed', () => {
    // A fallback fetch can complete without a pushed-HTML event. Its DOM is now
    // authoritative; never roll it back later using stale speculative snapshots.
    generation++;
    clearTimeout(timer);
    undo.length = 0;
  });
  return (input: unknown) => {
    if (!input || typeof input !== 'object' || !('type' in input)) {
      return;
    }
    if (input.type === 'studio:move-reset') {
      reset();
      return;
    }
    if (input.type !== 'studio:live-structure' || undo.length >= 50) {
      return;
    }
    try {
      const change = parseChange(input);
      generation++;
      if (change.kind === 'insert') {
        const expected = generation;
        void insertionTemplate(change.component, change.paired).then((template) => {
          if (expected === generation && template) {
            apply(change, template.cloneNode(true) as DocumentFragment);
          }
        });
      } else {
        apply(change);
      }
    } catch {
      /* Unsupported structures wait for the authoritative render. */
    }
  };
}
function singleRoot(path: string) {
  if (!path) {
    return;
  }
  const elements = elementsWithPath(path);
  const roots = elements.filter(
    (element) => !elements.some((other) => other !== element && other.contains(element)),
  );
  return roots.length === 1 ? roots[0] : undefined;
}
function changeDOM(change: Change, template?: DocumentFragment): (() => void) | undefined {
  const node = singleRoot(change.node);
  if (change.kind === 'delete' && node?.parentNode) {
    const parent = node.parentNode;
    const next = node.nextSibling;
    node.remove();
    const restorePaths = remapStructure(change.paths);
    return () => {
      restorePaths();
      parent.insertBefore(node, next?.parentNode === parent ? next : null);
    };
  }
  if (change.kind === 'duplicate' && node) {
    const clone = node.cloneNode(true);
    if (!(clone instanceof Element)) {
      return;
    }
    const restorePaths = remapStructure(change.paths);
    tagInserted(clone, change.node, change.added);
    node.after(clone);
    return () => {
      clone.remove();
      restorePaths();
    };
  }
  if (change.kind === 'move' && node?.parentNode) {
    return moveNode(node, change);
  }
  if (change.kind === 'insert-content' && change.html) {
    const raw = document.createElement('template');
    raw.innerHTML = change.html;
    return insertTemplate(raw.content, change);
  }
  if (change.kind === 'insert' && template) {
    return insertTemplate(template, change);
  }
  return undefined;
}
function destination(change: Change, moving?: Element) {
  let target = singleRoot(change.target);
  let placement = change.placement;
  if (moving && target?.parentNode !== moving.parentNode && change.alternate) {
    target = singleRoot(change.alternate);
    placement = placement === 'before' ? 'after' : 'before';
  }
  if (!target || target === moving || moving?.contains(target)) {
    return;
  }
  // Slots can render into arbitrary descendants. Only a plain authored element
  // is an unambiguous inside target; component slots wait for Astro.
  if (placement === 'inside') {
    const anchor = singleRoot(change.insideAnchor);
    if (anchor?.parentNode && target.contains(anchor)) {
      return { parent: anchor.parentNode, next: anchor.nextSibling };
    }
    if (target.getAttribute('data-avb-p')?.includes('|')) {
      return;
    }
    return { parent: target, next: null };
  }
  const parent = target.parentNode;
  if (!parent || (moving && parent !== moving.parentNode)) {
    return;
  }
  return { parent, next: placement === 'before' ? target : target.nextSibling };
}
function moveNode(node: Element, change: Change) {
  const to = destination(change, node);
  const parent = node.parentNode;
  if (!to || !parent) {
    return;
  }
  const next = node.nextSibling;
  to.parent.insertBefore(node, to.next);
  const restorePaths = remapStructure(change.paths);
  return () => {
    restorePaths();
    parent.insertBefore(node, next?.parentNode === parent ? next : null);
  };
}
function insertTemplate(template: DocumentFragment, change: Change) {
  const to = destination(change);
  if (!to) {
    return;
  }
  const children = [...template.childNodes];
  const restorePaths = remapStructure(change.paths);
  for (const root of template.children) {
    tagInserted(root, '', change.added);
  }
  to.parent.insertBefore(template, to.next);
  return () => {
    for (const child of children) {
      child.parentNode?.removeChild(child);
    }
    restorePaths();
  };
}
