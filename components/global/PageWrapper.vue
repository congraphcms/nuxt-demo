<template>
	<div class="page">
		<div
			ref="pageWrapper"
			class="page-wrapper">
	      <slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageWrapper',
	mounted() {}
}
</script>

<style lang="scss" scoped>
.page {
	position: relative;
	height: 100%;
	overflow-x: hidden;
}

.page-wrapper {
	margin-top: $header-height;
	// padding: 4vw 8vw;

	@include media-breakpoint-up(sm) {
		margin-top: $header-height-sm;
	}

	// mobile to desktop layout
	@include media-breakpoint-up(md) {
		margin-top: $header-height-md;
	}

	@include media-breakpoint-up(lg) {
		margin-top: $header-height-lg;
	}

	@include media-breakpoint-up(xl) {
		margin-top: $header-height-xl;
	}
}
</style>
