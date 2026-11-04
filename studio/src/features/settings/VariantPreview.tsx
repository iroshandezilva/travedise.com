import { useLayoutEffect, useMemo, type ReactNode } from 'react';
import { PropPreviewContext } from '../../../vendor/stacki/src/features/props/PropPreviewContext';

interface Props {
  readonly file: string;
  readonly node: string;
  readonly component: string | undefined;
  readonly source: string;
  readonly children: ReactNode;
}
function send(command: object) {
  window.dispatchEvent(new CustomEvent('studio:variant-command', { detail: command }));
}
export function VariantPreview({ file, node, component, source, children }: Props) {
  const value = useMemo(
    () =>
      component
        ? {
            prepare: (prop: string, values: readonly (string | number | null)[]) =>
              send({ action: 'prepare', file, node, component, source, prop, values }),
            hover: (value: string | number | null) => send({ action: 'hover', value }),
            cancel: () => send({ action: 'cancel' }),
            commit: () => send({ action: 'commit' }),
          }
        : undefined,
    [file, node, component, source],
  );
  useLayoutEffect(() => {
    send({ action: 'reset' });
    return () => send({ action: 'reset' });
  }, [value]);
  return <PropPreviewContext.Provider value={value}>{children}</PropPreviewContext.Provider>;
}
