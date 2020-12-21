<template>
  <div :class="{ 'w-full': block, 'mb-8' : error }">
    <label :for="id" :class="{ 'sr-only' : hiddenLabel, 'mb-1' : label }" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="relative rounded-md">
      <div class="sm:mt-0 sm:col-span-2 mt-2">
        <div class="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex justify-center text-sm text-gray-600">
              <label :for="id" class="hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 relative font-medium text-blue-600 bg-white rounded-md cursor-pointer">
                <p>Last opp en fil</p>
                <input
                  @input="$emit('input', $event.target.value)" 
                  @change="$emit('change', $event.target.files[0])"
                  :id="id" 
                  name="file-upload" 
                  type="file" 
                  class="sr-only"
                  :class="{ 
                    'w-full': block,
                    'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': error,
                  }"
                >
              </label>
              <p class="pl-1">eller dra filen hit</p>
            </div>
            <p class="text-xs text-center text-gray-500">
              JPG, JEPG opp til 10MB, Over 3074x940
            </p>
          </div>
        </div>
      </div>
      <div v-if="error" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <BaseIcon name="exclemation-circle" solid fill="text-red-500" />
      </div>
    </div>
    <p v-if="error" class="absolute text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseFileinput',
  props: {
    // controls the for and id fields in input and label
    id: {
      type: String,
      required: false,
      default: 'input'
    },
    // sets label to screen reader only
    hiddenLabel: { 
      type: Boolean,
      required: false,
      default: false,
    },
    // sets the label itself
    label: {
      type: String,
      required: true,
    },
    // expands input to 100% av available space
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: [Array, String],
      required: false
    }
  }
}
</script>