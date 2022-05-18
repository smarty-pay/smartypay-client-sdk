/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Lang, parseLang} from "./model/lang";
import {disableButton, makeElem, makeStyleElement, postForm} from './util';
import {initOpenSansFont} from './util/font';
import {SmartyPayButton, SmartyPayButtonProps} from './SmartyPayButton';
import {labelPay, makeErrorParam, errorParam, tokenLabel} from './i18n';

export {SmartyPayButton, SmartyPayButtonProps};
export {Lang, parseLang, initOpenSansFont};

export const I18n = {
  labelPay,
  makeErrorParam,
  errorParam,
  tokenLabel,
}

export const Util = {
  disableButton,
  makeElem,
  makeStyleElement,
  postForm,
}
