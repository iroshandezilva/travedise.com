const collaboratorColors = [
  '#DD2590',
  '#9D25DD',
  '#DD4125',
  '#DDA025',
  '#DC6803',
  '#C425DD',
  '#25DD9A',
  '#BEDD25',
] as const;

export function presenceColor(peer: { readonly color?: number; readonly id: string }): string {
  const index = peer.color ?? [...peer.id].reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  return collaboratorColors[index % collaboratorColors.length] ?? collaboratorColors[0];
}
export function presenceTextColor(peer: { readonly color?: number; readonly id: string }): string {
  return ['#DDA025', '#BEDD25'].includes(presenceColor(peer)) ? '#000000' : '#ffffff';
}

export class PresenceColors {
  private readonly entries = new Map<string, { readonly color: number; count: number }>();
  private readonly active = new Set<number>();
  acquire(key: string): number {
    const existing = this.entries.get(key);
    if (existing && (existing.count > 0 || !this.active.has(existing.color))) {
      existing.count++;
      this.active.add(existing.color);
      return existing.color;
    }
    let color = 0;
    while (this.active.has(color) && color < 4095) {
      color++;
    }
    if (this.entries.size >= 4096) {
      for (const [id, entry] of this.entries) {
        if (entry.count === 0) {
          this.entries.delete(id);
          break;
        }
      }
    }
    this.entries.set(key, { color, count: 1 });
    this.active.add(color);
    return color;
  }
  release(key: string) {
    const entry = this.entries.get(key);
    if (entry && entry.count > 0 && --entry.count === 0) {
      this.active.delete(entry.color);
    }
  }
}
