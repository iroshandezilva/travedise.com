import { useEffect, useRef } from 'react';
import type { Project } from '../project/projectClient';
import type { usePreview } from './usePreview';
import { insertionComponents } from '../source/instanceDefaults';
export function useInsertionTemplates(project: Project, preview: ReturnType<typeof usePreview>) {
  const current = useRef(preview);
  current.current = preview;
  const files = JSON.stringify(
    insertionComponents.filter((file) =>
      project.components.some((component) => component.file === file),
    ),
  );
  const { subscribeLoad } = preview;
  useEffect(
    () =>
      subscribeLoad(() =>
        current.current.send({
          type: 'studio:prepare-inserts',
          files: JSON.parse(files) as unknown,
        }),
      ),
    [files, preview.url, subscribeLoad],
  );
}
