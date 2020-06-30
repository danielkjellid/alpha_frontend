<template>
  <div
    v-html="require(`../../assets/icons/${name}.svg`)"
    class="h-5 w-5 fill-current"
    :class="renderFillColor"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    fill: {
      type: String,
      required: false,
      default: 'text-gray-500'
    }
  },
  computed: {
    renderFillColor() {
      let color = null

      if (this.dark) {
        color = 'text-gray-700'
      } else {
        color = this.fill
      }

      return color
    }
  }
}
</script>