import {Lang, parseLang} from "./lang";
import css from './style.css';

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
    button.innerText = label(lang);
    button.classList.add('smarty-pay-button');

    elem.replaceWith(button);
    addCssToDocument(css);
  }


}


function label(lang: Lang): string {
  if(lang === 'ru') return 'Оплатить';
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


