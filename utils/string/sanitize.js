const sanitize = function() {
  let g = removeDiacritics(this)
  return
  g.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
