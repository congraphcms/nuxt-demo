import isLocale from './isLocale'
import localizationConfig from '@/config/localization'
/**
 * Get locale from a route
 * @param  {string} route Route
 * @return {string}       Locale string.
 */
const getLocaleFromRoute = function(route) {
  // remove the first slash
  route = route.substr(1, route.length)

  let routeSegments = route.split('/')
  let firstSegment = routeSegments[0]

  let locale
  if (isLocale(firstSegment)) {
    locale = firstSegment
    // routeSegments.shift()
  } else {
    locale = localizationConfig.get('default_locale') || false
  }

  return locale
}

export default getLocaleFromRoute
