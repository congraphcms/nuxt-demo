<script>
import Vue from 'vue'

const warn = (msg) => {
  if (!Vue.config.silent) {
    console.warn(msg)
  }
}

/**
 *
 * ```
 * <template>
 *   <intersect
 *     :threshold="[0.4, 0.6]"
 *     @enter="msg = 'Intersected'"
 *     @leave="msg = 'Not intersected'">
 *     <div>{{ msg }}</div>
 *   </intersect>
 * </template>
 * ```
 *
 * @type {String}
 */
export default {
  name: 'intersect',
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0, 0.2]
    },
    root: {
      // type: HTMLElement,
      type: Object,
      required: false,
      default: () => null
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px'
    }
  },
  created () {
    if (process.server) return
    this.observer = new IntersectionObserver(entries => {
      let entry = entries[0]
      if (!entry.isIntersecting) {
        this.$emit('leave', entry)
      } else {
        this.$emit('enter', entry)
      }

      this.$emit('change', entry)
    }, {
      threshold: this.threshold,
      root: this.root,
      rootMargin: this.rootMargin
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        warn('[Intersect] You may only wrap one element in a <intersect> component.')
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        warn('[Intersect] You must have one child inside a <intersect> component.')
        return
      }

      this.observer.observe(this.$slots.default[0].elm)
    })
  },
  destroyed () {
    this.observer.disconnect()
  },
  render () {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
</script>
