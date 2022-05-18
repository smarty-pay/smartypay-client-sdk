/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {makeElem, makeStyleElement} from './util';
import svg from './assets/icon.svg';
import css from './assets/style.css';
import {Theme} from './model/theme';

export interface MakeButtonReq {
  owner: string,
  target?: string,
  theme?: Theme,
  errorElem?: HTMLElement,
  buttonText: string,
  onClick?: ()=>void,
}

export interface MakeButtonResp {
  root: ShadowRoot,
  button: HTMLButtonElement,
}

export function initButton(
  {
    owner,
    target,
    theme,
    errorElem,
    buttonText,
    onClick,
  }: MakeButtonReq
): MakeButtonResp | undefined {

  if( ! target){
    console.warn(`cannot find target to render ${owner}`);
    return undefined;
  }

  const elem = document.getElementById(target);
  if( ! elem){
    console.warn(`cannot find element to render ${owner}`, target);
    return undefined;
  }

  const button = document.createElement('button');
  button.classList.add('pay-button');
  button.appendChild(makeElem(`<span>${svg}</span>`));
  button.appendChild(makeElem(`<span>${buttonText}</span>`));
  button.appendChild(makeElem(`<span></span>`));

  if(theme === 'dark'){
    button.classList.add('dark');
  }


  const root = elem.attachShadow({mode: 'closed'});
  root.appendChild(makeStyleElement(css));
  root.appendChild(button);

  if( errorElem){
    root.appendChild(errorElem);
    disableButton(button);
  }
  else {

    // prevent multi-click
    let actionId = 0;

    button.addEventListener('click', ()=>{

      actionId = Math.random();
      const curActionId = actionId;

      // timeout for visual click
      setTimeout(()=>{
        if(curActionId === actionId){
          onClick?.();
        }
      }, 600);
    });
  }

  return { root, button };
}


export function disableButton(button: HTMLButtonElement){
  button.classList.add('disabled');
  button.setAttribute('disabled', 'disabled');
}