<template>
  <div>
    <div class="container max-w-6xl px-8 pt-8 mx-auto">
      
      <div class="w-full">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminEdit',
  components: {
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    breadcrumbs: {
      type: Array,
      required: true
    },
  }
}
</script>