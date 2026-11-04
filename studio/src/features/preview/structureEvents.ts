import { parseAction, type TreeAction } from '../source/source';
import { sourcePath, string } from '../../shared/validation';
export interface StructureEvent {
  readonly file: string;
  readonly source: string;
  readonly action: TreeAction;
  readonly token: string;
}
export class StructureEvents {
  private readonly listeners = new Set<(event: StructureEvent) => void>();
  subscribe(listener: (event: StructureEvent) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  publish(file: string, source: string, action: TreeAction, token: string) {
    for (const listener of this.listeners) {
      listener({ file, source, action, token });
    }
  }
  receive(message: Record<string, unknown>, source: string): boolean {
    if (message['type'] !== 'preview-action') {
      return false;
    }
    this.publish(
      sourcePath(message['file']),
      source,
      parseAction(message['action']),
      string(message['token'], 100),
    );
    return true;
  }
}
