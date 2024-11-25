/**
 * Smarty Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import { initIFrameDialog } from './common/iframe-dialog';
import { attachShadowToParent } from './common/layout';

import type { Lang } from './model/lang';

export const SmartyPaySubscriptionsEventKeys = ['subscription-created', 'close'];

export interface OpenPlanWidgetReq {
  target: string;
  planId: string;
  sessionId: string;
  lang?: Lang;
  demoMode?: boolean;
  darkTheme?: boolean;
  onEvent?: (event: string) => void;
}

export interface EditSubscriptionUrlReq {
  sessionId: string;
  backUrl?: string;
  lang?: Lang;
  demoMode?: boolean;
  targetTags?: string;
}

export class SmartyPaySubscriptions {
  private inDialog = false;

  newSubscriptionWidget({ target, planId, sessionId, lang, demoMode, onEvent, darkTheme }: OpenPlanWidgetReq): boolean {
    const parentElem = document.getElementById(target);
    if (!parentElem) {
      console.error('[SmartyPaySubscriptions]: cannot find target to open subscription widget', target);
      return false;
    }

    if (this.inDialog) {
      return false;
    }
    this.inDialog = true;

    const root = (parentElem as any).smartyRoot || attachShadowToParent(parentElem);
    (parentElem as any).smartyRoot = root;

    const urlParams = new URLSearchParams();
    urlParams.set('plan', planId);
    urlParams.set('session', sessionId);
    urlParams.set('frame-mode', 'true');
    if (lang) {
      urlParams.set('lang', lang);
    }
    if (demoMode) {
      urlParams.set('demo-mode', 'true');
    }
    if (darkTheme !== undefined) {
      urlParams.set('dark-theme', darkTheme ? 'true' : 'false');
    }

    const frameOrigin = newSubscriptionAppUrl();
    const frameUrl = `${frameOrigin}/?${urlParams.toString()}`;

    initIFrameDialog({
      frameOrigin,
      frameUrl,
      root,
      onClose: () => {
        this.inDialog = false;
      },
      onEvent: (event) => {
        if (SmartyPaySubscriptionsEventKeys.includes(event)) {
          onEvent?.(event);
        } else {
          console.info('unknown event from dialog:', event);
        }
      },
    });

    return true;
  }

  editSubscriptionUrl({ sessionId, backUrl, targetTags, lang, demoMode }: EditSubscriptionUrlReq) {
    const urlParams = new URLSearchParams();
    urlParams.set('session', sessionId);
    if (backUrl) {
      urlParams.set('back-url', backUrl);
    }
    if (lang) {
      urlParams.set('lang', lang);
    }
    if (demoMode) {
      urlParams.set('demo-mode', 'true');
    }
    if (targetTags) {
      urlParams.set('target-tags', targetTags);
    }

    return `${editSubscriptionUrl()}/?${urlParams.toString()}`;
  }
}

export function newSubscriptionAppUrl(): string {
  const parentHost = window.location.hostname;

  if (parentHost === 'localhost') {
    return 'http://localhost:3000';
  }

  if (parentHost.includes('ncps-ui.dev.')) {
    return 'https://ncps-subs-widget.dev.mnxsc.tech';
  }

  if (parentHost.includes('ncps-ui.staging.')) {
    return 'https://ncps-subs-widget.staging.mnxsc.tech';
  }

  return 'https://new-subscription.smartypay.io';
}

export function editSubscriptionUrl(): string {
  const parentHost = window.location.hostname;

  if (parentHost === 'localhost') {
    return 'http://localhost:3000';
  }

  if (parentHost.includes('ncps-ui.dev.')) {
    return 'https://ncps-ui-subs.dev.mnxsc.tech';
  }

  if (parentHost.includes('ncps-ui.staging.')) {
    return 'https://ncps-ui-subs.staging.mnxsc.tech';
  }

  return 'https://subscriptions.smartypay.io';
}
