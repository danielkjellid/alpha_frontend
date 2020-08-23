<template>
  <div
    v-html="renderRequirePath"
    class="w-5 h-5 fill-current"
    :class="[dark ? 'text-gray-900' : fill, height, width]"
  />
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    // name of the icon to be used
    name: {
      type: String,
      required: true,
    },
    // applies the dark theme variant to the icon
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    // decides what color the button should be, its a light gray by default
    fill: {
      type: String,
      required: false,
      default: 'fill-current'
    },
    // decides if the icon should be outlined or solid
    solid: {
      type: Boolean,
      required: false,
      default: false,
    },
    // decides the height of the icon
    height: {
      type: String,
      required: false,
      default: 'h-5'
    },
    // decides the width of the icon
    width: {
      type: String,
      required: false,
      default: 'w-5'
    }
  },
  computed: {
    // require the proper icon based on defined solid prop
    renderRequirePath() {
      if (this.solid) {
        return require(`../../assets/icons/solid/${this.name}.svg`)
      } else {
        return require(`../../assets/icons/outline/${this.name}.svg`)
      }
    }
  }
}
</script>