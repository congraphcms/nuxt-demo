import localizationConfig from '@/config/localization'

// STATE -----------------------------------------------------------------------

export const state = () => ({
  /**
   * List of availbale locales
   * @TODO set default/fallback locale, then set the locales via config / env or
   * cms, and set it at app initialization stage
   * @type {Array}
   */
  locales: localizationConfig.get('locales'),
  /**
   * Active locale
   * @type {String}
   */
  locale: null,
  localizedUrl: localizationConfig.get('multilanguage'),
  translationUrls: {},
  /**
   * Active Page
   * @type {Object}
   */
  activePage: null,
  appLoaded: false,
  pageLoaded: false,
  dataLoaded: false,
  firstInit: true,
  transitioning: false,
  instantTransition: false,
  gdprVisible: false,
  /**
   * Viewport size
   *
   * Previsously called: width, height.
   * Set from handleResize.js mixin, layout
   * @type {Number}
   */
  viewportWidth: 0,
  viewportHeight: 0,
  /**
   * Page size
   *
   * Set from handleResize.js mixin, layout
   * @type {Number}
   */
  pageWidth: 0,
  pageHeight: 0,
  /**
   * Page scroll position
   *
   * set from handleScroll.js mixin, layout
   * @type {Number}
   */
  scrollTop: 0,
  scrollLeft: 0,
  /**
   * Mouse coordinates
   *
   * set from handleMouseMove.js mixin, layout
   * @type {Number}
   */
  pageX: 0,
  pageY: 0
})

// GETTERS ---------------------------------------------------------------------

export const getters = {
  getState: state => prop => state[prop],
  locales: state => state['locales'],
  locale: state => state['locale'],
  TranslationUrl: state => locale => state.translationUrls[locale]
}

// MUTTATIONS ------------------------------------------------------------------

export const mutations = {
  SET_STATE: (state, { prop, value }) => { state[prop] = value }
}

// ACTIONS  --------------------------------------------------------------------

export const actions = {
  SET_STATE: ({ commit }, obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        commit('SET_STATE', {
          prop: key,
          value: obj[key]
        })
      }
    }
  },

  CHANGE_LOCALE: ({ commit }, locale) => {
    commit('SET_STATE', {
      prop: 'locale',
      value: locale
    })
  },
}
