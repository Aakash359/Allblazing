import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import du from '../locales/dutch.json';

let client = null;

const i18nLocale = (store) => {
  const lang = store.getState().app.locale;
  const resources = {
    du,
    en,
  };

  client = i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      cleanCode: true,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      lng: lang,
      react: { useSuspense: false },
      resources,
    }, (err, t) => {
      // eslint-disable-next-line
      console.log('i18next err---------------', err, t);
    });
};

export const getLocaleClient = () => client;

export default i18nLocale;
