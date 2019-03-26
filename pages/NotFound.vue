<template>
  <div class="page page--not-found">
    <h1 class="error">404 Not Found</h1>
  </div>
</template>

<script>
import basePage from '@/mixins/basePage'

export default {
  name: 'not-found',
  mixins: [
    basePage
  ],
  components: {}
}
</script>

<style lang="scss" scoped>
.error {
	padding-top: $width-unit * 4;
}
</style>
