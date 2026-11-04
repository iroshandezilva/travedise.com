import { serializeNodes } from '../../../vendor/stacki/electron/parse/astroSerialize';
import { actionSelection } from '../navigator/actionSelection';
import { applyEdits, structuralEdits, flatten, nodesOf, type TreeAction } from '../source/source';
import { pathFor } from '../project/previewSelection';
import { resolveImport } from '../source/imports';

export function structurePreview(source: string, file: string, action: TreeAction, token: string) {
  const edits = structuralEdits(source, action, file);
  const after = applyEdits(source, edits);
  const select = actionSelection(source, after, edits, action);
  const nodes = flatten(nodesOf(source));
  const scope = file.startsWith('src/pages/') ? '' : file + '|';
  const added = select('', true);
  const inserted = flatten(nodesOf(after)).find((node) => node.id === added);
  const html =
    action.kind === 'insert-content' &&
    inserted &&
    (inserted.kind === 'text' ||
      (inserted.kind === 'element' &&
        !/^(script|style|iframe|object|embed)$/.test(inserted.name ?? '')))
      ? serializeNodes([inserted])
      : undefined;
  const paths: Record<string, string> = {};
  for (const node of nodes) {
    if (
      !node.id ||
      (action.kind === 'delete' &&
        (node.id === action.node || node.id.startsWith(action.node + '.')))
    ) {
      continue;
    }
    const mapped =
      action.kind === 'move' && (node.id === action.node || node.id.startsWith(action.node + '.'))
        ? added + node.id.slice(action.node.length)
        : select(node.id, false);
    if (mapped) {
      paths[scope + pathFor(node.id)] = scope + pathFor(mapped);
    }
  }
  const target = 'target' in action ? action.target : '';
  const insideAnchor = nodes
    .find((node) => node.id === target)
    ?.children?.filter((child) => child.kind !== 'text' && !child.props?.['slot'])
    .at(-1)?.id;
  const parent = nodes.find((node) => node.children?.some((child) => child.id === target));
  const siblings = (parent?.children ?? nodesOf(source)).filter(
    (node) => !('node' in action) || node.id !== action.node,
  );
  const index = siblings.findIndex((node) => node.id === target);
  const placement = 'placement' in action ? (action.placement ?? 'inside') : 'after';
  const alternate = siblings[index + (placement === 'before' ? -1 : 1)]?.id;
  return {
    type: 'studio:live-structure',
    token,
    kind: action.kind,
    paths,
    node: 'node' in action ? scope + pathFor(action.node) : '',
    target: target ? scope + pathFor(target) : '',
    placement,
    added: added ? scope + pathFor(added) : '',
    insideAnchor: insideAnchor ? scope + pathFor(insideAnchor) : '',
    alternate: alternate ? scope + pathFor(alternate) : '',
    html,
    paired: action.kind === 'insert' && action.paired === true,
    component: action.kind === 'insert' ? resolveImport(file, action.importPath) : undefined,
    content: action.kind === 'insert-content' ? action.content : undefined,
  };
}
