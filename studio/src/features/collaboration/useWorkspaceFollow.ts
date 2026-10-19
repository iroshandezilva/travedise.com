import { captureDisclosures, applyDisclosures } from './workspaceDisclosures';
import { useEffect, useRef } from 'react';
import type { EditorProps } from '../../app/Editor';
import type { SharedDocument } from './useDocument';
import { applyScrolls, captureScrolls } from './workspaceScroll';
import type { WorkspacePacket } from './workspacePresence';
import { followedPeer } from './followedPeer';

export function useWorkspaceFollow(props: EditorProps, shared: SharedDocument | undefined) {
  const current = useRef(props);
  current.current = props;
  const target = props.followTarget;
  const targetId = target?.id;
  useEffect(() => {
    if (!shared?.ready) {
      return;
    }
    shared.following = !!targetId;
    const controller = new WorkspaceFollow(() => current.current, shared, targetId);
    return () => {
      controller.dispose();
      shared.following = false;
    };
  }, [shared, shared?.ready, targetId]);
  useEffect(() => {
    if (!target || !shared?.ready) {
      return;
    }
    const peer = followedPeer(shared.peers, target);
    if (
      peer?.file === shared.file &&
      (shared.selected !== peer.selection || shared.selectedOccurrence !== peer.occurrence)
    ) {
      shared.following = true;
      shared.select(peer.selection, peer.page, peer.occurrence);
    }
  }, [shared, shared?.ready, shared?.peers, target]);
}
function applyWorkspace(props: EditorProps, packet: WorkspacePacket) {
  const view = props.view;
  view.setPanel(packet.panel);
  view.setTab(packet.tab);
  if (JSON.stringify(view.cms) !== JSON.stringify(packet.cms)) {
    view.setCms(packet.cms);
  }
  if (JSON.stringify(view.variable) !== JSON.stringify(packet.variable)) {
    view.setVariable(packet.variable);
  }
}

class WorkspaceFollow {
  private desired: WorkspacePacket | undefined;
  private frame = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private previous = '';
  private viewKey = '';
  private readonly observer = new MutationObserver(() => this.restore());
  private readonly resize = new ResizeObserver(() => this.restore());
  private readonly events = new AbortController();
  private readonly off: () => void;
  private readonly interval: ReturnType<typeof setInterval>;
  constructor(
    private readonly props: () => EditorProps,
    private readonly shared: SharedDocument,
    private readonly targetId: string | undefined,
  ) {
    this.off = shared.workspaces.subscribe((packet) => {
      if (packet.id !== targetId || packet.file !== this.props().file) {
        return;
      }
      this.desired = packet;
      applyWorkspace(this.props(), packet);
      this.restore();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'aria-expanded', 'open', 'data-follow-surface'],
    });
    this.resize.observe(document.body);
    const signal = this.events.signal;
    document.addEventListener('scroll', () => this.restore(), { capture: true, signal });
    document.addEventListener('load', () => this.restore(), { capture: true, signal });
    window.addEventListener('resize', () => this.restore(), { signal });
    this.interval = setInterval(() => {
      const { view, file } = this.props();
      const key = JSON.stringify([file, view.panel, view.tab, view.cms, view.variable]);
      if (key !== this.viewKey) {
        this.viewKey = key;
        this.schedule();
      }
    }, 100);
    this.sync();
  }
  private sync() {
    this.timer = undefined;
    if (this.targetId) {
      return;
    }
    const { view, file } = this.props();
    const state = {
      file,
      panel: view.panel,
      tab: view.tab,
      cms: view.cms,
      variable: view.variable,
      scrolls: captureScrolls(),
      disclosures: captureDisclosures(),
    };
    const key = JSON.stringify(state);
    if (key !== this.previous) {
      this.shared.workspaces.publish(state);
      this.previous = key;
    }
  }
  private schedule() {
    if (!this.timer) {
      this.timer = setTimeout(() => this.sync(), 50);
    }
  }
  private restore() {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      if (this.desired) {
        applyDisclosures(this.desired.disclosures);
        applyScrolls(this.desired.scrolls);
      }
      this.schedule();
    });
  }
  dispose() {
    this.off();
    this.observer.disconnect();
    this.resize.disconnect();
    this.events.abort();
    clearTimeout(this.timer);
    clearInterval(this.interval);
    cancelAnimationFrame(this.frame);
  }
}
