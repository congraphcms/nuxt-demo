<template>
	<page-section class="section--contact-locations">
		<grid-container>
			<div class="locations-header">
				<h2
					ref="title"
					v-html="$t('Location')"/>
			</div>
			<div class="location-container">
				<location-card
					:location="model" />
			</div>
		</grid-container>
	</page-section>
</template>

<script>
import LocationCard from '@/components/contact/LocationCard'

export default {
	name: 'SectionContactLocation',
	props: {
		model: {
			type: Object,
			required: true
		}
	},
	components: {
		LocationCard
	},
	computed: {
		locations() {
			return this.$store.getters.stateLocations
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.section--contact-locations {
	// padding-top: 0;
	background: transparent;
	overflow: visible;
}


</style>
