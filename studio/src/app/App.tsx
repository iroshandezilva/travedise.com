import { useEditorNavigation } from '../features/project/editorNavigation';
import { useEffect } from 'react';
import { useProjectLoad } from '../features/project/useProjectLoad';
import { BootScreen } from './BootScreen';
import { Editor } from './Editor';
import { useEditorView } from './useEditorView';
import { useSession } from '../features/auth/useSession';
import { Toast } from '../features/notifications/Toast';
import { useNotifications } from '../features/notifications/useNotifications';

export function App() {
  const view = useEditorView();
  const navigation = useEditorNavigation();
  const { message, details, performAction, report, dismiss } = useNotifications();
  useEffect(() => {
    if (navigation.error) {
      report(navigation.error);
    }
  }, [navigation.error, report]);
  const { project, refresh, attempt, failure, revision } = useProjectLoad(report);
  useEffect(() => {
    document.title = project ? `Stacki - ${project.name}` : 'Stacki';
  }, [project]);
  const session = useSession(report);
  return (
    <>
      {project ? (
        <Editor
          {...navigation}
          view={view}
          session={session}
          project={project}
          refresh={refresh}
          report={report}
        />
      ) : (
        <BootScreen
          key={revision}
          attempt={attempt}
          failure={failure}
          authenticated={!!session}
          retry={() => {
            dismiss();
            refresh();
          }}
        />
      )}
      <Toast message={message} details={details} performAction={performAction} dismiss={dismiss} />
    </>
  );
}
