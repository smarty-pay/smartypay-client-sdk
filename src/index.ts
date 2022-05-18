/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Lang, parseLang} from "./lang";
import {disableButton, initOpenSansFont, makeElem, makeStyleElement, postForm} from './util';
import {SmartyPayButton, SmartyPayButtonProps, label, makeErrorParam, errorParam, tokenLabel} from './SmartyPayButton';

export {Lang};
export {SmartyPayButton, SmartyPayButtonProps};


export const Util = {
  parseLang,
  disableButton,
  initOpenSansFont,
  makeElem,
  makeStyleElement,
  postForm,
  label,
  makeErrorParam,
  errorParam,
  tokenLabel,
}
