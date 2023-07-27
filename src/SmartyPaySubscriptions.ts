import {attachShadowToParent} from './common/layout';
import {initIFrameDialog} from './common/iframe-dialog';


export interface OpenPlanWidgetReq {
  target: string,
  planId: string,
  sessionId: string,
}

export class SmartyPaySubscriptions {

  private inDialog = false;
  // private roots =

  newSubscriptionWidget(
    {
      target,
      planId,
      sessionId
    }: OpenPlanWidgetReq
  ): boolean {


    const parentElem = document.getElementById(target);
    if( ! parentElem){
      console.error('[SmartyPaySubscriptions]: cannot find target to open subscription widget', target);
      return false;
    }

    if( this.inDialog){
      return false;
    }
    this.inDialog = true;

    const root = (parentElem as any).smartyRoot || attachShadowToParent(parentElem);
    (parentElem as any).smartyRoot = root;

    const frameOrigin = newSubscriptionAppUrl();
    const frameUrl = `${frameOrigin}/?plan=${planId}&session=${sessionId}&frame-mode=true`;

    initIFrameDialog({
      frameOrigin,
      frameUrl,
      root: root,
      onClose: ()=>{
        this.inDialog = false;
      }
    });

    return true;
  }

}


export function newSubscriptionAppUrl(): string {

  const parentHost = window.location.hostname;

  if(parentHost === 'localhost'){
    return 'http://localhost:3000';
  }

  if(parentHost.includes('ncps-ui.dev.')){
    return 'https://ncps-subs-widget.dev.mnxsc.tech';
  }

  if(parentHost.includes('ncps-ui.staging.')){
    return 'https://ncps-subs-widget.staging.mnxsc.tech';
  }

  return 'https://new-subscription.smartypay.io';
}