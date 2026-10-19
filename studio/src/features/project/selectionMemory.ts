import * as Y from 'yjs';
import { flatten, type ParserNode } from '../source/source';
import type { SharedDocument } from '../collaboration/useDocument';

export class SelectionMemory {
  private readonly positions = new Map<
    string,
    {
      readonly position: Y.RelativePosition;
      readonly kind: ParserNode['kind'];
      readonly occurrence: number;
    }
  >();
  remember(document: SharedDocument, nodes: readonly ParserNode[]) {
    const node = flatten(nodes).find((node) => node.id === document.selected);
    if (node?.start === undefined) {
      return;
    }
    this.positions.delete(document.file);
    this.positions.set(document.file, {
      position: Y.createRelativePositionFromTypeIndex(document.text, node.start),
      kind: node.kind,
      occurrence: document.selectedOccurrence,
    });
    if (this.positions.size > 100) {
      const first = this.positions.keys().next().value;
      if (first) {
        this.positions.delete(first);
      }
    }
  }
  restore(document: SharedDocument, nodes: readonly ParserNode[]) {
    const saved = this.positions.get(document.file);
    if (!saved) {
      return;
    }
    const position = Y.createAbsolutePositionFromRelativePosition(saved.position, document.doc);
    const node =
      position?.type === document.text
        ? flatten(nodes).find((node) => node.start === position.index && node.kind === saved.kind)
        : undefined;
    return node ? { id: node.id, occurrence: saved.occurrence } : undefined;
  }
}
