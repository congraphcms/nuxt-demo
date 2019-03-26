<template>
	<page-wrapper class="page--contact">

		<!-- PAGE HERO -->

		<!-- PAGE HERO -->

		<!-- PAGE SECTIONS -->
		<section-contact-form />
		<section-contact-location :model="model"/>
		<no-ssr placeholder="google map...">
			<section-contact-map :marker="model.fields.location"/>
		</no-ssr>
		<!-- PAGE SECTIONS -->

	</page-wrapper>
</template>

<script>
import basePage from '@/mixins/basePage'

import SectionContactForm from '@/components/contact/SectionContactForm'
import SectionContactLocation from '@/components/contact/SectionContactLocation'
import SectionContactMap from '@/components/contact/SectionContactMap'

export default {
	mixins: [
		basePage
	],
 	components: {
		SectionContactForm,
		SectionContactLocation,
 		SectionContactMap
 	}
}
</script>

<style lang="scss" scoped>
.page--contact {

}
</style>
