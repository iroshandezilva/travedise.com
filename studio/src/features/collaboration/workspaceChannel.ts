import { string } from '../../shared/validation';
import { parseWorkspace, type WorkspaceState, type WorkspacePacket } from './workspacePresence';
export class WorkspaceChannel {
  private readonly positions = new Map<string, WorkspacePacket>();
  private readonly listeners = new Set<(packet: WorkspacePacket) => void>();
  constructor(private readonly send: (message: unknown) => void) {}
  receive(message: Record<string, unknown>): boolean {
    if (message['type'] !== 'workspace') {
      return false;
    }
    const packet = { ...parseWorkspace(message), id: string(message['id'], 100) };
    if (this.positions.size < 3000 || this.positions.has(packet.id)) {
      this.positions.set(packet.id, packet);
    }
    for (const listener of this.listeners) {
      listener(packet);
    }
    return true;
  }
  publish(state: WorkspaceState) {
    this.send({ type: 'workspace', ...parseWorkspace(state) });
  }
  subscribe(listener: (packet: WorkspacePacket) => void) {
    this.listeners.add(listener);
    for (const packet of this.positions.values()) {
      listener(packet);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }
  reset() {
    this.positions.clear();
  }
}
