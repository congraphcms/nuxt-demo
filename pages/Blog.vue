<template>
	<page-wrapper class="page--blog">

		<div class="cover">
			<img :src="model.fields.og_image.url | fileApi" />
		</div>
		<!-- PAGE SECTIONS -->
		<page-section>
			<grid-container>
				<div class="intro">
					<h1>{{model.fields.title}}</h1>
				</div>
				<div class="row">
					<div
						v-for="(post, index) in posts"
						:key="index"
						class="blog__post col-md-6" >
						<post-card
							:post="post"
							:index="index"/>
					</div>
				</div>
			</grid-container>
		</page-section>
		<!-- PAGE SECTIONS -->

	</page-wrapper>
</template>

<script>
import basePage from '@/mixins/basePage'
import PostCard from '@/components/post/PostCard'

export default {
	name: 'Blog',
	mixins: [
		basePage
	],
	components: {
		PostCard
 	},
	data: () => ({
		page: 1,
		perPage: 20
	}),
 	computed: {
 		posts () {
 			return this.$store.getters.posts
 		}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.page--blog {

	.cover {

		img {
			width: 100%;
			height: 40vw;
			object-fit: cover;
		}
	}

	.intro {
		margin-bottom: $width-unit * 2;
	}
}

.blog__post {
	margin-bottom: $width-unit;
}
</style>
