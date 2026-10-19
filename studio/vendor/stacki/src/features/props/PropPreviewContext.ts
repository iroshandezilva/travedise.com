import { createContext } from 'react';

export interface PropPreview {
  readonly prepare: (prop: string, values: readonly (string | number | null)[]) => void;
  readonly hover: (value: string | number | null) => void;
  readonly cancel: () => void;
  readonly commit: () => void;
}
export const PropPreviewContext = createContext<PropPreview | undefined>(undefined);
