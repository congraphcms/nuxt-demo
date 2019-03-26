// @TODO remove lodash dependency
import { uniq, isNumber } from 'lodash'
import removeDuplicates from '@/utils/removeDuplicates'

const getUniqueValues = function(collection, field) {
  // A quick tip to remove all falsy (false, null, undefined, 0, NaN or
  // an empty string) items out of an array
  collection = collection.filter(Boolean)
  if (!collection.length) return

  let values = collection
    // pluck field values
    .map((model, key) => model.fields[field])
    // remove falsy values, except for numbers - keep '0'
    .filter(value => value || isNumber(value))

  let uniqueValues = uniq(values).sort()

  // make sure that object values (ie. relation) are trully unique
  return this.removeDuplicates(uniqueValues, 'id')
}

export default getUniqueValues
