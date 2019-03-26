const pkg = require('./package')
const path = require('path')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  server: {
    port: process.env.APP_PORT, // default: 3000
    host: process.env.APP_HOST // default: localhost
    // timing: process.env.TIMING_HEADER
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Default Meta Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=latin-ext' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
   ** Build configuration
   */
  router: {
    // middleware: 'i18n',
    extendRoutes(routes, resolve) {
      // @TODO here we may fetch the pages and create the custom routes
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/_page.vue')
      })
    }
    // scrollBehavior: function (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
  },

  /*
  ** Global CSS
  */
  css: ['@/assets/scss/app.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuex-router-sync.js',
    '~/plugins/eventBus',
    '~/plugins/i18n.js',
    '~/plugins/common.js',
    '~/plugins/vee-validate.js',
    '~/plugins/global-filters.js',
    '~/plugins/global-components.js',
    '~/plugins/autoload-pages.js',
    '~/plugins/gmaps.js',
    {
      src: '~/plugins/intersection-observer',
      ssr: false
    }
  ],

  styleResources: {
    scss: [
      '~assets/scss/design.scss'
    ]
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    ['@nuxtjs/dotenv', { /* module options */ }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {

    extractCSS: {
      allChunks: true
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    // Resolve vue2-google-maps issues (server-side)
    // @see https://github.com/xkjyeah/vue-google-maps#nuxtjs-config
    transpile: [/^vue2-google-maps($|\/)/],

    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {

      // Resolve vue2-google-maps issues (server-side)
      // - an alternative way to solve the issue
      // -----------------------------------------------------------------------
      // config.module.rules.splice(0, 0, {
      //   test: /\.js$/,
      //   include: [path.resolve(__dirname, './node_modules/vue2-google-maps')],
      //   loader: 'babel-loader',
      // })
    }
  }
}
