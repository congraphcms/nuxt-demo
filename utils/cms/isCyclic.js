
/**
 *
 * From: http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
 *
 * @param  {Object}  obj Object to check
 * @return {Boolean}
 */
function isCyclic (obj) {
  var seenObjects = []

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true
      }
      seenObjects.push(obj)
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true
        }
      }
    }
    return false
  }

  return detect(obj)
}

export default isCyclic
