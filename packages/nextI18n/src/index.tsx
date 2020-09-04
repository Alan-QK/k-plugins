// Used in node environment
const NextI18Next = require('next-i18next').default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'zh',
  otherLanguages: ['zh', 'en'],
  fallbackLng: 'zh',
  saveMissing: true,
  saveMissingTo: 'all',
  keySeparator: '.',
  localeSubpaths: {},
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  serverLanguageDetection: false
});

const { appWithTranslation, withTranslation, i18n } = NextI18NextInstance;

export const appNext = appWithTranslation;
export const useTranslation = withTranslation;
export const appI18n = i18n;

export default NextI18NextInstance;
module.exports = NextI18NextInstance;
