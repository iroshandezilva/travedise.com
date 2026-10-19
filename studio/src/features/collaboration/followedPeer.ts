import type { Peer } from './presence';

// A person may reconnect or open the next page in another tab. Prefer the
// followed tab while it is present, then the latest connection for that account.
export function followedPeer(peers: readonly Peer[], target: Peer): Peer | undefined {
  const samePerson = peers.filter((peer) =>
    target.githubId === undefined
      ? (peer.participant === target.participant && !!target.participant) || peer.id === target.id
      : peer.githubId === target.githubId,
  );
  return samePerson.sort((a, b) => {
    const aTab = a.participant === target.participant && !!target.participant;
    const bTab = b.participant === target.participant && !!target.participant;
    return Number(bTab) - Number(aTab) || b.updatedAt - a.updatedAt;
  })[0];
}
