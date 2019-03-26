// common methods
import Vue from 'vue'
import isLocale from '@/utils/cms/isLocale'
import getLocaleFromRoute from '@/utils/cms/getLocaleFromRoute'
import removeDuplicates from '@/utils/removeDuplicates'
import getUniqueValues from '@/utils/cms/getUniqueValues'
import getAttribute from '@/utils/cms/getAttribute'
import getImageVersion from '@/utils/cms/getImageVersion'

const framework = {
  methods: {
    isLocale(segment) {
      return isLocale(segment)
    },
    getLocale(route) {
      return getLocaleFromRoute(route)
    },
    removeDuplicates(myArr, prop) {
      return removeDuplicates(myArr, prop)
    },
    getUniqueValues(collection, filterName) {
      return getUniqueValues(collection, filterName)
    },
    getAttribute(model, key) {
      return getAttribute(model, key)
    },
    getImageVersion(model, key, version, index) {
      return getImageVersion(model, key, version, index)
    }
  }
}

export default framework
