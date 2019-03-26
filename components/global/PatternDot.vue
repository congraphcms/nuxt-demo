<script>
import encodeSvgDataUri from '@/utils/image/encodeSvgDataUri'

export default {
  name: 'PatternDot',
  props: {
    size: {
      type: Number,
      default: 12
    },
    dotSize: {
      type: Number,
      default: 1
    },
    background: {
      type: String,
      default: 'transparent'
    },
    foreground: {
      type: String,
      default: '#000'
    },
    opacity: {
      type: Number,
      default: 0.6
    }
  },
  computed: {
    styleObject() {
      // if (process.server) return {}

      const w = this.size
      const cx = this.size / 2
      const r = this.dotSize

      let svgStr = `
        <svg
          width='${w}'
          height='${w}'
          viewBox='0 0 ${w} ${w}'
          xmlns='http://www.w3.org/2000/svg'>
          <g fill='${this.foreground}' fill-opacity='${this.opacity}' fill-rule='evenodd'>
            <circle cx='${cx}' cy='${cx}' r='${r}'/>
          </g>
        </svg>`

      return {
        'background-color': this.background,
        'background-image': encodeSvgDataUri(svgStr)
      }
    }
  },
  render: function (createElement) {
    return createElement(
      'div',
      {
        class: 'svg-pattern--dot',
        style: this.styleObject
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.svg-pattern--dot {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
