<template>
	<nuxt-link :to="url" class="btn">
		<span :style="buttonStyleObject" class="text-button__text">
			{{ this.text }}
		</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'text-button',
	props: {
		text: {
			type: String,
			required: true
		},
		url: {
			type: String,
			default: '#'
		},
	},
	computed: {
		buttonStyleObject () {
			return {
				// color: this.textColor,
				// background: this.background,
				// borderColor: this.borderColor
			}
		}
	}

}
</script>

<style lang="scss" scoped>
.btn {
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 14px;
}
</style>
