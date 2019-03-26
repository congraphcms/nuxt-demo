// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.
import Vue from 'vue'

try {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const components = require.context(
    // Look for files in the components/globals directory
    '@/pages',
    // Do not look in subdirectories
    false,
    // include all .vue files starting with Capital letter
    /[A-Z]\w+\.(vue)$/
  )

  components.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = components(fileName)
    const componentName = fileName
      .split('/')
      .pop()
      .split('.')[0]
    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
} catch(err) {
  console.log('ERROR: autoload pages', err)
}
