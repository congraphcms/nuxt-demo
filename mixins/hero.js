

const hero = {
  // data: () => ({
	// 	isLight: false
	// }),
  props: {
    isLight: {
      type: Boolean,
      default: () => false
    }
  },
  mounted () {
    this.setTheme()
  },
  methods: {
    setTheme () {
      this.$store.commit('SET_STATE', {
        prop: 'isHeroLight',
        value: this.isLight
      })
    }
  }
}

export default hero
