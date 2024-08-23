/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import { disableButton } from './common/button';
import { errorParam, labelDonation, labelPay, labelRechargeAddress, makeErrorParam, tokenLabel } from './i18n';
import { parseLang } from './model/lang';
import { SmartyPayButton, SmartyPayButtonProps } from './SmartyPayButton';
import { donationAppUrl, SmartyPayDonation, SmartyPayDonationProps } from './SmartyPayDonation';
import {
  rechargeAddressAppUrl,
  SmartyPayRechargePayment,
  SmartyPayRechargePaymentProps,
} from './SmartyPayRechargePayment';
import { OpenPlanWidgetReq, SmartyPaySubscriptions } from './SmartyPaySubscriptions';
import { makeElem, makeStyleElement, postForm } from './util';
import { initOpenSansFont } from './util/font';

import type { Lang } from './model/lang';
import type { Theme } from './model/theme';

export { SmartyPayButton, SmartyPayButtonProps };
export { SmartyPayDonation, SmartyPayDonationProps, donationAppUrl };
export { SmartyPayRechargePayment, SmartyPayRechargePaymentProps, rechargeAddressAppUrl };
export { SmartyPaySubscriptions, OpenPlanWidgetReq };

export { parseLang, initOpenSansFont };
export type { Theme };
export type { Lang };

export const I18n = {
  labelPay,
  labelDonation,
  labelRechargeAddress,
  makeErrorParam,
  errorParam,
  tokenLabel,
};

export const Util = {
  disableButton,
  makeElem,
  makeStyleElement,
  postForm,
};
