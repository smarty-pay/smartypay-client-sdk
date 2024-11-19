/**
 * Smarty Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import { initButton } from './common/button';
import { labelPay, makeErrorParam, tokenLabel } from './i18n';
import { parseLang } from './model/lang';
import { postForm } from './util';
import { initFontByClass } from './util/font';

import type { CustomFontSupport } from './model/font';
import type { Lang } from './model/lang';
import type { Theme } from './model/theme';

export interface SmartyPayButtonProps extends CustomFontSupport {
  target: string | undefined;
  apiKey: string | undefined;
  token: string | undefined;
  amount: string | undefined;
  lang?: string;
  theme?: Theme;
}

interface CallProps {
  apiKey: string;
  token: string;
  amount: string;
  lang: Lang;
}

export class SmartyPayButton {
  private button: HTMLButtonElement | undefined;
  private callProps: CallProps | undefined;

  constructor(props: SmartyPayButtonProps) {
    initFontByClass(props, () => this.init(props));
  }

  private init(props: SmartyPayButtonProps) {
    const lang = parseLang(props.lang);
    const { apiKey, token, amount } = props;

    let errorElem: HTMLElement | undefined;
    if (!apiKey) {
      errorElem = makeErrorParam('apiKey', lang);
    } else if (!token) {
      errorElem = makeErrorParam('token', lang);
    } else if (!amount) {
      errorElem = makeErrorParam('amount', lang);
    }

    const initResp = initButton({
      ...props,
      owner: 'SmartyPayButton',
      buttonText: `${labelPay(lang)} ${amount && token ? `${amount} ${tokenLabel(token)}` : ''}`,
      errorElem,
      onClick: () => this.click(),
    });

    if (!initResp) return;

    this.button = initResp.button;

    this.callProps = {
      apiKey: apiKey!,
      amount: amount!,
      token: token!,
      lang,
    };
  }

  click() {
    if (!this.button || !this.callProps) {
      return;
    }

    const { apiKey, token, amount, lang } = this.callProps;

    postForm('https://api.smartypay.io/checkout', {
      'api-key': apiKey,
      token,
      amount,
      lang,
    });
  }
}
