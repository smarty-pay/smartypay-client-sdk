/**
 * Smarty Pay Client SDK
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

export type Lang = 'en' | 'ru' | 'es';

export function parseLang(langVal: string | undefined): Lang {
  const lang = langVal || navigator.language || '';

  if (lang.includes('ru')) return 'ru';

  if (lang.includes('es')) return 'es';

  return 'en';
}
