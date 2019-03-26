<template>
  <div
    ref="holder"
    class='parallax-wrapper'
    :class="classObject">
    <div
      ref="parallax"
      class="parallax"
      :style="styleObject">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import imagesLoaded from 'imagesloaded';

export default {
  name: 'parallax',
  data: () => ({
    /**
     * $el Height / width
     *
     * set at resizeHandler
     * @type {Number}
     */
    refElSize: 0,
    /**
     * Component $el bounds
     *
     * getBoundingClientRect
     * set at resizeHandler
     * @type {Object}
     */
    bounds: {},
    /**
     * Distance from page top to the top of the $el
     *
     * set at resizeHandler
     * @type {Number}
     */
    refBound: 0
  }),

  mounted() {
    if (!this.$store) throw new Error('This component requires a Vuex store')

    // console.log("parallax mounted")
    this.initParallax()

    this.$bus.$on('resize', this.resizeHandler)

    this.$watch(vm => [self.refSize, self.pageHeight, self.pageWidth].join(), val => {
      self.$nextTick(self.resizeHandler)
    })
  },

  watch: {
    scrollOffset(top) {}
  },

  props: [
    'addition',
    'speedFactor',
    'wrapped',
    'absolute',
    'offset',
    'className',
    'global',
    'topOffset',
    'horizontal',
    'toEnd'
  ],

  computed: {
    classObject() {
      return [
        this.className,
        {
          'wrapped': this.wrapped,
          'not-wrapped': !this.wrapped,
          'position-absolute': this.absolute
        }
      ]
    },

    styleObject() {
      return {
        transform: this.elTransform,
        left: `${this.elLeft}px`,
        top: `${this.elTop}px`,
        height: `${this.elHeight}px`,
        width: `${this.elWidth}px`
      }
    },

    topProp() {
      return this.horizontal ? 'scrollLeft' : 'scrollTop'
    },

    scrollOffset() {
      return this.$store.getters['app/getState'](this.topProp)
    },

    pageHeight() {
      return this.$store.getters['app/getState']('pageHeight')
    },

    pageWidth() {
      return this.$store.getters['app/getState']('pageWidth')
    },

    /**
     * Viewport size property
     * @return {String}
     */
    refProp() {
      return this.horizontal ? 'viewportWidth' : 'viewportWidth'
    },

    /**
     * Viewport width/height
     * @return {Number}
     */
    refSize() {
      return this.$store.getters['app/getState'](this.refProp)
    },

    extraOffset() {
      return this.addition ? this.addition :
        this.horizontal && !this.wrapped ? 600 : 0
    },

    elTransform() {
      let bound = this.topOffset || this.refBound
      let start = bound - this.refSize
      let isClose = bound === 0
      start = this.offset || isClose ? 0 : start
      let end = start + this.refSize
      end += this.refElSize
      end += this.wrapped ? 0 : this.move / 2

      let percentage = this.scrollProgress(start, end, this.scrollOffset)
      let currentMove = Math.ceil(this.move * percentage);
      let x = this.horizontal ? currentMove : 0
      let y = !this.horizontal ? currentMove : 0

      return `translate3d(${x}px, ${y}px, 0px)`
    },

    speedMultiplier() {
      return this.horizontal ? 0.5 : 1
    },

    move() {
      return this.global ?
        this.refSize * this.speedFactor * this.speedMultiplier :
        this.refElSize * this.speedFactor * this.speedMultiplier
    },

    elHeight() {
      return this.getSize(this.horizontal);
    },

    elWidth() {
      return this.getSize(!this.horizontal)
    },

    elTop() {
      return this.getOffset(this.horizontal)
    },

    elLeft() {
      return this.getOffset(!this.horizontal)
    }
  },

  beforeDestroy() {
    this.$bus.$off('resize', this.resizeHandler)
  },

  methods: {
    onLoaded(e) {
      // console.log('[paralax] imagesLoaded', e)
      this.$nextTick(this.resizeHandler)
    },
    getSize(ignore) {
      if (!this.wrapped || ignore) return
      //
      let newh = (this.offset || this.refBound == 0) && !this.toEnd ?
        this.refElSize :
        Math.ceil(this.refElSize + Math.abs(this.move))

      return newh || ''
    },

    getOffset(ignore) {
      let m = -this.move

      return ((this.offset || this.refBound == 0)) || ignore ? 0 :
        this.wrapped && m > 0 ? 0 :
        this.wrapped ? m :
        Math.round(m / 2)
    },

    initParallax() {
      var self = this
      // console.log("parallax inited")
      self.resizeHandler()

      imagesLoaded(this.$el, this.onLoaded)
    },

    // returning the scroll progress from 0 to 1 in between start/end pixels
    scrollProgress(start, end, scrollOffset) {
      scrollOffset = scrollOffset || this.scrollOffset
      let factor = (end - start) / 100
      let scrollStart = (scrollOffset - start) / factor
      let percentage = (scrollOffset >= start && scrollOffset <= end) ? scrollStart / 100 :
        (scrollOffset > start) ? 1 : 0

      return percentage
    },

    resizeHandler() {
      if (!this.$el) return

      this.bounds = this.$el.getBoundingClientRect()

      if (this.horizontal) {
        this.refBound = this.bounds.left + this.scrollOffset
        // this.refBound = this.bounds.left == 0 ? this.bounds.left : this.bounds.left + this.scrollOffset
        this.refElSize = this.$el.offsetWidth
      } else {
        // $el top (from page top)
        this.refBound = this.bounds.top + this.scrollOffset
        // $el height
        this.refElSize = this.$el.offsetHeight
      }
    }

  }
}
</script>

<style lang="scss" scoped="">
.parallax-wrapper {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  .isMobile {
    &>.parallax {
      height: 100%!important;
      transform: none!important;
      top: 0!important;
    }
  }

  @include media-breakpoint-down(sm) {
    &.not-wrapped {
      &>.parallax {
        transform: none!important;
        top: 0!important;
      }
    }
  }
}

.hidden {
  visibility: hidden;
}

.wrapped {
  overflow: hidden;
  // z-index: -1;
}

.parallax {
  position: relative;
  will-change: transform;
  backface-visibility: hidden; // transition: transform .3s ease-out;
  height: 100%;
}

img {
  width: 100%;
}

// ------------
// .debug {
//   position: absolute;
//   top: auto;
//   bottom: 0;
//   right: 0;
//   padding: 1rem;
//   background: rgba(#000, 0.8);
//   z-index: 99;
//   color: $white;
//
//   td {
//     padding: 6px 8px;
//   }
// }
</style>
