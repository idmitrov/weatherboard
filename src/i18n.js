import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './intl/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ...en
    },
    fallbackLng: "en-US",
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
