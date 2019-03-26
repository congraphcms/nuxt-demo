<template>
	<div class="grid-container">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'grid-container',
	props: {}
}
</script>

<style lang="scss" scoped>
.grid-container {
	position: relative;
	width: 100%;
	padding-left: 0;
	padding-right: 0;

	@include media-breakpoint-up(xl) {
		padding-left: $width-unit * 2;
		padding-right: $width-unit * 2;
	}
}
</style>
