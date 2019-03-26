import localizationConfig from '@/config/localization'
import getLocaleFromRoute from '@/utils/cms/getLocaleFromRoute'

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const defaultLocale = localizationConfig.get('default_locale')

  // Get active locale
  // const locale = store.getters.locale

  // Get locale from route
  const locale = getLocaleFromRoute(route.path)
  // console.log('[i18n middleware] locale', locale)

  // if (store.getters.locales.indexOf(locale) === -1) {
  //   return error({ message: 'This page could not be found.', statusCode: 404 })
  // }

  // Set locale
  // store.commit('app/SET_STATE', locale)
  // console.log("locale STATE!!!", state)

  app.i18n.locale = locale

  // If route is /<defaultLocale>/... -> redirect to /...
  const url = route.fullPath
  // console.log('[i18n middleware] fullPath (url)', url)
  if (locale === defaultLocale && url.indexOf('/' + defaultLocale) === 0) {
    // console.log(locale);
    const toReplace = '^/' + defaultLocale
    const re = new RegExp(toReplace)
    const redirectUrl = url.replace(re, '/')
    // console.log('[i18n middleware] redirecting...', redirectUrl, url)
    return redirect()
  }
}
