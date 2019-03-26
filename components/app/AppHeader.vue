<template>
	<header class="app-header">
		<div class="app-header__side">
			<div class="app-header__side__hamburger">
				<hamburger @click.native.prevent="toggleMainMenu"/>
			</div>
			<div class="app-header__side__logo">
				<nuxt-link :to="homeLink" class="home-link">
					<img src="/img/logo-red.png" class="app-logo"/>
				</nuxt-link>
			</div>
		</div>
		<div class="app-header__main">
			<app-navbar/>
			<no-ssr>
				<div class="app-nav-locale">
					<ul class="locale-nav">
						<li class="locale-nav__item" v-for="(locale, index) in locales" :key="index">
							<change-language-link :locale="locale"></change-language-link>
						</li>
					</ul>
				</div>
			</no-ssr>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from '@/components/Hamburger'
import AppNavbar from '@/components/app/AppNavbar'

export default {
	name: 'AppHeader',
	components: {
		Hamburger,
		AppNavbar
	},
	data: () => ({
		maindisplay: false,
		topdisplay: true
	}),
	computed: {
		...mapState([
			'isMainMenuOpen'
		]),
		scrollTop () {
			return this.$store.getters['app/getState']('scrollTop')
		},
    locales() {
			return this.$store.getters.locales
		},
		homeLink() {
			let isDefault = this.$store.getters.locale == this.$store.getters.defaultLocale
			return isDefault ? '/' : '/' + this.$store.getters.locale
		},
	},
	methods: {
		toggleMainMenu () {
			this.$store.commit('SET_STATE', {
	    	prop: 'isMainMenuOpen',
	    	value: !this.isMainMenuOpen
	    })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

// layout
.app-header {
	display: flex;
	width: 100%;
	height: $header-height;
	flex-direction: row;
	align-items: center;
	position: fixed;
	z-index: 9990;
	padding: 0;
	background: #ccc;

	@include media-breakpoint-up(sm) {
		height: $header-height-sm;
	}

	// mobile to desktop layout
	@include media-breakpoint-up(md) {
		height: $header-height-md;
	}

	@include media-breakpoint-up(lg) {
		height: $header-height-lg;
	}

	@include media-breakpoint-up(xl) {
		height: $header-height-xl;
	}

	.app-header__side {
		position: relative;
		height: 100%;
		width: 100%;
		flex: 0 0 100%;
		display: flex;
		flex-direction: row;
		z-index: 998;


		@include media-breakpoint-up(md) {
			flex: 0 0 auto;
			width: auto;
		}

		.app-header__side__hamburger {
			height: 100%;
			flex: 0 0 $header-height;
			min-width: $header-height;
			max-width: $header-height;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			order: 3;
			margin-left: auto;
			z-index: 1;

			@include media-breakpoint-up(md) {
				flex: 0 0 auto;
				order: 1;
				margin-left: 0;
				padding: 0 2rem;
			}
		}

		.app-header__side__logo {
			height: 100%;
			flex: 0 0 auto;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 1rem;
			order: 1;
			z-index: 1;

			@include media-breakpoint-up(md) {
				order: 2;
			}
		}
	}

	.app-header__main {
		display: none;

		@include media-breakpoint-up(md) {
			display: flex;
			height: 100%;
			flex: 1;
		}
	}
}

.home-link {
	display: block;
	border: none;
	text-decoration: none;
	padding: 0.25rem; // 4px

	@include media-breakpoint-up(md) {
		padding: 0.25rem;
		margin-left: -0.25rem;
	}

	.app-logo {
		height: 24px;
		width: auto;
	}
}

.app-nav-locale {
	margin-left: auto;
	padding: 0 1rem;

	.locale-nav {
		display: flex;
		flex-direction: row;
		list-style: none;
		margin: 0;
		padding: 0;
		height: 100%;

		.locale-nav__item {
			display: flex;
			align-items: center;
			padding: 1rem 0.5rem;
			// color: $white;
			font-size: $font-size-sm;

			.change-language-link {
				color: inherit;
				text-decoration: none;
			}
		}
	}
}

</style>
