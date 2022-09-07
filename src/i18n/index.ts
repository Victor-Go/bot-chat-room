import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import chs from './chs.json'
import en from './en.json'

const resources = {
  en,
  chs
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en'
  })