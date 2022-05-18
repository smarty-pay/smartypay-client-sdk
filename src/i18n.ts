/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import {Lang} from './model/lang';
import {makeElem} from './util';


export function labelPay(lang: Lang): string {
  if(lang === 'ru') return 'Оплата';
  if(lang === 'es') return 'Pagar';
  return 'Pay';
}

export function labelDonation(lang: Lang): string {
  if(lang === 'ru') return 'Пожертвование';
  if(lang === 'es') return 'Donación';
  return 'Donation';
}


export function makeErrorParam(key: string, lang: Lang){
  return makeElem(`<div class="error">${errorParam(key, lang)}</div>`);
}

export function errorParam(key: string, lang: Lang){
  if(lang === 'ru') return `Неверный параметр "${key}"`;
  if(lang === 'es') return `Parámetro no válido "${key}"`;
  return `Invalid parameter "${key}"`;
}

export function tokenLabel(token: string|undefined){
  if( ! token)
    return '';

  // test net
  if(token.startsWith('bt') || token.startsWith('pm')){
    return token.substring(2);
  }

  // main net
  if(token.startsWith('b') || token.startsWith('p')){
    return token.substring(1);
  }

  // unknown token format
  return token;
}