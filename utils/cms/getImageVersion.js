import getAttribute from './getAttribute'
import { isArray } from 'lodash'

// Congraph CMS helper
const getImageVersion = function(model, key, version, index) {
  if (!model) return false

  let attrs = model.fields || {}
  let value = false

  // asset
  let attr = model.type === 'file' ? model : getAttribute(model, key)

  if (attr) {
    if (isArray(attr)) {
      let i = index || 0
      attr = attr[i]
    }

    if (!attr) {
      console.warn('no image found at current index')
      return false
    }

    value = process.env.apiUrl + 'api/delivery/' + attr.url
    value += version ? '?v=' + version + '_image' : ''
  } else {
    console.warn('no image found')
  }

  return value
}

export default getImageVersion
