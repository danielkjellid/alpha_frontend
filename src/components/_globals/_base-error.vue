<template>
  <div class="bg-red-50 p-4 mt-5 rounded-md">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium leading-5 text-red-800">
          Oida! Noe gikk galt
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseError',
  props: {
    errors: {
      type: [Array, Object],
      required: false
    }
  }
}
</script>