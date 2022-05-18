/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {CustomFontSupport} from './model/font';
import {initFontByClass} from './util/font';
import {Theme} from './model/theme';
import {parseLang} from './model/lang';
import {disableButton, makeElem, makeStyleElement} from './util';
import svg from './assets/icon.svg';
import {labelDonation, makeErrorParam} from './i18n';
import css from './assets/style.css';


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

    const {
      target,
      donationId,
      lang: langVal,
      theme,
    } = this.props;

    if( ! target){
      console.warn('cannot find target to render SmartyPayButton');
      return;
    }

    const elem = document.getElementById(target);
    if( ! elem){
      console.warn('cannot find element to render SmartyPayButton:', target);
      return;
    }

    const lang = parseLang(langVal);

    const button = document.createElement('button');
    button.classList.add('pay-button');
    button.appendChild(makeElem(`<span>${svg}</span>`));
    button.appendChild(makeElem(`<span>${labelDonation(lang)}</span>`));
    button.appendChild(makeElem(`<span></span>`));

    if(theme === 'dark'){
      button.classList.add('dark');
    }

    let errorElem: HTMLElement|undefined;
    if( ! donationId){
      errorElem = makeErrorParam('donationId', lang);
    }


    const root = elem.attachShadow({mode: 'closed'});
    root.appendChild(makeStyleElement(css));
    root.appendChild(button);

    if( errorElem){
      root.appendChild(errorElem);
      disableButton(button);
    }
    else {

      this.button = button;

      // prevent multi-click
      let actionId = 0;

      button.addEventListener('click', ()=>{

        actionId = Math.random();
        const curActionId = actionId;

        // timeout for visual click
        setTimeout(()=>{
          if(curActionId === actionId){
            this.click();
          }
        }, 600);
      });
    }
  }

  click(){

    if( ! this.button){
      return;
    }

    console.log('call props', this.props);
  }
}