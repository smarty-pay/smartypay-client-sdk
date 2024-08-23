/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import { makeElem } from './index';

import type { CustomFontSupport } from '../model/font';

const openSansTag =
  '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">';
let openSansReady = false;

export function initOpenSansFont() {
  if (openSansReady) return;

  try {
    document.head.appendChild(makeElem(openSansTag));
    openSansReady = true;
  } catch (e) {
    console.warn('cannot init font', e);
  }
}

export function initFontByClass<T extends CustomFontSupport>(props: T, init: () => void) {
  let done = false;

  function callInit() {
    if (done) return;
    done = true;
    init();
  }

  if (props.skipCustomFont) {
    callInit();
    return;
  }

  // add our custom font into page's head tag
  initOpenSansFont();

  // backup init without font wait
  setTimeout(() => {
    callInit();
  }, 800);

  // need to wait our font to be loaded for prevent visual artefacts on button text
  try {
    (document as any).fonts.ready.then(() => {
      callInit();
    });
  } catch (e) {
    console.warn('cannot get fonts ready status', e);
  }
}
