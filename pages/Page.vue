<template>
	<page-wrapper class="page--default">

    <page-section>
      <grid-container>
        <h1>{{model.fields.title}}</h1>
        <div class="content" v-html="model.fields.content"/>
      </grid-container>
    </page-section>
  </page-wrapper>
</template>

<script>
import basePage from '@/mixins/basePage'

export default {
  mixins: [
    basePage
  ],
  components: {},
  data: () => ({}),
  computed: {
    lead() {
      return '[HC] Mmmmmmmmmm'
    },
    content() {
      return '[HC] Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  }
}
</script>

<style lang="scss" scoped>
.page--default {

}
</style>
