import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localizationConfig from '@/config/localization'
import {each} from 'lodash'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  let locales = localizationConfig.get('locales')

  let setupParams = {
    locale: store.getters.locale,
    fallbackLocale: localizationConfig.get('default_locale')
  }

  let messages = {}

  // require all locales
  // @TODO handle errors
  each(locales, locale => {
    messages[locale] = require('~/locales/' + locale + '.json')
  })

  setupParams.messages = messages
  app.i18n = new VueI18n(setupParams)
}
