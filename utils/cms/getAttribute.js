// Congraph CMS helper
const getAttribute = function(model, key) {
  let attrs = (model && model.fields) || {}
  let value = false

  if (key in attrs) {
    value = attrs[key]
    if (value === 0) {
      value = false
    }
  }

  return value
}

export default getAttribute
