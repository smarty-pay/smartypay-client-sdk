import {Lang, parseLang} from "./lang";
import css from './assets/style.css';
import svg from './assets/icon.svg';

export interface SmartyPayButtonProps {
  target?: string,
  apiKey?: string,
  token?: string,
  amount?: string,
  lang?: string,
}


export class SmartyPayButton {

  constructor(
    {
      target,
      lang: langVal,
    }: SmartyPayButtonProps
  ) {

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
    button.classList.add('smarty-pay-button');
    button.insertAdjacentHTML('beforeend', `<span>${svg}</span>`);
    button.insertAdjacentHTML('beforeend',`<span>${label(lang)}</span>`);
    button.insertAdjacentHTML('beforeend',`<span>69.99 USD</span>`);

    addCssToDocument(css);
    elem.replaceWith(button);
  }


}


function label(lang: Lang): string {
  if(lang === 'ru') return 'Оплата';
  if(lang === 'es') return 'Pagar';
  return 'Pay';
}


function addCssToDocument(css: string){
  const style = document.createElement('style')
  style.innerText = css
  document.head.appendChild(style)
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).SmartyPayButton = SmartyPayButton;


