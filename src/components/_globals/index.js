// base icons is always rendered in the application and does not need to be imported each time
// as a normal component would have to

import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// require in a base component context
const requireComponent = require.context(
  // get all components thats in the folder and starts with base- and ends in .vue
  // example _base-button.vue
  '.', false, /base-[\w]+\.vue$/
)

// loop through all components that match the requireComponent pattern
requireComponent.keys().forEach(fileName => {
  // get component config
  const componentConfig = requireComponent(fileName)

  // get PascalCase name of component
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )

  // register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})