<template>
  <div id="app">
    <app-header/>
    <app-main-menu v-if="isMainMenuOpen"/>
    <smooth-scroll>
      <div class="app-wrapper">
        <custom-transition>
          <component
            :is="pageTemplate"
            :key="pageKey"
            :model="page"/>
        </custom-transition>
        <app-footer />
      </div>
    </smooth-scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import baseApp from '@/mixins/baseApp'
import pageHead from '@/mixins/pageHead'
import handleResize from '@/mixins/handleResize'
import handleScroll from '@/mixins/handleScroll'
// components
import AppHeader from '@/components/app/AppHeader'
import AppMainMenu from '@/components/app/AppMainMenu'
import AppFooter from '@/components/app/AppFooter'
import CustomTransition from '@/components/transitions/CustomTransition'

export default {
  mixins: [
    baseApp,
    pageHead,
    handleResize,
    handleScroll
  ],
  components: {
    AppHeader,
    AppMainMenu,
    AppFooter,
    CustomTransition
  },
  data:() => ({
    debug: false,
    showCookie: false
  }),
  computed: {
    ...mapState([
      'isMainMenuOpen'
    ]),
    pageKey() {
      let key = this.page ? this.page.url : null
      // CUSTOM TRANSITION PAGES
      // stay on the same template and don't do the default transition
      // if (this.page && this.page.attribute_set_code === 'news_article') {
      //   key = 'blog'
      // }
      return key
    },
    gdprVisible() {
      return this.$store.getters['app/getState']('gdprVisible')
    },
    isShrinked() {
      return this.$store.getters["app/getState"]("scrollTop") > 30
    }
  },
  mounted() {
    const self = this
    self.$nextTick(() => {
      self.resizeHandler()

      if(!self.$store.getters['entities/hasAllLocales']) {
        self.$store.dispatch('entities/LOAD_OTHER_LOCALES', this.$store.getters.Locale)
      }

    })

    if (!this.entities.length) {
      // console.warn("API fetch didn't finish on server side")
      this.$store.dispatch('entities/LOAD_ENTITIES', this.$store.getters.Locale)
    }
    // this.showCookie = !cookies.get('showCookie')
  },
  methods: {
    cookieClick() {
      this.showCookie = false
      // cookies.set('showCookie', true)
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100vh;
  overflow-x: hidden;
}

.scroll-wrapper {
  height: 100%;
}

.app-wrapper {
  min-height: 100vh;
  display:flex;
  flex-direction: column;

  .page {
    margin-bottom: auto;
  }
}


.debug {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  background: rgba(#000, 0.8);
  z-index: 99;
  color: $white;
  font-size: 80%;

  td {
    padding: 6px 8px;
  }
}
</style>
