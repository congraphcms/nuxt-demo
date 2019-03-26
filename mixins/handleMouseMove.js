
const handleMouseMove = {

  mounted () {
    const self = this
    self.mouseMoveHandler()
    window.addEventListener('mousemove', this.mouseMoveHandler)
  },
  methods: {
    mouseMoveHandler (event = {}) {
      const self = this
      let posX = 0
      let posY = 0

      if (event && 'clientX' in event) {
        posX = event.clientX
        posY = event.clientY
      }

      self.$store.dispatch('SET_STATE', {
        mouseX: posX,
        mouseY: posY
      })
    }
  }
}

export default handleMouseMove
