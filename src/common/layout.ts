import {makeStyleElement} from '../util';
import css from '../assets/style.css';


export function attachShadowToParent(parent: HTMLElement): ShadowRoot {

  const root = parent.attachShadow({mode: 'closed'});
  root.appendChild(makeStyleElement(css));

  return root;
}