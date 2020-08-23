<template>
  <component 
    :is="type"
    :to="to"
    :type="buttonType"
    class="inline-flex items-center flex-shrink-0 text-sm font-medium leading-5 transition duration-150 ease-in-out"
    :class="renderClasses()"
    v-on="$listeners"
  >
    <slot>Button</slot>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    // designates the button as icon - round and flat
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    // applies the light theme variant to the button, usually used as a secondary action
    light: {
      type: Boolean,
      required: false,
      default: false,
    },
    // will decide wether the button is set as <button> or <router-link> as well as decide the route
    to: {
      type: [String, Object],
      required: false,
      default: null
    },
    // sets the button type e.g. submit, button etc
    buttonType: {
      type: String,
      required: false,
      default: 'button'
    },
    // removes padding and hover state
    // should only be used when icon is active
    plain: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    // set the button as <button> or <router-link> dependant on props passed
    type() {
      if (this.to) {
        return 'router-link'
      } else {
        return 'button'
      }
    },
  },
  methods: {
    // render classes based on props
    renderClasses() {
      if (this.icon) {
        if (this.plain && this.light) return 'text-gray-300 hover:text-gray-500 tesyt'

        if (this.light) return 'rounded-full p-2 hover:bg-gray-100 text-gray-600'
        if (this.plain) return 'text-gray-700 hover:text-gray-900'

        return 'rounded-full p-2 hover:bg-gray-900'

      } else {
        if (this.light) {
          return 'rounded-md px-4 py-2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:border-gray-400 focus:shaow-outline-gray active:bg-gray-100 active:border-gray-400'
        } else {
          return 'rounded-md px-4 py-2 text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900'
        }
      }
    }
  }
}
</script>