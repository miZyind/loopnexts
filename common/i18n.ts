// Node module
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';

const options: i18next.InitOptions = {
  fallbackLng: 'en',
  load: 'languageOnly',
  ns: 'common',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};

if (!i18next.isInitialized) {
  i18next
    .use(XHR)
    .use(BrowserLanguageDetector)
    .init(options);
}

export default i18next;
