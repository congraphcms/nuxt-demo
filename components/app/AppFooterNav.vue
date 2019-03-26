<template>
  <nav class="app-footer-nav">
    <nuxt-link
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      class="app-footer-nav__item">
      {{ item.text }}
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'app-footer-nav',
  data: () => ({
    defaultItemOptions: {
      to: '/',
      text: '',
      title: '',
      className: ''
    }
  }),
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.app-footer-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.app-footer-nav__item {
  display: block;
  text-decoration: none;
  padding: 3px 0;
  margin-bottom: 0.5rem;
  color: rgba($white, 0.8);
  transition: color .2s linear;

  &:hover {
    color: $white;
    text-decoration: none;
  }
}
</style>
