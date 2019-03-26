// import EventBus from '@/config/event-bus'
import urlConfig from '@/config/urls'
import templateConfig from '@/config/templates'
import isLocale from '@/utils/cms/isLocale'
import metaConfig from '@/config/meta'
import MetaHelper from '@/utils/cms/metaHelper'
import getLocaleFromRoute from '@/utils/cms/getLocaleFromRoute'
import { has, isString } from 'lodash'

const baseApp = {
  watch: {
    page(val) {
      if (!val) return
      this.$store.dispatch('app/SET_STATE', { activePage: val })
      this.$store.dispatch('UPDATE_ACTIVE_PAGE_TRANSLATIONS')
    }
  },
  created() {
    const self = this
    const route = self.$store.state.route.path

    // get locale from route
    // @see /mixins/framework.js
    const locale = this.getLocale(route)

    // set locale
    // local method, handles vee-validate and i18n
    self.setLocale(locale, false)

    // @TODO create locale mutation/action and move this there
    // this.$store.dispatch('UPDATE_ACTIVE_PAGE_TRANSLATIONS')

    self.$nextTick(() => {
      this.$store.dispatch('app/SET_STATE', {
        activePage: this.page
      })
    })

    self.$store.subscribe((mutation, state) => {
      if (mutation.type == 'entities/SET_ENTITIES') {
        self.$store.dispatch('UPDATE_ACTIVE_PAGE_TRANSLATIONS')
      }
    })
  },
  mounted() {
    this.resizeHandler()
    this.$validator.localize(this.locale)

    window.addEventListener('resize', this.resizeHandler, true)
  },
  computed: {
    locale() {
      return this.$store.getters.locale
    },
    rawEntities() {
      return this.$store.getters['entities/getRawEntities']
    },
    entities() {
      return this.$store.getters['entities/getEntities']
    },
    page() {
      // @TODO do not change state from the comupted property!
      return this.parseUrlPath()
    },
    pageTemplate() {
      if (!this.page) return

      let template

      for (const [rule, settings] of templateConfig) {
        switch (rule) {
          case "template_keys":
            for (const templateField of settings) {
              if (
                templateField in this.page.fields &&
                isString(this.page.fields[templateField]) &&
                this.page.fields[templateField].length > 0
              ) {
                template = this.page.fields[templateField]
                break
              }
            }
            break
          case "template_set_map":
            if (settings.has(this.page.attribute_set_code)) {
              template = settings.get(this.page.attribute_set_code)
              break
            }
            break
          case "template_type_map":
            if (settings.has(this.page.entity_type)) {
              template = settings.get(this.page.entity_type)
              break
            }
            break
        }
      }

      // handle 404
      if (!template) {
        if (
          templateConfig.has('default_template') &&
          templateConfig.get('default_template').length > 0
        ) {
          // console.log(templateConfig.get('default_template') + " Template")
          return templateConfig.get('default_template')
        }
        // console.log(templateConfig.get('not_found_template') + " Template")
        return templateConfig.get('not_found_template')
      }

      template = this.capitalize(template)
      let templateExists = template in this.$options.components

      // let mobileTemplate = template + "Mobile"
      // let mobileTemplateExists = _.has(this.$options.components, mobileTemplate)
      // return mobile template for mobile if such template exists
      // if (mobileTemplateExists && this.$device.isMobile){
      //   return mobileTemplate
      // }

      // handle 404
      if (!templateExists) {
        return templateConfig.get('not_found_template')
      }

      // console.log(template + " Template")
      return template
    }
  },
  methods: {
    parseUrlPath() {
      // depends on vue-router-sync
      let route = this.$store.state.route.path
      // console.log('[baseApp] parseUrlPath route', route)

      // @TODO trim "/" from start/end

      // check if there is only locale present in the url
      let routeSegments = route.split('/')
      if (routeSegments[0] === '') {
        routeSegments.shift()
      }

      // console.log('[baseApp] routeSegments (shifted)', routeSegments)

      if (routeSegments.length > 1 && routeSegments[routeSegments.length - 1] === '') {
        routeSegments.pop()
      }

      // console.log('[baseApp] routeSegments (popped)', routeSegments)

      let locale = getLocaleFromRoute(route)
      // console.log('[baseApp] locale', locale)

      if(locale && locale != this.locale) {
        // console.log('[baseApp] change locale', locale, this.locale)
        this.setLocale(locale)
      }

      let onlyLocale = false

      // do we need to check for locale in url
      if (urlConfig.get('localized_urls')) {
        // check if we have only a locale in the path (e.g. "/en_US" )
        let firstSegment = routeSegments[0]
        if (isLocale(firstSegment)) {
          onlyLocale = routeSegments.length === 1
          // routeSegments.shift()
        } else {
          // @TODO change...
          routeSegments.unshift(this.locale)
        }
      }

      //  ['', '/', '/en_US'] should all go to home page
      if (!route.length || route.length < 2 || onlyLocale) {
        let homeUrl = urlConfig.get('home_url')
        if (urlConfig.get('localized_urls')) {
          homeUrl = homeUrl.get(this.locale)
        }

        route = '/' + this.locale + '/' + homeUrl;
      } else {
        route = '/' + routeSegments.join('/')
      }

      let page = this.$store.getters['entities/getByUrl'](route)
      // console.log('ACTIVE PAGE', page.url, route)

      return page
    },
    setLocale (locale) {
      this.$store.dispatch('CHANGE_LOCALE', locale)
      // @TODO centralize this around a single point (store)
      this.$validator.localize(locale)
      this.$i18n.locale = locale
    }
  }
}

export default baseApp
