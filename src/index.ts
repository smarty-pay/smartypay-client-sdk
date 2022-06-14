/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Lang, parseLang} from "./model/lang";
import {Theme} from "./model/theme";
import {makeElem, makeStyleElement, postForm} from './util';
import {initOpenSansFont} from './util/font';
import {disableButton} from './button';
import {SmartyPayButton, SmartyPayButtonProps} from './SmartyPayButton';
import {SmartyPayDonation, SmartyPayDonationProps, donationAppUrl} from './SmartyPayDonation';
import {SmartyPayPushPayment, SmartyPayPushPaymentProps, pushAddressAppUrl} from './SmartyPayPushPayment';
import {labelPay, labelDonation, labelPushAddress, makeErrorParam, errorParam, tokenLabel} from './i18n';

export {SmartyPayButton, SmartyPayButtonProps};
export {SmartyPayDonation, SmartyPayDonationProps, donationAppUrl};
export {SmartyPayPushPayment, SmartyPayPushPaymentProps, pushAddressAppUrl};

export {parseLang, initOpenSansFont};
export type {Theme};
export type {Lang};

export const I18n = {
  labelPay,
  labelDonation,
  labelPushAddress,
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
