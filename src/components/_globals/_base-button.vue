<template>
  <component 
    :is="type"
    :to="to"
    :active-class="activeClass"
    :type="buttonType"
    class="inline-flex items-center flex-shrink-0 transition duration-150 ease-in-out"
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
    activeClass: {
      type: String,
      required: false,
      default: null
    },
    // sets the button type e.g. submit, button etc
    buttonType: {
      type: String,
      required: false,
      default: 'button'
    },
    // removes button styling, padding and hover state
    plain: {
      type: Boolean,
      required: false,
      default: false
    },
    // render button as white text with white borders and transparent background
    outlined: {
      type: Boolean,
      required: false,
      default: false,
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
        if (this.plain && this.light) return 'appearance-none text-gray-300 hover:text-gray-400'
        if (this.light) return 'appearance-none rounded-full p-2 hover:bg-gray-100 text-gray-400'
        if (this.plain) return 'appearance-none text-gray-700 hover:text-gray-900'

        return 'appearance-none rounded-full p-2 hover:bg-gray-900'
      }

      // button is styled as a normal button
      if (this.plain) return 'appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:border-transparent rounded-sm'
      if (this.light) return 'appearance-none  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm'
      if (this.outlined) return 'text-sm appearance-none font-medium leading-5 rounded-md px-4 py-2 text-white bg-transparent border border-white hover:bg-black hover:bg-opacity-25 focus:outline-none focus:bg-opacity-25 focus:bg-black focus:shaow-outline-gray active:bg-black active:bg-opacity-25'

      return 'appearance-none hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-900 rounded-md shadow-sm'
    }
  }
}
</script>