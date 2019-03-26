/**
 * Returns absolute asset url
 *
 * Takes relative url or asset object and returns
 * absolute url to backend delivery File API
 *
 * Usage:
 * fileApi('files/image.jpeg');
 * => https://api.backend.com/api/delivery/files/image.jpeg
 *
 * fileApi(post.fields.cover_image, 'large');
 * => https://api.backend.com/api/delivery/files/image.jpeg?v=large
 *
 * @param  {Object|String}  asset       Asset object or relative url
 * @param  {String}         [version]   Optional asset verions (images only)
 * @return {String}                     Absolute asset url
 */
export default function getAssetUrl(asset, version) {
  if (!asset) return

  let relativeUrl = (typeof asset === 'object') ? asset.url : asset
  let absoluteUrl = `${process.env.CG_URL}api/delivery/${relativeUrl}`

  if (version && version.length > 0) {
    // @TODO urlencode version
    absoluteUrl += `?v=${version}`
  }

  return absoluteUrl
}
