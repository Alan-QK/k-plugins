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

export default { appWithTranslation, withTranslation, i18n };
module.exports = NextI18NextInstance;
