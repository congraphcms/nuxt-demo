<template>
  <div class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar'
// import OverscrollPlugin from '@/plugins/overscroll'

export default {
  name: "SmoothScroll",
  data: () => ({
    speed: 600,
    defaults: {
      damping: .1,
      renderByPixels: true,
      continuousScrolling: true
    }
  }),
  props: [
    'customOptions',
    'preventEvents',
    'scrollTo'
  ],
  computed: {
    smoothOptions() {
      return Object.assign({}, this.defaults, this.customOptions)
    },
    transitioning() {
      return this.$store.getters['app/getState']('transitioning')
    },
    // temp solution
    page() {
      return this.$store.getters['app/getState']('activePage')
    }
  },
  watch: {
    scrollTo(y) {
      this.scrollbar.scrollTo(0, y, 600)
    },
    page(newPage, oldPage) {
      // console.log('[SmoothScroll] page changed')
    }
  },
  beforeDestroy() {
    this.$bus.$off("updateScrollbar")
  },

  mounted() {
    this.initSmooth()
  },
  methods: {
    initSmooth() {
      var self = this

      // if(process.client) {
      //   Scrollbar.use(OverscrollPlugin)
      //   this.smoothOptions.plugins = {
      //     overscroll: {
      //       enable: true,
      //       maxOverscroll: 150,
      //       damping: .2
      //     }
      //   }
      // }

      this.scrollbar = Scrollbar.init(this.$el, this.smoothOptions)

      this.$bus.$on("updateScrollbar", e => {
        // console.log('[SmoothScroll] update by $bus')
        this.scrollbar.update();
      })

      if (this.preventEvents) return

      this.scrollbar.addListener((status) => {
        if (self.transitioning) return
        self.$store.dispatch('app/SET_STATE', {
          scrollTop: status.offset.y
        })
      })

      // at the start
      this.$store.dispatch('app/SET_STATE', {
        scrollTop: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped="">
.scroll-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
