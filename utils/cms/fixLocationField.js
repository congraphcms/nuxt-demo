import { pick } from 'lodash'

/**
 * Transforms location field value
 *
 * There was an issue with toJSON key in location object.
 *
 * @param  {Object} value Original object value
 * @return {Object}       Object with picked keys
 */
function fixLocationField (value) {

  let address = pick(value, [
    'address_components',
    'formatted_address'
  ])

  let geometry = pick(value.geometry, ['location'])

  return {
    ...address,
    geometry
  }
}

export default fixLocationField
