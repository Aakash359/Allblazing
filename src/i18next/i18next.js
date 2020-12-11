import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, du } from './locales';

i18next
  .use(initReactI18next)
  .init({
    cleanCode: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: 'en',
    react: { useSuspense: false },
    resources: {
      du: { translation: du },
      en: { translation: en },
    },
  });

export default i18next;
