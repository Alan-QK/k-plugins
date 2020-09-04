// Used in node environment
const NextI18Next = require('next-i18next').default;
const path = require('path')

module.exports = new NextI18Next({
  defaultLanguage: 'zh',
  otherLanguages: ['zh', 'en'],
  fallbackLng: 'zh',
  saveMissing: true,
  saveMissingTo: 'all',
  keySeparator: '.',
  localeSubpaths: {},
  localePath: path.resolve('./public/static/locales'),
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  serverLanguageDetection: false
});
