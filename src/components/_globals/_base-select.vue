<template>
  <div :class="{ 'w-full': block, 'mb-8' : error }">
    <label 
      :for="id" :class="{ 'sr-only' : hiddenLabel, 'mb-1' : label }" 
      class="block text-sm font-medium leading-5 text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BaseIcon v-if="icon" :name="icon" :fill="iconColor"/>
      </div>
      <select
        @input="$emit('input', $event.target.value)" 
        :id="id"
        :class="{ 
          'pl-10': icon, 
          'w-full': block,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red': error,
        }"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:border-transparent block text-sm leading-5 border-gray-200 rounded-md" 
      >
        <slot />
      </select>
      <div v-if="error" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <BaseIcon name="exclemation-circle" solid fill="text-red-500" />
      </div>
    </div>
    <p v-if="error" class="absolute text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
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
    value: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    // sets color of icon if default is not prefered
    iconColor: {
      type: String,
      required: false,
      default: 'text-gray-400'
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
    },
  }
}
</script>