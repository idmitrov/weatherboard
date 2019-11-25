import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from './intl/en.json';
import bg from './intl/bg.json';

export const supportedLanguages = [
  {
    key: 'bg-BG',
    label: 'Български'
  },
  {
    key: 'en-US',
    label: 'English'
  },
];

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ...en,
      ...bg
    },
    fallbackLng: "bg-BG",
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
