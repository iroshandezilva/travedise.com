import { useEffect, useState } from 'react';
import { request } from '../project/projectClient';
import { record } from '../../shared/validation';
import { parseProfile, type GitHubProfile } from './profile';

export type Session = { readonly kind: 'local' } | (GitHubProfile & { readonly kind: 'github' });

export function useSession(report: (error: unknown) => void) {
  const [session, setSession] = useState<Session>();
  useEffect(() => {
    let active = true;
    void request('/studio/api/session')
      .then((value) => {
        const data = record(value);
        if (!active) {
          return;
        }
        if (data['kind'] === 'local') {
          setSession({ kind: 'local' });
        } else {
          setSession({ kind: 'github', ...parseProfile(data) });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          report(error);
        }
      });
    return () => {
      active = false;
    };
  }, [report]);
  return session;
}
