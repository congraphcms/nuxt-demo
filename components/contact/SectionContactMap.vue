<template>
  <page-section class="section--contact-map">
    <grid-container>
      <div class="map-wrapper">
        <GmapMap
          ref="map"
          :options="options"
          :center="marker.geometry.location"
          :zoom="zoom"
          @zoom_changed="onZoomChanged"
          map-type-id="terrain"
          style="width: 100%; height: 100%">
          <GmapMarker
            :position="marker"
            :clickable="true"
            :draggable="false"
            @click="onMarkerClick(marker)" />
        </GmapMap>
      </div>
    </grid-container>
  </page-section>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import mapStyles from '@/data/mapStyles'

export default {
  name:'SectionContactMap',
  data: () => ({
    options: {
      styles: mapStyles,
      scrollwheel: false,
      mapTypeControl: false
    },
    places: [],
    zoom: 15
  }),
  props: {
    marker: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
    onZoomChanged(zoom) {
      // fix
      // ie. when changed via gmap zoom controls
      if (this.zoom !== zoom) {
        this.zoom = zoom
      }
    },
    zoomIn() {
      this.zoom++
    },
    zoomOut() {
      this.zoom--
    },
    onMarkerClick(marker) {
      this.center = marker
      this.zoom = 15
    },
    fitBounds() {
      if (!this.$mapObject) return

      // create bounds object
      let bounds = new google.maps.LatLngBounds()
      // iterate markers / extend bounds
      this.markers.forEach((marker, index) => {
        // console.log('extending bounds', marker)
        bounds.extend(marker)
      })
      // fit bounds
      this.$mapObject.fitBounds(bounds)
    }
  },
  mounted() {
    // get mapObject
    // @see https://github.com/xkjyeah/vue-google-maps#basic-usage--documentation
    this.$mapObject = null
    this.$refs.map.$mapPromise.then((map) => {
      this.$mapObject = map
      // this.fitBounds()
    })
  },
  watch: {
    // activeLocation: function(newMarker, oldMarker) {
    //   const self = this
    //   if (newMarker !== null) {
    //     this.$nextTick(() => {
    //       self.center = newMarker
    //       self.zoom = 15
    //     })
    //   } else {
    //     self.fitBounds()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.section--contact-map {
  position: relative;
  height: 80vh;
  padding-top: 0;
  padding-right: 0;
  overflow: hidden;
  background: transparent;

  &:before {
    content: "";
    position: absolute;
    top: $width-unit * 4;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: $dark;
    z-index: 0;
  }

  .grid-container {
    position: relative;
    height: 100%;
    z-index: 1;

    @include media-breakpoint-up(xl) {
      padding-left: $width-unit * 2;
    }

    .map-wrapper {
      position: relative;
      height: 100%;
    }
  }
}
</style>
