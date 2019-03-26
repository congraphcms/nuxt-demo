<template>
	<button
		class="hamburger hamburger--slider"
		type="button"
		aria-label="Menu"
		aria-controls="navigation"
		:aria-expanded="isMainMenuOpen ? 'true' : 'false'"
		:class="{ 'is-active': isMainMenuOpen }">
		<span class="hamburger-box">
			<span class="hamburger-inner"></span>
		</span>
	</button>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'hamburger',
	computed: {
		...mapState([
      'isMainMenuOpen'
    ]),
	}
}
</script>

<style lang="scss" scoped>
// Settings
// ==================================================
$hamburger-padding-x           : 0.5rem !default;
$hamburger-padding-y           : 0.5rem !default;
$hamburger-layer-width         : 22px !default;
$hamburger-layer-height        : 2px !default;
$hamburger-layer-spacing       : 6px !default;
$hamburger-layer-color         : $body-color !default;
$hamburger-layer-border-radius : 0 !default;
$hamburger-hover-opacity       : 1 !default;
$hamburger-active-layer-color  : $black !default;
$hamburger-active-hover-opacity: 1 !default;
// Types
// ==================================================
$hamburger-types: ( slider ) !default;

@import "~hamburgers/_sass/hamburgers/hamburgers";

// overrides
.hamburger {
	outline: none;
	line-height: 0;
}
</style>
