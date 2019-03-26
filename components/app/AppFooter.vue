<template>
  <footer class="app-footer">
    <div class="grid-container">
      <div class="row no-gutters">
        <div class="col-sm-6 col-md-3 col--branding">
          <div class="col--branding__inner">
            <div class="col-header">
              <a href="/" class="logo-link">
                <img src="/img/logo-white.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col--nav">
          <div class="col-header">
            <h4 class="footer-header" v-html="menu.fields.label" />
          </div>
          <div class="col-body">
            <app-footer-nav
              :items="menuNavItems"/>
          </div>
        </div>
      </div>
      <div class="copy-row row no-gutters">
        <div class="col-md-9">
          <p
            v-html="$t('footerCopy')"
            class="copy"/>
        </div>
        <div class="col-md-3">
          <no-ssr>
            <div class="language-nav">
              <span class="language-label">{{ $t('Language') }}</span>
              <nav
                class="locale-nav">
                <div
                  class="locale-nav__item"
                  v-for="(locale, index) in locales"
                  :key="index">
                  <change-language-link :locale="locale"/>
                </div>
              </nav>
            </div>
          </no-ssr>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import AppFooterNav from '@/components/app/AppFooterNav'

export default {
  name: 'AppFooter',
  components: {
    AppFooterNav
  },
  computed: {
    locales() {
			return this.$store.getters.locales
		},
    menu () {
      return this.$store.getters.getMenu('main-menu')
    },
    menuItems () {
      return this.menu.fields.menu_items
    },
    menuNavItems () {
      return this.menuItems.map( item => {
        return {
          to: item.fields.linked_page.url,
          text: item.fields.label
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  // background: $dark;
  background: #19171c;
  font-size: $font-size-sm;
  color: $white;

  padding-left: 15px;
  padding-right: 15px;

	@include media-breakpoint-up(md) {
		// padding-left: $width-unit * 2;
		// padding-right: $width-unit;
	}

  .grid-container {
    position: relative;
    width: 100%;
    padding-left: 0;
    padding-right: 0;

    @include media-breakpoint-up(xl) {
      padding-left: $width-unit;
      padding-right: $width-unit;
    }

    .col {


      &.col--branding {

        .col--branding__inner {

          @include media-breakpoint-up(xl) {
            margin-left: -($width-unit * 4);
          }
        }

      }

      &.col--nav {
      }
    }
  }

  .col-header {
    padding: 2rem 0 1rem;
    border-bottom: 1px solid rgba($white, 0.06);

    @include media-breakpoint-up(md) {
      padding: 3rem 0 2rem;
    }

    @include media-breakpoint-up(xl) {
      padding: 4rem 0 3rem;
    }

    .logo-link {
      img {
        max-height: 24px;
        width: auto;
      }
    }
  }

  .col-body {
    padding: 1rem 0 2rem;

    @include media-breakpoint-up(md) {
      padding: 2rem 0 3rem;
    }

    @include media-breakpoint-up(xl) {
      padding: 3rem 0 4rem;
    }
  }

  .footer-header {
    color: rgba(255,255,255, 0.36);
    font-size: 12px; // @TODO replace with var
    line-height: 2;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    margin: 0;
  }

  // @TODO delete
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    // link
    a.list-item {
      display: inline-block;
      padding: 3px 0;
      margin-bottom: 0.5rem;
      color: white;
      text-decoration: none;
    }
  }
}

.more {
  color: rgba($white, 0.36);
  text-decoration: none;
  font-size: 14px;
}


.copy-row {
  border-top: 1px solid rgba($white, 0.06);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.copy {
  display: block;
  font-size: $font-size-sm;
  margin-bottom: 0;
  padding: 0.5rem 0;
  color: rgba($white, 0.36);
}


.language-nav {
  display: flex;
  flex-direction: row;
  align-items: center;

  @include media-breakpoint-up(md) {
    // justify-content: flex-end;
  }

  .language-label {
    padding-right: 1rem;
    color: rgba($white, 0.36);
  }

  .locale-nav {
    display: flex;
    flex-direction: row;

    .locale-nav__item {


      .change-language-link {
        display: block;
        padding: 0.5rem;
        color: inherit;
        text-decoration: none;
      }
    }
  }

}
</style>
