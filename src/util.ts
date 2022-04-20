


export function makeElem(htmlString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild as HTMLElement;
}

export function makeStyleElement(css: string) {
  const style = document.createElement('style')
  style.innerText = css
  return style;
}


export function initOpenSansFont() {
  const openSansTag = '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">';
  try {
    document.head.appendChild(makeElem(openSansTag));
  } catch (e){
    console.warn('cannot init font', e);
  }
}
