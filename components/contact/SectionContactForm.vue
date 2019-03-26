<template>
	<page-section class="section--contact-form">
		<grid-container>
			<h1
				ref="title"
				v-html="$t('Contact Us')"/>

			<div class="row">
				<div class="col-md-9">
					<div class="form-container">
						<form-general />
					</div>
				</div>
			</div>

		</grid-container>
	</page-section>
</template>

<script>

import FormGeneral from '@/components/contact/FormGeneral'

export default {
	name: 'SectionContactForm',
	components: {
		FormGeneral
	}
}
</script>

<style lang="scss" scoped>
.section--contact-form {
	padding-top: $width-unit * 4;
	background: $light;

	.section__title {
		font-weight: 700;
	}

	.form-container {
		width: 100%;
		padding-top: 2rem;
	}

}
</style>
