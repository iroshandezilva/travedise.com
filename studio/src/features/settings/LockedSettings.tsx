import type { ActionableNotice } from '../notifications/notice';
import { Avatar } from '../auth/Avatar';
import './lockedSettings.css';

export function LockedSettings({
  notice,
  report,
}: {
  readonly notice: ActionableNotice;
  readonly report: (error: unknown) => void;
}) {
  const action = notice.details.action;
  return (
    <div className="panel-section grow">
      <div className="panel-header">
        <h2>Settings</h2>
      </div>
      <div className="props-empty locked-settings">
        {notice.details.person && (
          <span className="locked-settings-avatar" aria-label={notice.details.person.name}>
            <Avatar
              key={notice.details.person.id ?? notice.details.person.name}
              {...notice.details.person}
            />
          </span>
        )}
        <p>{notice.message}</p>
        {action && (
          <button
            type="button"
            className="locked-settings-takeover"
            onClick={() => void Promise.resolve().then(action.run).catch(report)}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
