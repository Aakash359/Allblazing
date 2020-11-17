import I18n from "i18n-js";

import du from './du';
import en from './en';


I18n.defaultLocale = "en";
I18n.locale = "en";
// I18n.currentLocale();

I18n.fallbacks = true;
I18n.translations = {
    en,
    du
};

export default I18n;

