<template>
	<page-wrapper class="page--article">

		<div class="cover">
			<img :src="coverImage" />
		</div>
		<!-- PAGE SECTIONS -->
		<page-section>
			<grid-container>
				<div class="breadcrumbs">
					<nuxt-link
						:to="parent.url">
						&#x2190; {{$t('back to')}} {{parent.fields.title}}
					</nuxt-link>
				</div>
				<div class="intro">
					<h1>{{title}}</h1>
				</div>
				<div class="content" v-html="content" />
			</grid-container>
		</page-section>
		<!-- PAGE SECTIONS -->

	</page-wrapper>
</template>

<script>
import basePage from '@/mixins/basePage'
import postModelMixin from '@/mixins/cms/PostModel'

export default {
	name: 'Article',
	mixins: [
		basePage,
		postModelMixin
	],
	components: {
		
	},
	computed: {
	}
}
</script>

<style lang="scss" scoped>
.page--article {
	.breadcrumbs {
		margin-bottom: 1rem;
	}
	
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
</style>
