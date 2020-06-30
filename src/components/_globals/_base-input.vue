<template>
  <div :class="{ 'w-full': block }">
    <label :for="id" :class="{ 'sr-only' : hiddenLabel }" class="block text-sm font-medium leading-5 text-gray-700 mb-1">{{ label }}</label>
    <div class="relative rounded-md">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BaseIcon :name="icon" />
      </div>
      <input 
        :id="id" 
        class="form-input block text-sm leading-5" 
        :class="{ 
          'pl-10': icon, 
          'w-full': block
        }"
        placeholder="you@example.com" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
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
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    // expands input to 100% av available space
    block: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>