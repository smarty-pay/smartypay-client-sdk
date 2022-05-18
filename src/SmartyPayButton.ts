/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {disableButton, makeElem, makeStyleElement, postForm} from './util';
import {Lang, parseLang} from './model/lang';
import svg from './assets/icon.svg';
import css from './assets/style.css';
import {Theme} from './model/theme';
import {labelPay, makeErrorParam, tokenLabel} from './i18n';
import {CustomFontSupport} from './model/font';
import {initFontByClass} from './util/font';

export interface SmartyPayButtonProps extends CustomFontSupport {
  target: string | undefined,
  apiKey: string | undefined,
  token: string | undefined,
  amount: string | undefined,
  lang?: string,
  theme?: Theme,
}

interface CallProps {
  apiKey: string,
  token: string,
  amount: string,
  lang: Lang,
}


export class SmartyPayButton {

  private button: HTMLButtonElement|undefined;
  private callProps: CallProps|undefined;

  constructor(props: SmartyPayButtonProps) {
    initFontByClass(props, () => this.init(props));
  }

  private init(
    {
      target,
      lang: langVal,
      apiKey,
      token,
      amount,
      theme,
    }: SmartyPayButtonProps
  ){

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
    button.appendChild(makeElem(`<span>${labelPay(lang)} ${amount && token? `${amount} ${tokenLabel(token)}` : ''}</span>`));
    button.appendChild(makeElem(`<span></span>`));

    if(theme === 'dark'){
      button.classList.add('dark');
    }

    let errorElem: HTMLElement|undefined;
    if( ! apiKey){
      errorElem = makeErrorParam('apiKey', lang);
    }
    else if( ! token){
      errorElem = makeErrorParam('token', lang);
    }
    else if( ! amount){
      errorElem = makeErrorParam('amount', lang);
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
      this.callProps = {
        apiKey: apiKey!,
        amount: amount!,
        token: token!,
        lang
      };

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

    if( ! this.button || ! this.callProps){
      return;
    }

    const {apiKey, token, amount, lang} = this.callProps;

    postForm('https://api.smartypay.io/checkout', {
      'api-key': apiKey,
      token,
      amount,
      lang,
    });
  }

}


