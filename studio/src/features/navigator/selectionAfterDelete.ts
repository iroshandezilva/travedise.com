import {
  findWithParent,
  isContentOnlyChild,
} from '../../../vendor/stacki/src/editor/treeSelection';
import type { TreeView } from '../../../vendor/stacki/src/editor/treeView';

// Prefer the row above the deletion. If it was the first row, keep a remaining
// sibling selected; only an empty list should fall back to its parent.
export function selectionAfterDelete(
  model: { readonly nodes: readonly TreeView[] },
  id: string,
): string | undefined {
  const found = findWithParent(model.nodes, id);
  if (!found) {
    return undefined;
  }
  const { siblings, index, parent } = found;
  const selectable = (node: TreeView, at: number) =>
    !isContentOnlyChild(node) &&
    !(node.kind === 'comment' && ['element', 'component'].includes(siblings[at + 1]?.kind ?? ''));
  const previous = siblings.slice(0, index).filter(selectable).at(-1);
  const next = siblings.find((node, at) => at > index && selectable(node, at));
  return previous?.id ?? next?.id ?? parent?.id;
}
