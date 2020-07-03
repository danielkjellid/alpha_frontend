<template>
  <div class="min-w-full mt-5 border-2 border-gray-300 border-dashed w-full">
    <div class="p-12 text-center">
      <p class="text-gray-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseNodata',
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: 'Ingen data'
    }
  }
}
</script>