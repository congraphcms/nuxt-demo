<template>
	<nuxt-link
		:to="postUrl"
		class="post-link"
		tag="div">
		<div class="post-card">
			<div class="image-container">
				<img
					:src="coverImage"
					class="image"/>
			</div>
			<div class="content">
				<h3 class="post-title">{{ title }}</h3>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
import postModelMixin from '@/mixins/cms/PostModel'

export default {
	name: 'PostCard',
	mixins: [
		postModelMixin
	],
	props: {
		post: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			default: 0
		}
	},
	computed: {}
	// created() {},
	// mounted() {}
}
</script>

<style lang="scss" scoped>
.post-link {
	display: block;
	text-decoration: none;
	color: inherit;
	cursor: pointer;
}

.post-card {
	position: relative;

	.image-container {
		position: relative;
		width: 100%;
		overflow: hidden;
		padding-top: 100% / (16 / 9);

		.image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.content {
		width: 100%;
		box-sizing: border-box;

		.post-title {
			width: 80%;
			height: 2.4 * 1.75rem;
			overflow: hidden;
			margin-bottom: 2rem;
		}
	}
}
</style>
