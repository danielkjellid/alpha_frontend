<template>
  <div>
    <div class="bg-gray-50 px-6 py-3 text-sm font-medium text-gray-900 rounded-lg">
      {{ title }}
    </div>
    <div class="px-6 my-6">
      <slot>
        Content
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSection',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>