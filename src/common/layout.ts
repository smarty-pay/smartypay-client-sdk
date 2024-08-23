import css from '../assets/style.css';
import { makeStyleElement } from '../util';

export function attachShadowToParent(parent: HTMLElement): ShadowRoot {
  const root = parent.attachShadow({ mode: 'closed' });
  root.appendChild(makeStyleElement(css));

  return root;
}
