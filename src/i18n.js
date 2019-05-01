import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import french from './locales/fr.json'

const resources = {
  fr: {
    translation: french,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
