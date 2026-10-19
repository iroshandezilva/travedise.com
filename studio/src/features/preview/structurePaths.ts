import { regions, resetFocusCache } from '../../../vendor/stacki/electron/preload/frameRegions';

export function remapStructure(paths: Readonly<Record<string, string>>) {
  const attributes = [...document.querySelectorAll('[data-avb-p]')].map((element) => ({
    element,
    value: element.getAttribute('data-avb-p') ?? '',
  }));
  const previous = new Map(regions);
  for (const { element, value } of attributes) {
    element.setAttribute(
      'data-avb-p',
      value
        .split(' ')
        .map((path) => paths[path] ?? path)
        .join(' '),
    );
  }
  regions.clear();
  for (const [path, runs] of previous) {
    const live = runs.filter((run) => run.some((node) => node.isConnected));
    if (live.length) {
      regions.set(paths[path] ?? path, live);
    }
  }
  resetFocusCache();
  return () => {
    for (const { element, value } of attributes) {
      element.setAttribute('data-avb-p', value);
    }
    regions.clear();
    for (const [path, runs] of previous) {
      regions.set(path, runs);
    }
    resetFocusCache();
  };
}
export function tagInserted(root: Element, before: string, after: string) {
  for (const element of [root, ...root.querySelectorAll('[data-avb-p]')]) {
    const paths = (element.getAttribute('data-avb-p') ?? '').split(' ').filter(Boolean);
    element.setAttribute(
      'data-avb-p',
      paths
        .flatMap((path) => {
          if (before && (path === before || path.startsWith(before + '.'))) {
            return [after + path.slice(before.length)];
          }
          return path.includes('|') ? [path] : [];
        })
        .join(' '),
    );
    element.removeAttribute('data-avb-d');
  }
  root.setAttribute('data-avb-p', (root.getAttribute('data-avb-p') + ' ' + after).trim());
}
