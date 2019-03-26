function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const encodeSvgDataUri = function(svgStr) {

  // URIs as defined by RFC 3986 (see Section 2: Characters)
  // may contain any of the following characters:
  // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=`.

  // According to Taylor Hunt, lowercase gzips better ... my tiny test confirms this

  let encoded = svgStr.replace(/\s+/g, " ")
  encoded = replaceAll(encoded, "%", "%25")
  encoded = replaceAll(encoded, "> <", "><") // normalise spaces elements
  encoded = replaceAll(encoded, "; }", ";}") // normalise spaces css
  encoded = replaceAll(encoded, "<", "%3c")
  encoded = replaceAll(encoded, ">", "%3e")
  encoded = replaceAll(encoded, "\"", "'")
  encoded = replaceAll(encoded, "#", "%23") // needed for ie and firefox
  encoded = replaceAll(encoded, "{", "%7b")
  encoded = replaceAll(encoded, "}", "%7d")
  encoded = replaceAll(encoded, "|", "%7c")
  encoded = replaceAll(encoded, "^", "%5e")
  encoded = replaceAll(encoded, "`", "%60")
  encoded = replaceAll(encoded, "@", "%40")

  // charset reportedly not needed ... I need to test before implementing
  return 'url("data:image/svg+xml;charset=UTF-8,' + encoded + '")'
}

export default encodeSvgDataUri
