import { record, string } from '../../shared/validation';
import { parseScrollPositions, surfaceElement, surfacePath } from './workspaceScroll';

export interface Disclosure {
  readonly surface: string;
  readonly path: readonly number[];
  readonly kind: 'details' | 'button' | 'tree';
  readonly node: string;
  readonly open: boolean;
}
export function parseDisclosures(input: unknown): readonly Disclosure[] {
  if (input === undefined) {
    return [];
  }
  if (!Array.isArray(input) || input.length > 256) {
    throw new Error('Invalid panel disclosures');
  }
  return input.map((item: unknown) => {
    const value = record(item);
    const position = parseScrollPositions([{ ...value, left: 0, top: 0 }])[0];
    const kind = value['kind'];
    if (!position || (kind !== 'details' && kind !== 'button' && kind !== 'tree')) {
      throw new Error('Invalid panel disclosure');
    }
    return {
      surface: position.surface,
      path: position.path,
      kind,
      node: string(value['node'] ?? '', 500),
      open: value['open'] === true,
    };
  });
}
export function captureDisclosures(): readonly Disclosure[] {
  const result: Disclosure[] = [];
  for (const root of document.querySelectorAll('[data-follow-surface]')) {
    for (const element of root.querySelectorAll(
      'details, button[aria-expanded], .structure-node',
    )) {
      if (element.closest('[data-follow-surface]') !== root || result.length >= 256) {
        continue;
      }
      const state = disclosureState(element);
      if (!state) {
        continue;
      }
      result.push({
        surface: root.getAttribute('data-follow-surface') ?? '',
        path: surfacePath(element, root),
        node: element.getAttribute('data-node-id') ?? '',
        ...state,
      });
    }
  }
  return result;
}
export function applyDisclosures(states: readonly Disclosure[]) {
  for (const state of states) {
    const element =
      state.kind === 'tree'
        ? [...document.querySelectorAll('.studio-navigator .structure-node')].find(
            (node) => node.getAttribute('data-node-id') === state.node,
          )
        : surfaceElement(state.surface, state.path);
    if (!element) {
      continue;
    }
    const current = disclosureState(element);
    if (!current || current.kind !== state.kind || current.open === state.open) {
      continue;
    }
    if (element instanceof HTMLDetailsElement) {
      element.open = state.open;
    } else if (state.kind === 'tree') {
      element.querySelector<HTMLElement>('.drag-handle')?.click();
    } else if (element instanceof HTMLButtonElement) {
      element.click();
    }
  }
}
function disclosureState(element: Element): Pick<Disclosure, 'kind' | 'open'> | undefined {
  if (element instanceof HTMLDetailsElement) {
    return { kind: 'details', open: element.open };
  }
  if (element.matches('button[aria-expanded]')) {
    return { kind: 'button', open: element.getAttribute('aria-expanded') === 'true' };
  }
  const path = element.querySelector('.drag-handle svg path')?.getAttribute('d');
  if (path === 'm4 6 4 4 4-4' || path === 'm6 4 4 4-4 4') {
    return { kind: 'tree', open: path === 'm4 6 4 4 4-4' };
  }
  return undefined;
}
