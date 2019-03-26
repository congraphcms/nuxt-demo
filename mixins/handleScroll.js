
const handleScroll = {

  mounted () {
    this.scrollHandler()
    window.addEventListener('scroll', this.scrollHandler, true)
  },
  methods: {
    scrollHandler () {
      let doc = document.documentElement
      let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

      this.$store.dispatch('app/SET_STATE', {
        scrollTop: top,
        scrollLeft: left
      })
    }
  }
}

export default handleScroll
