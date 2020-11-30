import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './locales';

// const languageDetector = {
//   async: true,
//   cacheUserLanguage: (locale) => {
//     AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
//   },
//   detect: async (language) => {
//     const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);

//     if (!persistedLocale) {
//       // Find best available language from the resource ones

//       // Return detected locale or default language
//       return language('en');
//     }

//     return language(persistedLocale);
//   },
//   init: () => {},
//   type: 'languageDetector',
// };

i18next
  // .use(languageDetector)
  .use(initReactI18next)
  .init({
    cleanCode: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: 'en',
    react: { useSuspense: false },
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
  });

export default i18next;
