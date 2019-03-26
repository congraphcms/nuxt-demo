<template>
	<form class="form form--general">
		<div class="row">
			<div
				v-for="(input, index) in inputs"
				:key="index" 
				:class="input.class">
				<div class="form-group">
					<label :for="index">
						{{input.label}}
					</label>
					<component
						:is="input.component"
						v-bind="input.options" 
						class="form-control"/>
				</div>
			</div>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-block btn-lg btn-primary">{{$t('contactFormBtnLabel')}}</button>
		</div>
	</form>
</template>

<script>
export default {
	name: 'FormGeneral',
	data: () => ({}),
	computed: {
		inputs() {
			return {
				name: {
					class: "col-md-6",
					component: "input",
					label: this.$t('contactForm.name.label'),
					options: {
						type: "text",
						name: "name",
						required: true,
						placeholder: this.$t('contactForm.name.placeholder')
					},
				},
				company: {
					class: "col-md-6",
					component: "input",
					label: this.$t('contactForm.company.label'),
					options: {
						type: "text",
						name: "company",
						placeholder: this.$t('contactForm.company.placeholder')
					},
				},
				email: {
					class: "col-md-6",
					component: "input",
					label: this.$t('contactForm.email.label'),
					options: {
						type: "email",
						name: "email",
						required: true,
						placeholder: this.$t('contactForm.email.placeholder')
					},
				},
				phone: {
					class: "col-md-6",
					component: "input",
					label: this.$t('contactForm.phone.label'),
					options: {
						type: "text",
						name: "phone",
						placeholder: this.$t('contactForm.phone.placeholder')
					},
				},
				message: {
					class: "col-md-12",
					component: "textarea",
					label: this.$t('contactForm.message.label'),
					options: {
						name: "message",
						required: true,
						rows: 3,
						placeholder: this.$t('contactForm.message.placeholder')
					},
				}
			}
		}
	},
	components: {},
}
</script>

<style lang="scss" scoped>
.form--general {

	.form-group {

		label {
			font-size: $font-size-sm;
			font-weight: normal;
		}

	}

	.form-control {
		border-radius: 0;
		// border-width: 0 0 2px 0;
	}

	.form-actions {
		padding-top: 2rem;

		.btn {
			border-radius: 0;
		}
	}

}
</style>
