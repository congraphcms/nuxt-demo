import getLocaleFromRoute from '@/utils/cms/getLocaleFromRoute'
import { each } from 'lodash'

// STATE -----------------------------------------------------------------------

export const state = () => ({
  isMainMenuOpen: false,
  isHeroLight: true
})

// GETTERS ---------------------------------------------------------------------

export const getters = {
  /**
   * Generic getter
   *
   * @example
   * ```
   * this.$store.getters['getState']('isMenuOpen')
   * ```
   *
   * @param  {String} prop [description]
   * @return {Mixed}
   */
  getState: state => prop => (prop in state) ? state[prop] : undefined,

  // Entities
  // ---------------------------------------------------------------------------
  Entities: (state, getters) => getters['entities/getEntities'](),
  EntityBySlug: (state, getters) => slug => getters['entities/getBySlug'](slug),
  EntityByUrl: (state, getters) => url => getters['entities/getByUrl'](url),
  EntityTranslations: (state, getters) => getters['entities/getEntitiesForAllLocales'],
  EntityTranslationsByLocale: (state, getters) => getters['entities/getEntitiesByLocale'],
  EntityByLocaleAndId: (state, getters) => (locale, id) => getters['entities/getEntityByLocaleAndId'](locale, id),

  // Locales
  // ---------------------------------------------------------------------------
  locales: (state, getters) => getters['app/getState']('locales'),
  locale: (state, getters) => getters['app/getState']('locale'),

  // Active Page
  // ---------------------------------------------------------------------------
  ActivePage: (state, getters) => getters['app/getState']('activePage'),

  // POST
  // ---------------------------------------------------------------------------
  posts: (state, getters) => getters['entities/getByType']('article'),
  latestNews: (state, getters) => {
    // sort by date created, take 2
    return getters.posts
      .sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
      .splice(0, 2)
  },

  // MENU
  // ---------------------------------------------------------------------------
  menus: (state, getters) => getters['entities/getByType']('menu'),
  getMenu: (state, getters) => slug => {
    let menus = getters.menus
    // console.log("MENUS", menus)
    let menu = menus.find(menu => menu.fields.slug == slug)
    // console.log(slug+" MENU -> ", menu)
    return menu
  },
}

// MUTTATIONS ------------------------------------------------------------------

export const mutations = {
  /**
   * Generic mutation
   *
   * @example
   * ```
   * this.$store.commit('SET_STATE', {
   *  prop: 'isMenuOpen',
   *  value: true
   * })
   * ```
   *
   * @param  {String} prop [description]
   * @return {Mixed}
   */
  SET_STATE: (state, { prop, value }) => { state[prop] = value }
  
}

// ACTIONS  --------------------------------------------------------------------

export const actions = {
  SET_STATE ({ commit }, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        commit('SET_STATE', { prop: key, value: obj[key] })
      }
    }
  },
  async nuxtServerInit ({ dispatch, commit, state }, { req, isDev }) {
    let route = state.route.path
    let locale = getLocaleFromRoute(route)
    // console.log("Current route:", route)
    // console.log("Current locale:", locale)
    // console.log("FETCHING ENTITIES...")
    await dispatch('app/SET_STATE', {locale: locale})
    await dispatch('entities/LOAD_ENTITIES', locale)
  },

  async CHANGE_LOCALE({ dispatch }, locale) {
    await dispatch('app/CHANGE_LOCALE', locale)
    await dispatch('entities/CHANGE_LOCALE', locale)
  },

  UPDATE_ACTIVE_PAGE_TRANSLATIONS({ commit, getters }) {
    let entitiesByLocale = getters['entities/getEntitiesForAllLocales']
    let activePage = getters.ActivePage
    if(!activePage) {
      return
    }
    let urls = {}
    each(entitiesByLocale, (entities, locale) => {
      each(entities, (entity) => {
        if (entity.id == activePage.id) {
          urls[locale] = entity.url
        }
      })
    })

    commit('app/SET_STATE', {
      prop: 'translationUrls',
      value: urls
    })

  }
}
