import { record, sourcePath, string } from '../../shared/validation';

export interface ViewportState {
  readonly page: string;
  readonly x: number;
  readonly y: number;
  readonly left?: number;
  readonly top?: number;
}
export interface ViewportPacket extends ViewportState {
  readonly id: string;
}
export function parseViewport(input: unknown): ViewportState {
  const value = record(input);
  return {
    page: sourcePath(string(value['page'])),
    x: fraction(value['x']),
    y: fraction(value['y']),
    ...(value['left'] === undefined ? {} : { left: offset(value['left']) }),
    ...(value['top'] === undefined ? {} : { top: offset(value['top']) }),
  };
}
function offset(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 10_000_000) {
    throw new Error('Invalid viewport offset');
  }
  return value;
}
function fraction(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error('Invalid viewport position');
  }
  return value;
}
export class ViewportChannel {
  private readonly positions = new Map<string, ViewportPacket>();
  private readonly listeners = new Set<(packet: ViewportPacket) => void>();
  constructor(private readonly send: (message: unknown) => void) {}
  receive(message: Record<string, unknown>): boolean {
    if (message['type'] !== 'viewport') {
      return false;
    }
    const packet = { ...parseViewport(message), id: string(message['id'], 100) };
    if (this.positions.size < 3000 || this.positions.has(packet.id)) {
      this.positions.set(packet.id, packet);
    }
    for (const listener of this.listeners) {
      listener(packet);
    }
    return true;
  }
  publish(state: ViewportState) {
    this.send({ type: 'viewport', ...parseViewport(state) });
  }
  subscribe(listener: (packet: ViewportPacket) => void) {
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
