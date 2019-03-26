<template>
	<intersect
		:threshold="threshold"
		@enter="onEnter"
		@leave="onLeave"
		@change="onChange">
		<section
			:class="{ 'page-section--inview' : isIntersecting }"
			class="page-section">
			<slot></slot>
		</section>
	</intersect>
</template>

<script>
export default {
	name: 'page-section',
	data: () => ({
		isIntersecting: false
	}),
	props: {
		threshold: {
			type: Array,
			required: false,
			default: () => [0]
		},
		isLight: {
			type: Boolean,
			default: true
		}
	},
	computed: {},
	watch: {
		isIntersecting (val) {
			this.$emit('intersect', val)
		}
	},
	mounted () {
		// this.initAppHeaderObserver()
	},
	methods: {
		onEnter (entry) {
			this.isIntersecting = true
			this.$emit('enter', entry)
		},
		onLeave (entry) {
			this.isIntersecting = false
			this.$emit('leave', entry)
		},
		onChange (entry) {
			this.$emit('change', entry)
		}
	}
}
</script>

<style lang="scss" scoped>
.page-section {
	position: relative;
	width: 100%;
	padding-left: $grid-gutter-width / 2;
	padding-right: $grid-gutter-width / 2;

	// vertical padding
	padding-top: 2rem;
	padding-bottom: 2rem;

	overflow: hidden;

	@include media-breakpoint-up(md) {
		padding-left: $width-unit;
		padding-right: $width-unit;

		// vertical padding
		padding-top: $width-unit * 2;
		padding-bottom: $width-unit * 2;
	}
}
</style>
