// Node module
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';

const options: i18n.InitOptions = {
  debug: false,
  fallbackLng: 'en',
  preload: ['en'],
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
    loadPath: 'static/locales/{{lng}}/{{ns}}.json',
    ignoreRoutes: ['/_next'],
  },
};

if (!i18n.isInitialized) {
  if (process.browser) {
    i18n.use(XHR).use(BrowserLanguageDetector);
  } else {
    // TODO: Backend
  }
  i18n.init(options);
}

export default i18n;
