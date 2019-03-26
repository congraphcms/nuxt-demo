// Common functions
// plus global mixin - framework
import Vue from 'vue'
import framework from '@/mixins/framework'
import getCMSAssetUrl from '@/utils/cms/getAssetUrl'
let removeDiacritics = require('diacritics').remove

const common = {
  install (options) {

    String.prototype.sanitize = function () {
      let g = removeDiacritics(this)
      return g.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    }

    Vue.prototype.convertToSlug = (text) => {
      return text ? text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : null
    }

    // capitalize first letter
    Vue.prototype.capitalize = (string) => {
      if (typeof string !== "string") return string
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    Vue.prototype.getHostName = (url) => {
      var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2]
      }
      return null
    }

    // Image Helpers
    // -------------------------------------------------------------------------

    /**
     * Load image using promise
     *
     * Usage:
     * ```
     * loadImage("example.com/test.jpg")
     *   .then(img => console.log(`w: ${img.width} | h: ${img.height}`))
     *   .catch(err => console.error(err));
     * ```
     *
     * @param  {String} url Image url
     * @return {Promise}
     */
    Vue.prototype.loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve(img))
        img.addEventListener('error', err => reject(err))
        img.src = url
      })
    }


    Vue.prototype.loadImages = (urls) => {
      let promises = []

      urls.forEach(url => {
        let promise = new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => { resolve(url) }
          img.onerror = () => { reject(url) }
          img.src = url
        })
        promises.push(promise)
      })

      return promises
    }

    // Register framework as a global mixin
    Vue.mixin(framework)

    // CMS Helpers
    // -------------------------------------------------------------------------
    Vue.prototype.getCMSAssetUrl = getCMSAssetUrl

  }
}

Vue.use(common)
