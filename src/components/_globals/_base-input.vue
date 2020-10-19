<template>
  <div :class="{ 'w-full': block, 'mb-8' : error }">
    <label :for="id" :class="{ 'sr-only' : hiddenLabel, 'mb-1' : label }" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="relative rounded-md">
      <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BaseIcon :name="icon" fill="text-gray-500"/>
      </div>
      <input
        @input="$emit('input', $event.target.value)" 
        :id="id"
        :value="value"
        :class="{ 
          'pl-10': icon, 
          'w-full': block,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': error,
        }"
        :placeholder="placeholder"
        :type="type"
        class="form-input block text-sm leading-5" 
      />
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
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    // decides wether an input should have an icon by defined icon name
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
    },
    error: {
      type: [Array, String],
      required: false
    }
  }
}
</script>