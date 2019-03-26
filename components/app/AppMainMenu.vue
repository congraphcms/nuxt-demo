<template>
	<transition
		v-on:enter="enterMenu"
    v-on:leave="leaveMenu"
    v-bind:css="false">
		<div class="app-main-menu">
			<div class="cell--main-nav">
				<div class="nav-wrapper">
					<span
						v-html="mainMenu.fields.label"
						class="nav-title"/>
					<nav class="nav nav--primary">
						<app-main-menu-item
							v-for="(item, index) in mainMenuItems"
							:key="index"
							ref="primaryNavItem"
							:to="item.fields.linked_page.url"
							:text="item.fields.label"/>
					</nav>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { TweenMax, TimelineMax } from 'gsap'
import AppMainMenuItem from '@/components/app/AppMainMenuItem'

export default {
	name: 'app-main-menu',
	components: {
		AppMainMenuItem
	},
	data: () => ({}),
	computed: {
    mainMenu() {
      return this.$store.getters.getMenu('main-menu')
    },
    mainMenuItems() {
      return this.mainMenu.fields.menu_items
    }
	},
	watch: {
		'$route' (to, from) {
			const self = this
			setTimeout(() => {
				self.$store.commit('SET_STATE', {
		    	prop: 'isMainMenuOpen',
		    	value: false
		    })
      }, 500);

		}
	},
	mounted () {

	},
	methods: {
		enterMenu (el, done) {
			this.initAnimation(el, done)
			this.animateIn()
		},
		leaveMenu (el, done) {
			TweenMax.to(el, .3, {
	      opacity: 0,
	      onComplete: () => {
          done()
	      }
      })
		},
		initAnimation (el, done) {
			const self = this

			// Get items
			// (this.$refs.___NavItem - array of compoents)
			const primaryNavItems = this.$refs.primaryNavItem.map(c => c.$el)

			TweenMax.set(primaryNavItems, { opacity: 0, y: 32 })

			self.$timeline = new TimelineMax({
				paused: true,
				delay: 0,
				onComplete: () => {
					done()
				}
			})

			self.$timeline
				.staggerTo(primaryNavItems, 1.2, {
					y: 0,
					opacity: 1,
					ease: 'Power4.easeOut',
					clearProps: 'all'
				}, 0.05)
		},
		animateIn () {
			this.$timeline.play()
		},
		animateOut () {
			this.$timeline.reverse()
    }
	}
}
</script>

<style lang="scss" scoped>
.app-main-menu {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 9980;
	background: $white;
	display: flex;
	align-items:  center;
	justify-content: center;
}

.nav-wrapper {
	position: relative;
	padding: 1rem 0;

	.nav-title {
		display: block;
		font-size: $small-font-size;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 2rem;
		color: #9d9d9d;
	}

	.nav {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.nav--primary {
		margin-bottom: 1rem;

		@include media-breakpoint-up(md) {
			margin-bottom: 2rem;
		}

		.nav-item {
			font-size: 24px;
			line-height: 24px;
			font-weight: 700;
			margin-bottom: 1rem;

			@include media-breakpoint-up(md) {
				font-size: 36px;
				line-height: 40px;
				font-weight: 700;
				margin-bottom: 1rem;
			}
		}
	}

}

</style>
