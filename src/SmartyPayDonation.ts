/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {CustomFontSupport} from './model/font';
import {initFontByClass} from './util/font';
import {Theme} from './model/theme';
import {parseLang} from './model/lang';
import {labelDonation, makeErrorParam} from './i18n';
import {initButton} from './button';


export interface SmartyPayDonationProps extends CustomFontSupport {
  target: string | undefined,
  donationId: string,
  lang?: string,
  theme?: Theme,
}


export class SmartyPayDonation {

  private button: HTMLButtonElement|undefined;
  private props: SmartyPayDonationProps;

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

    this.button = initButton({
      ...this.props,
      owner: 'SmartyPayDonation',
      buttonText: labelDonation(lang),
      errorElem,
      onClick: ()=> this.click()
    });
  }

  click(){

    if( ! this.button){
      return;
    }

    console.log('call props', this.props);
  }
}