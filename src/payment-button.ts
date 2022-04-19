
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
      console.warn('empty target for SmartyPayButton');
      return;
    }

    const elem = document.getElementById(target);
    if( ! elem){
      console.warn('cannot find element for render SmartyPayButton:', target);
      return;
    }

    const lang = parseLang(langVal || navigator.language || '');

    const button = document.createElement('button');
    button.innerText = label(lang);

    elem.replaceWith(button);
  }


}

function parseLang(lang: string): Lang {
  if(lang.includes('ru')) return 'ru';
  if(lang.includes('es')) return 'es';
  return 'en';
}

function label(lang: Lang): string {
  if(lang === 'ru') return 'Оплатить';
  if(lang === 'es') return 'Pagar';
  return 'Pay';
}


type Lang = 'en' | 'ru' | 'es';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).SmartyPayButton = SmartyPayButton;


