<template>
  <div class="border-b border-gray-300">
    <div class="container max-w-6xl px-8 py-12 mx-auto">
      <h1 class="text-4xl font-medium text-gray-900">{{ title }}</h1>   
      <h2 class="text-sm text-gray-900">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminTitle',
  props: {
    // sets the title of the page
    title: {
      type: String,
      required: true,
    },
    // sets the subtitle of page
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>