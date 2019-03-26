<template>
	<nuxt-link
		:to="to"
		class="nav-item">
		<div class="nav-item__inner">
			<span class="text" v-html="text" />
			<span class="line"/>
		</div>
		<div class="extra">
			<slot></slot>
		</div>
	</nuxt-link>
</template>

<script>
export default {
	name: 'AnimatedLink',
	props: {
		to: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-item {
	position: relative;
	display: flex;
	color: inherit;
	text-decoration: none;
	overflow: hidden;
	flex-direction: column;
    align-items: flex-start;
    font-size: 1rem;
    margin-bottom: 1rem;

	.nav-item__inner {
		display: inline-block;
		position: relative;
		padding-bottom: 0.5rem;

		.line {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 2px;
			background: $red;
			transform-origin: center left;
			transform: scaleX(0);
			transition: transform 0.6s ease-in-out;
		}
	}

	// state

	&:hover {
		color: inherit;
		text-decoration: none;

		.nav-item__inner {
			.line {
				transform: scaleX(1);
			}
		}
	}

	&.active {

		.nav-item__inner {
			.line {
				transform: scaleX(1);
			}
		}
	}
}
</style>
