import { record, string } from '../../shared/validation';

export interface ScrollPosition {
  readonly surface: string;
  readonly path: readonly number[];
  readonly left: number;
  readonly top: number;
}
const surfaces = ['left', 'right', 'workspace'];
export function parseScrollPositions(input: unknown): readonly ScrollPosition[] {
  if (!Array.isArray(input) || input.length > 256) {
    throw new Error('Invalid panel scrolls');
  }
  return input.map((item: unknown) => {
    const value = record(item);
    const surface = string(value['surface'], 20);
    const path = value['path'];
    if (!surfaces.includes(surface) || !Array.isArray(path) || path.length > 40) {
      throw new Error('Invalid panel path');
    }
    return {
      surface,
      path: path.map((part: unknown) => integer(part)),
      left: offset(value['left']),
      top: offset(value['top']),
    };
  });
}
function integer(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 10000) {
    throw new Error('Invalid panel child');
  }
  return value;
}
function offset(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 10000000) {
    throw new Error('Invalid panel scroll');
  }
  return value;
}
export function surfacePath(element: Element, root: Element): number[] {
  const path: number[] = [];
  for (
    let current: Element | null = element;
    current && current !== root;
    current = current.parentElement
  ) {
    if (!current.parentElement || path.length >= 40) {
      return [];
    }
    path.unshift([...current.parentElement.children].indexOf(current));
  }
  return path;
}
export function surfaceElement(surface: string, path: readonly number[]): Element | undefined {
  let element = document.querySelector(`[data-follow-surface="${surface}"]`) ?? undefined;
  for (const index of path) {
    element = element?.children[index];
  }
  return element;
}
export function captureScrolls(): readonly ScrollPosition[] {
  const result: ScrollPosition[] = [];
  for (const root of document.querySelectorAll('[data-follow-surface]')) {
    for (const node of [root, ...root.querySelectorAll('*')]) {
      if (node.closest('[data-follow-surface]') !== root || node.closest('.studio-center')) {
        continue;
      }
      const style = getComputedStyle(node);
      if (
        node.clientWidth > 0 &&
        node.clientHeight > 0 &&
        /(auto|scroll|hidden)/.test(style.overflowX + style.overflowY) &&
        (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth) &&
        result.length < 256
      ) {
        result.push({
          surface: root.getAttribute('data-follow-surface') ?? '',
          path: surfacePath(node, root),
          left: node.scrollLeft,
          top: node.scrollTop,
        });
      }
    }
  }
  return result;
}
export function applyScrolls(positions: readonly ScrollPosition[]) {
  for (const position of positions) {
    const node = surfaceElement(position.surface, position.path);
    if (
      node &&
      (Math.abs(node.scrollLeft - position.left) > 0.5 ||
        Math.abs(node.scrollTop - position.top) > 0.5)
    ) {
      node.scrollTo({ left: position.left, top: position.top, behavior: 'instant' });
    }
  }
}
