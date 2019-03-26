<template>
	<div class="location-card">
		
		<div class="location-address">
			<p v-html="location.fields.address" class="address-street"/>
		</div>
		<div class="location-country">
			<hp v-html="location.fields.country" class="country"/>
		</div>
		<div class="location-contact">
			<div class="tel-wrapper">
				<a :href="`tel:${location.fields.phone}`" class="tel-link">{{ location.fields.phone }}</a>
			</div>
			<div class="email-wrapper">
				<a :href="`mailto:${location.fields.email}`" class="email-link">{{ location.fields.email }}</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'LocationCard',
	props: {
		location: {
			type: Object,
			required: true
		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.location-card {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;

	.location-index {
		font-size: $font-size-sm;
		font-family: $font-family-monospace;
		color: $text-muted;
		margin-bottom: 1rem;
	}

	.location-country {
		padding-bottom: 2rem;
		margin-bottom: auto;

		.country {
			margin: 0;
			max-width: 10rem;
		}
	}

	.location-company {
		margin-bottom: 1rem;

		.company-name {
			font-size: $font-size-sm;
			margin-bottom: 0;
		}
	}

	.location-address {

		p {
			margin-bottom: 0;
		}

		.address-street {}
		.address-city {}
	}

	.location-contact {

		.tel-wrapper {
			margin-bottom: 0.5rem;

			.tel-link {
				color: inherit;
			}
		}

		.email-wrapper {}
	}

	.location-actions {
		padding-top: 2rem;
	}

}
</style>
