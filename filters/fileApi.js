import getAssetUrl from '@/utils/cms/getAssetUrl'

// @SEE '@/utils/cms/getAssetUrl'
export default function fileApi(asset, version) {
  return getAssetUrl(asset, version)
}
