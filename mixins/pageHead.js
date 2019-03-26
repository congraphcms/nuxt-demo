import metaConfig from '@/config/meta'
import MetaHelper from '@/utils/cms/metaHelper'
import { has, isString } from 'lodash'

const pageHead = {

  head () {
    if (!this.page) return {}

    let headData = {
      meta: [],
      link: []
    }

    // META ------------------------------------------------------------------

    // Title
    headData.title = MetaHelper.getMetaTitle(this.page, metaConfig, this.locale)
    // Meta Description
    headData.meta.push(
      MetaHelper.getMetaDescription(this.page, metaConfig, this.locale)
    )

    // Open Graph META -------------------------------------------------------

    // OG Title
    headData.meta.push(
      MetaHelper.getOGTitle(this.page, metaConfig, this.locale)
    )
    // OG Description
    headData.meta.push(
      MetaHelper.getOGDescription(this.page, metaConfig, this.locale)
    )
    // OG Image
    headData.meta.push(
      MetaHelper.getOGImage(this.page, metaConfig, this.locale)
    )

    // Open Graph Meta
    headData.meta.push(MetaHelper.getOGUrl(this.page))
    headData.meta.push(MetaHelper.getOGLocale(this.locale))
    headData.meta.push(MetaHelper.getOGType(metaConfig))
    headData.meta.push(MetaHelper.getOGSiteName(metaConfig, this.locale))

    // Twitter Card META -----------------------------------------------------

    // Twitter Title
    headData.meta.push(
      MetaHelper.getTwitterTitle(this.page, metaConfig, this.locale)
    )
    // Twitter Description
    headData.meta.push(
      MetaHelper.getTwitterDescription(this.page, metaConfig, this.locale)
    )

    // Twitter Meta
    headData.meta.push(MetaHelper.getTwitterImage(this.page, metaConfig))
    headData.meta.push(MetaHelper.getTwitterUrl(this.page))
    headData.meta.push(MetaHelper.getTwitterCard(metaConfig))

    // -----------------------------------------------------------------------

    return headData
  }
}

export default pageHead
