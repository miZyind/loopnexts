// Node module
import i18n from 'i18next';
import { resolve } from 'path';
import XHR from 'i18next-xhr-backend';
import BrowserLngDetector from 'i18next-browser-languagedetector';
import { LanguageDetector as ServerLngDetector } from 'i18next-express-middleware';

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
  react: {
    wait: true,
    useSuspense: false,
  },
};

if (!i18n.isInitialized) {
  if (isBrowser) {
    i18n.use(XHR).use(BrowserLngDetector);
  } else {
    // tslint:disable-next-line:no-eval
    const FS = eval(`require('i18next-node-fs-backend')`);
    i18n.use(FS).use(ServerLngDetector);
  }

  i18n.init(options);
}

export default i18n;
