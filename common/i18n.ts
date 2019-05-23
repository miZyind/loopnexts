// Node module
import i18n from 'i18next';
import { resolve } from 'path';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const isBrowser = process.browser;
const localePath = 'static/locales/{{lng}}/{{ns}}.json';
const options: i18n.InitOptions = {
  debug: false,
  fallbackLng: 'en',
  preload: ['en', 'zh', 'vn'],
  load: 'languageOnly',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format) =>
      format === 'uppercase' ? value.toUpperCase() : value,
  },
  backend: {
    loadPath: isBrowser
      ? localePath
      : resolve(process.cwd(), 'client', localePath),
  },
  detection: {
    order: ['querystring', 'cookie'],
    lookupCookie: 'lng',
    lookupQuerystring: 'lng',
    caches: ['cookie'],
  },
};

i18n
  .use(isBrowser ? XHR : eval(`require('i18next-node-fs-backend')`))
  .use(LanguageDetector)
  .init(options);

export type I18n = typeof i18n;
export type Language = typeof i18n.language;
export interface II18nStore {
  [lng: string]: { [ns: string]: { [key: string]: string } };
}
export default i18n;
