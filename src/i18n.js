import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import english from './locales/en.json'
import french from './locales/fr.json'

const resources = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupCookie: 'i18n',
      lookupLocalStorage: 'i18nLng',
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
    },
    fallbackLng: {
      'en-us': ['en'],
      default: ['fr-FR'],
    },

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
