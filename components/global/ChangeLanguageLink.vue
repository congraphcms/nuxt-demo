<template>
	<component
    :is="linkComponent"
    :to="translationUrl"
    class="change-language-link">
    {{ $t(`locales.${locale}`) }}
  </component>
</template>

<script>
export default {
	name: 'change-language-link',
	props: {
    locale: {
      type: String,
      required: true
    }
  },

  computed: {
    linkComponent() {
      if(!this.translationUrl) {
        return 'span'
      }

      return 'nuxt-link'
    },
    translationUrl() {
      // return this.$store.state.app[this.locale + '_translation']
      let url = this.$store.getters['app/TranslationUrl'](this.locale)
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
