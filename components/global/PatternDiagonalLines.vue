<script>
import encodeSvgDataUri from '@/utils/image/encodeSvgDataUri'

export default {
  name: 'PatternDiagonalLines',
  props: {
    size: {
      type: Number,
      default: 22
    },
    lineWidth: {
      type: Number,
      default: 2
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
      const boxW = this.size
      const lineW = this.lineWidth

      // Main line
      // ie. "M5 0h1L0 6V5z"
      let d1 = `M${boxW - lineW} 0h${lineW}L0 ${boxW}V${boxW - lineW}z`

      // Corner line
      // ie. "M6 5v1H5z"
      let d2 = `M${boxW} ${boxW - lineW}v${lineW}H${boxW - lineW}z`

      // Complete
      // d="M5 0h1L0 6V5zM6 5v1H5z"
      const d = d1 + d2

      let svgStr = `
        <svg
          width='${boxW}'
          height='${boxW}'
          viewBox='0 0 ${boxW} ${boxW}'
          xmlns='http://www.w3.org/2000/svg'>
          <g
            fill='${this.foreground}'
            fill-opacity='${this.opacity}'
            fill-rule='evenodd'>
            <path d='${d}'/>
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
        class: 'svg-pattern--diagonal-lines',
        style: this.styleObject
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.svg-pattern--diagonal-lines {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
