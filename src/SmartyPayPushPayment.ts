/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {CustomFontSupport} from './model/font';
import {initFontByClass} from './util/font';
import {Theme} from './model/theme';
import {parseLang} from './model/lang';
import {labelPushAddress, makeErrorParam} from './i18n';
import {initButton} from './button';
import {initIFrameDialog} from './iframe-dialog';

export interface SmartyPayPushPaymentProps extends CustomFontSupport {
  target: string | undefined,
  address: string,
  lang?: string,
  theme?: Theme,
}


export class SmartyPayPushPayment {

  private button: HTMLButtonElement|undefined;
  private root: ShadowRoot|undefined;
  private props: SmartyPayPushPaymentProps;
  private inDialog = false;

  constructor(props: SmartyPayPushPaymentProps) {
    this.props = props;
    initFontByClass(props, () => this.init());
  }

  private init(){

    const lang = parseLang(this.props.lang);

    const {
      address,
    } = this.props;

    let errorElem: HTMLElement|undefined;
    if( ! address){
      errorElem = makeErrorParam('address', lang);
    }

    const initResp = initButton({
      ...this.props,
      owner: 'SmartyPayPushAddress',
      buttonText: labelPushAddress(lang),
      errorElem,
      onClick: ()=> this.click()
    });

    this.button = initResp?.button;
    this.root = initResp?.root;
  }

  click(){

    if( ! this.button || ! this.root){
      return;
    }

    if( this.inDialog){
      return;
    }
    this.inDialog = true;

    const {
      address,
      lang,
    } = this.props;

    const frameOrigin = pushAddressAppUrl();
    const frameUrl = `${frameOrigin}/${address}?lang=${lang}&frame-mode=true`;

    initIFrameDialog({
      frameOrigin,
      frameUrl,
      root: this.root,
      onClose: ()=>{
        this.inDialog = false;
      }
    });
  }
}

export function pushAddressAppUrl(): string {

  const parentHost = window.location.hostname;

  if(parentHost === 'localhost'){
    return 'http://localhost:3000';
  }

  if(parentHost.includes('ncps-ui.dev.')){
    return 'https://ncps-push-ui.dev.mnxsc.tech';
  }

  if(parentHost.includes('ncps-ui.staging.')){
    return 'https://ncps-push-ui.staging.mnxsc.tech';
  }

  return 'https://push.smartypay.io';
}