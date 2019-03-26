import axios from 'axios'
import cachios from 'cachios'
import urlConfig from '@/config/urls'
import localizationConfig from '@/config/localization'
import apiConfig from '@/config/api'
import fixLocationField from '@/utils/cms/fixLocationField'
import isCyclic from '@/utils/cms/isCyclic'
import {
  each,
  indexOf,
  find,
  includes,
  forEach,
  mapValues,
  map,
  has,
  isString,
  isObject,
  isArray
} from 'lodash'

// configure `node-cache` to keep cache forever!
const cachiosInstance = cachios.create(axios, {
  stdTTL: 1,
  checkperiod: 1,
});
// import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'


// STATE -----------------------------------------------------------------------

export const state = () => ({
  rawEntities: [],
  entities: [],
  entitiesByLocale: null,
  pages: []
})

// GETTERS ---------------------------------------------------------------------

export const getters = {
  // entities
  getRawEntities: state => state.rawEntities,
  getEntities: state => state.entities,
  getEntitiesForAllLocales: state => state.entitiesByLocale,
  getEntitiesByLocale: (state) => {
    return locale => {
      if (state.entitiesByLocale === null || !state.entitiesByLocale.hasOwnProperty(locale)) {
        return null
      }
      return state.entitiesByLocale[locale]
    }
  },
  getEntityUrlsById: (state, getters) => {
    return (id) => {
      if (state.entitiesByLocale === null) {
        return null
      }
      let urls = {}
      each(state.entitiesByLocale, function (entities, locale) {
        let entity = entities.find(e => e.id == id)
        if (!entity) {
          return
        }
        urls[locale] = entity.url
      })

      return urls
    }
  },

  getEntityTranslationsById: (state, getters) => {
    return id => {
      if (state.entitiesByLocale === null) {
        return null
      }
      let translations = {}
      each(state.entitiesByLocale, function (entities, locale) {
        let entity = entities.find(e => e.id == id)
        if (!entity) {
          return
        }
        translations[locale] = entity
      })

      return urls
    }
  },

  getEntityByLocaleAndId: (state, getters) => {
    return (locale, id) => {
      let entities = getters.getEntitiesByLocale(locale)
      if (!entities) {
        return null
      }
      let entity = entities.find(entity => entity.id === id)
      return entity
    }
  },

  hasAllLocales: (state) => {
    if (!state.entitiesByLocale) {
      return false
    }

    let locales = localizationConfig.get('locales')
    let hasAllLocales = true
    each(locales, (locale) => {
      let hasLocale = false
      each(state.entitiesByLocale, (entities, l) => {
        if (l == locale) {
          hasLocale = true
        }
      })
      if (!hasLocale) {
        hasAllLocales = false
      }
    })
    return hasAllLocales
  },


  search: state => keyword => state.entities.find(page => page.name === keyword),
  getByUrl: state => url => state.entities.find(page => page.url === url),
  /**
   * Get entities by entity_type
   * @param  {String} type Entity type
   * @return {Array}       Collection of entities
   */
  getByType: state => type => state.entities.filter(page => page.entity_type === type),
  // getManyByParent: state => {
  //   return (value) => state.entities.filter(page => {
  //     var attr = page.fields.parent_page || page.fields.category;
  //     var parent = value.fields.parent_page || value.fields.category;
  //     if (!attr || !value) {
  //       return
  //     }
  //     return attr.id === parent.id
  //   })
  // },
  getSiblings: (state, getters) => model =>
    getters.getManyByParent(model).filter(child => child.id === model.id),
  getChildren: state => {
    return (model) => state.entities.filter(page => {
      let attr = page.fields.parent_page
      if (!attr) return
      return attr.id === model.id
    })
  },
  getManyByProp: state => (type, value) => state.entities.filter(page => page[type] === value),
  getByProp: state => {
    return (type, value, collection = "entities") => state[collection].find(page => page[type] == value)
  }
  // getManyByAttr: state => {
  //   return (type, value) => state.entities.filter(page => {
  //     var attr = page.fields[type]
  //     if (!attr) return
  //     return attr.value === value
  //   });
  // },
  // getByAttr: state => {
  //   return (type, value, collection = "entities") => state[collection].find(page => {
  //     var attr = page.fields[type]
  //     if (!attr) return
  //     return attr === value
  //   })
  // },
}

// MUTTATIONS ------------------------------------------------------------------

export const mutations = {
  SET_STATE: (state, { prop, value }) => {
    state[prop] = value
  },

  SET_ENTITIES: (state, {locale, entities}) => {
    if(!state.entitiesByLocale) {
      state.entitiesByLocale = {}
    }

    state.entitiesByLocale[locale] = entities
  },

  SET_CURRENT_ENTITIES: (state, entities) => {
    state.entities = entities
  }
}

// ACTIONS  --------------------------------------------------------------------

export const actions = {
  SET_STATE ({ commit }, obj) {
    let value = Object.values(obj)[0]
    let prop = Object.keys(obj)
    commit('SET_STATE', { prop: prop, value: value })
  },

  async LOAD_ENTITIES({ commit, dispatch }, locale) {

    // get entities for active locale
    let rawEntities = await dispatch('LOAD_LOCALE', {
      locale,
      include: true
    })

    // get decorated entities
    let entities = await dispatch('DECORATE_ENTITIES', rawEntities)

    // commit decorated entities
    commit('SET_ENTITIES', {
      locale,
      entities
    })

    commit('SET_CURRENT_ENTITIES', entities)

    // load async other locales
    // dispatch('LOAD_OTHER_LOCALES', locale)
    // return decorated entities
    return entities
  },

  async LOAD_OTHER_LOCALES({ commit, dispatch }, currentLocale) {
    if (!localizationConfig.get('multilanguage')) {
      return
    }

    let locales = localizationConfig.get('locales')
    let promises = []

    forEach(locales, function (locale) {
      if (locale == currentLocale) {
        return
      }

      let promise = dispatch('LOAD_LOCALE', {
          locale,
          include: true,
          decorate: true
        })
        .then((entities) => {
          // set entities for this locales
          commit('SET_ENTITIES', {
            locale,
            entities
          })
          return entities
        })
      promises.push(promise)
    })

    if (promises.length > 0) {
      await Promise.all(promises)
    }
  },

  async LOAD_LOCALE({ dispatch }, params) {
    let locale = params.locale
    let include = params.include || true
    let decorate = params.decorate || false

    let queryObj = {
      'locale': locale
    }

    if (include) {
      queryObj.include = apiConfig.get('include').join(',')
    }

    if (apiConfig.get('default_status_filter').length > 0) {
      queryObj.status = apiConfig.get('default_status_filter').join(',')
    }

    // create query string from object
    let queryStr = Object.entries(queryObj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')

    // complete api url
    let apiUrl = `${process.env.CG_URL}api/delivery/entities?${queryStr}`

    // return cachios.get(apiUrl, {
    //   useCache: false,
    //   ttl: 1 // seconds
    // })

    let response = await cachiosInstance.get(apiUrl)
      .catch((e) => {
        console.log(e)
      })
    let entities = response.data.data.map(entity => {
      // iterate fields
      entity.fields = mapValues(entity.fields, value => {
        // find location fields and fix it
        if (isObject(value) && has(value, 'address_components')) {
          value = fixLocationField(value)
        }
        return value
      })
      return entity
    })

    if (decorate) {
      return await dispatch('DECORATE_ENTITIES', entities)
    }

    return entities
  },

  /**
   * Set URLs/slugs/parents for entities
   */
  DECORATE_ENTITIES({}, entities) {
    let urls = [];
    let decorateEntity = (entity) => {

      // ALREADY DECORATED
      // console.log("ENTITY _______", entity)
      if (!entity || entity.decorated) return entity


      // parse relations
      // -----------------------------------------------------------------------
      let getRelation = (field, key) => {
        if (isArray(field)) {
          return map(field, getRelation)
        }

        if (isObject(field) && field !== null) {
          if ('id' in field && 'type' in field && field.type == 'entity') {
            return decorateEntity(entities.find(e => e.id == field.id))
          }
        }

        return field
      }

      entity.fields = mapValues(entity.fields, getRelation)


      // SHUOLD HAVE URL
      // check if entity should have url
      let entityType = entity.entity_type
      let entitySet = entity.attribute_set_code
      let typeConfig
      // if config has defined entity_types/attribute_sets
      if (urlConfig.get('include').size > 0) {
        let includeConfig = urlConfig.get('include')

        if (!includeConfig.has(entityType)) {
          // if entity not in defined set -> skip
          return entity
        }

        typeConfig = includeConfig.get(entityType)

        if (typeConfig.get('attribute_sets').length > 0) {
          if (indexOf(typeConfig.get('attribute_sets'), entitySet) === -1) {
            // if entity not in defined set -> skip
            return entity
          }
        }
      }

      // SLUG
      let entitySlug
      // check if slug is taken or it needs to be generated
      if (urlConfig.get('slug_keys').length > 0) {
        forEach(urlConfig.get('slug_keys'), function (key) {
          if (!entitySlug && has(entity.fields, key) && isString(entity.fields[key]) && entity.fields[key].length > 0) {
            entitySlug = entity.fields[key]
          }
        })
      }

      // (optional) Generate slug
      // if config hasn't got defined slug attributes -> generate
      if (!entitySlug && urlConfig.get('title_keys').length > 0) {
        forEach(urlConfig.get('title_keys'), function (key) {
          if (!entitySlug && has(entity.fields, key) && isString(entity.fields[key]) && entity.fields[key].length > 0) {
            entitySlug = entity.fields[key].sanitize()
          }
        })
      }

      // if there are no defined title_keys or entity doesn't have title_key use primary_field
      if (!entitySlug && entity.primary_field && isString(entity.fields[entity.primary_field]) && entity.fields[entity.primary_field].length > 0) {
        entitySlug = entity.fields[entity.primary_field].sanitize()
      }

      // if entity's primary_attribute isn't a string skip
      if (!entitySlug) return entity

      // PARENT
      let parent
      let parentUrl = ''
      // if config doesn't have defined parent field -> skip
      if (urlConfig.get('parent_keys').length > 0) {
        // if entity doesn't have one of parent fields -> skip
        forEach(urlConfig.get('parent_keys'), function (key) {
          if (!parent && has(entity.fields, key) && isObject(entity.fields[key]) && entity.fields[key].id > 0) {
            // find parent by ID
            parent = entities.find(p => p.id === entity.fields[key].id)
            // if parent empty -> skip
            if (!parent) return

            // decorate parent
            parent = decorateEntity(parent)
            // take parent URL
            if (parent.unlocalizedUrl) {
              parentUrl = parent.unlocalizedUrl
            }
          }
        })
      }

      if (!parent && typeConfig.get('default_parent')) {
        // parent = getters.getByProp('id', typeConfig.get('default_parent'), 'rawEntities')
        parent = entities.find(p => p.id === typeConfig.get('default_parent'))

        if (parent) {
          // decorate parent
          parent = decorateEntity(parent)
          // take parent URL
          if (parent.unlocalizedUrl) {
            parentUrl = parent.unlocalizedUrl
          }
        }
      }

      if (!parent && typeConfig.get('default_parent_by_set')) {
        // parent = getters.getByProp('attribute_set_code', typeConfig.get('default_parent_by_set'), 'rawEntities')
        parent = entities.find(p => p.attribute_set_code === typeConfig.get('default_parent_by_set'))
        if (parent) {
          // decorate parent
          parent = decorateEntity(parent)
          // take parent URL
          if (parent.unlocalizedUrl) {
            parentUrl = parent.unlocalizedUrl
          }
        }
      }

      // URL
      let entityUrl
      let entityUnlocalizedUrl
      let urlPrefix = (typeConfig.get('default_url_prefix')) ? '/' + typeConfig.get('default_url_prefix') : ''
      // take parent URL and entity slug and combine them to unique URL for the entity
      entityUrl = '/' + entity.locale + urlPrefix + parentUrl + '/' + entitySlug
      entityUnlocalizedUrl = urlPrefix + parentUrl + '/' + entitySlug
      urls.push(entityUrl)
      // make absolute & relative URLS

      // attach slug, url, and parent to entity
      entity.slug = entitySlug
      entity.url = entityUrl
      entity.unlocalizedUrl = entityUnlocalizedUrl
      entity.parent = parent
      entity.decorated = true


      // return
      return entity
    }



    // parse
    each(entities, decorateEntity)

    // order
    // let orderedEntities = orderBy(entities, function (item) {
    //   return 'order' in item.fields ? parseInt(item.fields.order) : 0
    // })
    // console.log('DEFINED URLS: ', urls)

    return entities
  },

  CHANGE_LOCALE({ getters, commit }, locale) {
    let entities = getters.getEntitiesByLocale(locale)

    commit('SET_CURRENT_ENTITIES', entities)
  }
}
