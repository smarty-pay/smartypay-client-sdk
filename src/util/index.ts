/**
 * SMARTy Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

export function makeElem(htmlString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild as HTMLElement;
}

export function makeStyleElement(css: string) {
  const style = document.createElement('style');
  style.innerText = css;
  return style;
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
export function postForm(path: string, params: Record<string, any>, method = 'post') {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;
  form.target = '_blank';

  for (const key of Object.keys(params)) {
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = key;
    hiddenField.value = params[key];
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
}
