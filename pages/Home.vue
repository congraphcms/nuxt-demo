<template>
	<page-wrapper class="page--home">

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
  components: {
    
  },
  // data: () => ({}),
  props: [
    'model'
  ],
  computed: {
  }
  // created () {},
  // updated () {}
}
</script>

<style lang="scss" scoped>

</style>
