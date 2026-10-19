import type { WebSocket } from 'ws';
import type { Peer } from './presence';
import { parseViewport, type ViewportPacket } from './viewportPresence';

export class ViewportRelay {
  private readonly positions = new Map<WebSocket, ViewportPacket>();
  private readonly pending = new Map<WebSocket, ViewportPacket>();
  private readonly timers = new Map<WebSocket, ReturnType<typeof setTimeout>>();
  constructor(
    private readonly peers: ReadonlyMap<WebSocket, Peer>,
    private readonly broadcast: (packet: ViewportPacket) => void,
  ) {}
  receive(socket: WebSocket, value: unknown) {
    const peer = this.peers.get(socket);
    if (!peer) {
      return;
    }
    this.pending.set(socket, { ...parseViewport(value), id: peer.id });
    if (!this.timers.has(socket)) {
      this.timers.set(
        socket,
        setTimeout(() => this.flush(socket), 50),
      );
    }
  }
  private flush(socket: WebSocket) {
    this.timers.delete(socket);
    const packet = this.pending.get(socket);
    this.pending.delete(socket);
    if (packet && this.peers.has(socket)) {
      this.positions.set(socket, packet);
      this.broadcast(packet);
    }
  }
  remove(socket: WebSocket) {
    clearTimeout(this.timers.get(socket));
    this.timers.delete(socket);
    this.pending.delete(socket);
    this.positions.delete(socket);
  }
  snapshot(): readonly ViewportPacket[] {
    return [...this.positions.values()];
  }
}
