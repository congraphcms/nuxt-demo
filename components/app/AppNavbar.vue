<template>
	<nav
		:style="{ transform: `translateY(${translateY}px)` }"
		:class="classObj"
		class="navbar">
		<ul class="list">
			<li
				ref="item"
				v-for="(menuItem, index) in menuItems"
				:key="index"
				class="list__item">
				<nuxt-link
					:to="menuItem.fields.linked_page.url"
					class="list__item__link">
					{{ menuItem.fields.label }}
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TweenMax, TimelineMax } from 'gsap'

export default {
	name: 'app-navbar',
	data: () => ({
		hideAfter: 64,
		isHidden: true
	}),
	computed: {
		...mapState([
			'isHeroLight'
		]),
		translateY () {
			let y = this.$store.getters['app/getState']('scrollTop')
			return -(Math.max(0, Math.min(y, 100))) * 0.66
		},
		scrolled () {
			return this.$store.getters['app/getState']('scrollTop') > this.hideAfter
		},
		themeClass () {
			return this.isHeroLight ? 'light' : 'dark'
		},
		classObj () {
			return [
				this.themeClass,
				{
					'hide' : this.isHidden,
					'scrolled' : this.scrolled
				}
			]
    },
		page() {
			// console.log("ACTIVE PAGE", this.$store.getters.ActivePage)
			return this.$store.getters.ActivePage
    },
    menu() {
      return this.$store.getters.getMenu('main-menu')
    },
    menuItems() {
      return this.menu.fields.menu_items
    }
	},
	mounted () {
		this.initAnimation()
		this.playAnimation()
	},
	methods: {
		initAnimation () {
			const self = this

			// get items
			// const els = this.$el.querySelectorAll('.list__item')
			const els = this.$refs.item

			// set initial state
			TweenMax.set(els, { opacity: 0, x: -32 })

			self.$timeline = new TimelineMax({
				paused: true,
				delay: 1,
				onStart: () => {
					// this will remove .hide class from the root el.
					self.isHidden = false
				}
			})

			self.$timeline
				.staggerTo(els, 1.2, {
					x: 0,
					opacity: 1,
					ease: 'Power4.easeOut',
					clearProps: "all"
				}, 0.05)
		},
		playAnimation () {
			this.$timeline.play()
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	display: flex;
	align-items: center;
	padding: 1rem;
	z-index: 2;

	.list {
		list-style: none;
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 14px;
		line-height: 20px;

		.list__item {
			display: flex;
			box-sizing: border-box;
			cursor: pointer;

			.list__item__link {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				color: $white;
				text-decoration: none;
				padding: 1rem;
			}
		}
	}
}

// themes
.navbar {

	.list {
		.list__item {
			.list__item__link {
				transition: color 0.3s linear;
			}
		}
	}

	&.light {
		.list {
			.list__item {
				.list__item__link {
					color: $body-color;
				}
			}
		}
	}

	&.dark {
		.list {
			.list__item {
				.list__item__link {
					color: $white;
				}
			}
		}
	}

}

// animation
.navbar {
	// transition: transform .6s ease-in-out;
	&.scrolled {
		// transform: translateY(-100%);
	}

	&.hide {
		visibility: hidden;
		opacity: 0;
	}
}
</style>
