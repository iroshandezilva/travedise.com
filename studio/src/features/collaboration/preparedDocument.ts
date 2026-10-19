import { SharedDocument } from './useDocument';

const prepared = new Map<
  string,
  { readonly document: SharedDocument; readonly ready: Promise<void> }
>();
export function prepareDocument(file: string): Promise<void> {
  const existing = prepared.get(file);
  if (existing) {
    return existing.ready;
  }
  const document = new SharedDocument(file);
  const ready = document.whenSaved().catch((error: unknown) => {
    if (prepared.get(file)?.document === document) {
      discardDocument(file);
    }
    throw error;
  });
  prepared.set(file, { document, ready });
  return ready;
}
export function preparedDocument(file: string): SharedDocument | undefined {
  return prepared.get(file)?.document;
}
export function takeDocument(file: string): SharedDocument {
  const entry = prepared.get(file);
  prepared.delete(file);
  return entry?.document ?? new SharedDocument(file);
}
export function discardDocument(file: string) {
  prepared.get(file)?.document.close();
  prepared.delete(file);
}
