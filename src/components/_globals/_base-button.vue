<template>
  <component 
    :is="type"
    :to="to"
    :type="buttonType"
    class="inline-flex items-center text-sm leading-5 font-medium transition ease-in-out duration-150"
    :class="renderClasses()"
  >
    <slot>Button</slot>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    light: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: [String, Object],
      required: false,
      default: null
    },
    buttonType: {
      type: String,
      required: false,
      default: 'button'
    }
  },
  computed: {
    type() {
      if (this.to) {
        return 'router-link'
      } else {
        return 'button'
      }
    }
  },
  methods: {
    renderClasses() {
      let classes = null

      if (this.icon) {
        classes = 'rounded-full p-2 hover:bg-gray-100'
      } else {
        if (this.light) {
          classes = 'rounded-md px-4 py-2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:border-gray-400 focus:shaow-outline-gray active:bg-gray-100 active:border-gray-400'
        } else {
          classes = 'rounded-md px-4 py-2 text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900'
        }
      }

      return classes
    }
  }
}
</script>