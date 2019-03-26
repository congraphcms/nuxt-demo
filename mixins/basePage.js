// import $ from 'jquery'
// import imagesLoaded from 'imagesloaded'

const basePage = {
  props: {
    model: {
      type: Object
    }
  },
  computed: {
    /**
     * Return pageComponents field
     * @TODO move to pageComponentsMixin.js
     * @return {Array} Array of page components (entities)
     */
    pageComponents () {
      return this.getAttribute(this.model, 'page_components')
    },
    transitioning () {
      return this.$store.getters['app/getState']('transitioning')
    }
  },
  // created () {},
  mounted () {
    const self = this

    // console.log('[basePage] page mounted')
    this.$bus.$emit('updateScrollbar')

    this.$store.dispatch('app/SET_STATE', {
      scrollTop: 0
    })

    this.$nextTick(() => {
      this.resizeHandler()
    })

    // @TODO enable imagesLoaded
    // imagesLoaded(this.$el, () => {
    //   self.resizeHandler()
    // })

    this.$bus.$on('resize', self.resizeHandler)
  },
  beforeDestroy() {
    this.$bus.$off('resize', this.resizeHandler)
  },
  destroyed () {},
  methods: {
    resizeHandler () {
      let wrapper = this.$el

      if ('pageWrapper' in this.$refs) {
        wrapper = this.$refs.pageWrapper
      }

      this.$store.dispatch('app/SET_STATE', {
        pageWidth: wrapper.clientWidth,
        pageHeight: wrapper.clientHeight
      });
    }
  }
}

export default basePage
