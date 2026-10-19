import type { Peer } from '../collaboration/presence';
import type { Session } from '../auth/useSession';
import { AccountMenu } from '../auth/AccountMenu';
import { Avatar } from '../auth/Avatar';
import type { Project } from './projectClient';
import { PublishButton } from '../publishing/PublishButton';
import type { SharedDocument } from '../collaboration/useDocument';
import { presenceUsers } from '../collaboration/presenceUsers';
import { presenceColor, presenceTextColor } from '../collaboration/presenceColors';
import PageSwitcher from '../../../vendor/stacki/src/features/pages/PageSwitcher';
import { routeFor } from './projectClient';
import { useComponentBack } from './useComponentBack';
import { useEditorRole } from '../roles/useEditorRole';
import { PreviewButton, type InteractivePreviewState } from '../preview/InteractivePreview';
import type { CursorChatControls } from '../collaboration/CursorChatButton';
import { sameCollaborator, type FollowTarget } from '../collaboration/useFollow';
interface HeaderProps {
  readonly followTarget: FollowTarget | undefined;
  readonly cursorChat: CursorChatControls;
  readonly interactivePreview: InteractivePreviewState;
  readonly session: Session | undefined;
  readonly follow: (peer: Peer) => void;
  readonly project: Project;
  readonly file: string;
  readonly previewFile: string;
  readonly open: (file: string) => void;
  readonly document: SharedDocument | undefined;
  readonly report: (error: unknown) => void;
}

export function EditorHeader({
  project,
  file,
  previewFile,
  open,
  document,
  report,
  follow,
  session,
  interactivePreview,
  cursorChat,
  followTarget,
}: HeaderProps) {
  const role = useEditorRole();
  const pages = pageOptions(project);
  const componentOpen = !file.startsWith('src/pages/') && file.endsWith('.astro');
  const back = componentBack(document, previewFile, open, report);
  useComponentBack(componentOpen && !interactivePreview.active, back);
  const switcher = (
    <PageSwitcher
      pages={pages}
      currentPage={pages.find((page) => page.path === previewFile)}
      onSelect={(page) => open(page.path)}
    />
  );
  return (
    <header className={`titlebar studio-titlebar ${componentOpen ? 'component-open' : ''}`}>
      <div className="studio-titlebar-start">
        <AccountMenu
          saved={document?.status === 'Saved'}
          session={session}
          cursorChat={cursorChat}
        />
        <span className="project-name">{project.name}</span>
        <span className="draft-chip">Draft</span>
        {role === 'client' && <span className="client-role-badge">Client</span>}
        {componentOpen && switcher}
      </div>
      <div className="studio-titlebar-center">
        {componentOpen ? (
          <button
            className="page-switch-btn comp-back"
            onClick={back}
            title="Back to page"
            aria-keyshortcuts="Escape"
          >
            <span>←</span>
            <span className="page-switch-label">{file.split('/').at(-1)}</span>
          </button>
        ) : (
          switcher
        )}
      </div>
      <div className="studio-titlebar-end">
        <Collaborators
          document={document}
          session={session}
          follow={follow}
          target={followTarget}
        />
        <span className="save-state">{document?.status ?? 'Connecting'}</span>
        <PreviewButton preview={interactivePreview} />
        <PublishButton report={report} />
      </div>
    </header>
  );
}

function componentBack(
  document: SharedDocument | undefined,
  previewFile: string,
  open: HeaderProps['open'],
  report: HeaderProps['report'],
) {
  return () => {
    if (!document) {
      open(previewFile);
      return;
    }
    void document
      .whenSaved()
      .then(() => open(previewFile))
      .catch(report);
  };
}

function pageOptions(project: Project) {
  return project.pages.map((path) => ({
    path,
    name: path.replace(/^src\/pages\//, ''),
    route: routeFor(path),
  }));
}

function Collaborators({
  document,
  session,
  follow,
  target,
}: {
  document: SharedDocument | undefined;
  session: Session | undefined;
  follow: (peer: Peer) => void;
  target: FollowTarget | undefined;
}) {
  return (
    <div className="collaborators">
      {presenceUsers(document?.peers ?? []).map((peer) => (
        <button
          type="button"
          onClick={(event) => {
            follow(peer);
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
          disabled={
            peer.id === document?.selfId ||
            (session?.kind === 'github' && peer.githubId === session.id)
          }
          aria-label={`${target && sameCollaborator(target, peer) ? 'Stop following' : 'Follow'} ${peer.name}`}
          aria-pressed={!!target && sameCollaborator(target, peer)}
          key={peer.githubId === undefined ? `connection:${peer.id}` : `github:${peer.githubId}`}
          title={`${peer.name} · ${peer.page}${peer.selection ? ' · ' + peer.selection : ''}`}
          style={
            peer.id === document?.selfId ||
            (session?.kind === 'github' && peer.githubId === session.id)
              ? undefined
              : {
                  background: presenceColor(peer),
                  borderColor: presenceColor(peer),
                  color: presenceTextColor(peer),
                  outline:
                    target && sameCollaborator(target, peer) ? '2px solid var(--text)' : undefined,
                  outlineOffset: '3px',
                }
          }
        >
          <Avatar
            id={
              peer.githubId ??
              (session?.kind === 'github' && session.login.toLowerCase() === peer.name.toLowerCase()
                ? session.id
                : undefined)
            }
            name={peer.name}
          />
        </button>
      ))}
    </div>
  );
}
