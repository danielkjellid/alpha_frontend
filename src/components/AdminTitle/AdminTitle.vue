<template>
  <div class="border-b border-gray-300">
    <div class="container py-12 px-8 mx-auto">
      <h1 class="text-4xl font-medium text-gray-900">{{ title }}</h1>   
      <h2 class="text-sm text-gray-900">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>