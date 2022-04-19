import {Lang, parseLang} from "./lang";

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

    elem.replaceWith(button);
  }


}


function label(lang: Lang): string {
  if(lang === 'ru') return 'Оплатить';
  if(lang === 'es') return 'Pagar';
  return 'Pay';
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).SmartyPayButton = SmartyPayButton;


