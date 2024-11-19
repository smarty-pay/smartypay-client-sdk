/**
 * Smarty Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import css from '../assets/style.css';
import { makeStyleElement } from '../util';

export function attachShadowToParent(parent: HTMLElement): ShadowRoot {
  const root = parent.attachShadow({ mode: 'closed' });
  root.appendChild(makeStyleElement(css));

  return root;
}
