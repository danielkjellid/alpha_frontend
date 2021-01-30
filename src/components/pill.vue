<template>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-5 bg-white border border-gray-200 text-gray-900">
    <svg 
      :class="renderDotColor" 
      class="-ml-1 mr-2 h-2 w-2" 
      fill="currentColor" 
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
    <slot>Title</slot>
  </span>
</template>

<script>
export default {
  name: 'Pill',
  props: {
    // decides the fill color of the dot in the pill
    fill: {
      type: String,
      required: false,
      default: 'text-gray-400'
    },
    // predefined fill that makes button green
    success: {
      type: Boolean,
      required: false,
      default: false
    },
    // predefined fill that makes button yellow
    warning: {
      type: Boolean,
      required: false,
      default: false
    },
    // predefined fill that makes button red
    danger: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  computed: {
    renderDotColor() {
      let color = null

      if (this.success) {
        color = 'text-green-400'
      } else if (this.warning) {
        color = 'text-orange-400'
      } else if (this.danger) {
        color = 'text-red-400'
      } else {
        color = this.fill
      }

      return color
    }
  }
}
</script>