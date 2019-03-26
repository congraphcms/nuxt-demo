
const handleResize = {
  mounted () {
    this.$nextTick(this.resizeHandler)

    window.addEventListener('resize', this.resizeHandler, true)
  },
  methods: {
    resizeHandler () {
      const self = this

      const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

      self.$store.dispatch('app/SET_STATE', {
        viewportWidth: width,
        viewportHeight: height
      })

      self.$nextTick(() => { self.$bus.$emit('resize') })
    }
  }
}

export default handleResize
