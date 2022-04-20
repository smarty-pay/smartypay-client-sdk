import {Lang, parseLang} from "./lang";
import css from './assets/style.css';
import svg from './assets/icon.svg';
import {initOpenSansFont, makeElem, makeStyleElement} from "./util";


export interface SmartyPayButtonProps {
  target: string | undefined,
  apiKey: string | undefined,
  token: string | undefined,
  amount: string | undefined,
  lang?: string,
  skipCustomFont?: boolean,
}


export class SmartyPayButton {

  private inited = false;

  constructor(props: SmartyPayButtonProps) {
    
    if( props.skipCustomFont){
      this.init(props);
      return;
    }

    // add our custom font into page's head tag
    initOpenSansFont();

    // need to wait our font to be loaded for prevent visual artefacts on button text
    try {
      (document as any).fonts.ready.then(()=>{
        this.init(props);
      });
    }
    catch (e){
      console.warn('cannot get fonts ready status', e);
    }
    finally {
      // backup init without font wait
      setTimeout(()=>{
        this.init(props);
      }, 800);
    }
  }


  private init(
    {
      target,
      lang: langVal,
      apiKey,
      token,
      amount,
    }: SmartyPayButtonProps
  ){

    if(this.inited)
      return;
    this.inited = true;

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
    button.appendChild(makeElem(`<span>${label(lang)} 69.99 USD</span>`));
    button.appendChild(makeElem(`<span></span>`));

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
      button.classList.add('disabled');
    }

  }

}


function label(lang: Lang): string {
  if(lang === 'ru') return 'Оплата';
  if(lang === 'es') return 'Pagar';
  return 'Pay';
}


function makeErrorParam(key: string, lang: Lang){
  return makeElem(`<div class="error">${errorParam(key, lang)}</div>`);
}

function errorParam(key: string, lang: Lang){
  if(lang === 'ru') return `Неверный параметр "${key}"`;
  if(lang === 'es') return `Parámetro no válido "${key}"`;
  return `Invalid parameter "${key}"`;
}




// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).SmartyPayButton = SmartyPayButton;


