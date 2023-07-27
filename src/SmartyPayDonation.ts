/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {CustomFontSupport} from './model/font';
import {initFontByClass} from './util/font';
import {Theme} from './model/theme';
import {parseLang} from './model/lang';
import {labelDonation, makeErrorParam} from './i18n';
import {initButton} from './common/button';
import {initIFrameDialog} from './common/iframe-dialog';

export interface SmartyPayDonationProps extends CustomFontSupport {
  target: string | undefined,
  donationId: string,
  lang?: string,
  theme?: Theme,
}


export class SmartyPayDonation {

  private button: HTMLButtonElement|undefined;
  private root: ShadowRoot|undefined;
  private props: SmartyPayDonationProps;
  private inDialog = false;

  constructor(props: SmartyPayDonationProps) {
    this.props = props;
    initFontByClass(props, () => this.init());
  }

  private init(){

    const lang = parseLang(this.props.lang);

    const {
      donationId,
    } = this.props;

    let errorElem: HTMLElement|undefined;
    if( ! donationId){
      errorElem = makeErrorParam('donationId', lang);
    }

    const initResp = initButton({
      ...this.props,
      owner: 'SmartyPayDonation',
      buttonText: labelDonation(lang),
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
      donationId,
      lang,
    } = this.props;

    const frameOrigin = donationAppUrl();
    const frameUrl = `${frameOrigin}/${donationId}?lang=${lang}&frame-mode=true`;

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

export function donationAppUrl(): string {

  const parentHost = window.location.hostname;

  if(parentHost === 'localhost'){
    return 'http://localhost:3000';
  }

  if(parentHost.includes('ncps-ui.dev.')){
    return 'https://ncps-donations.dev.mnxsc.tech';
  }

  if(parentHost.includes('ncps-ui.staging.')){
    return 'https://ncps-donations.staging.mnxsc.tech';
  }

  return 'https://donate.smartypay.io';
}