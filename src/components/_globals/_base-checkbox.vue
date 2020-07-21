<template>
  <div class="flex items-center">
    <div>
      <label class="inline-flex">
        <input 
          @change="$emit('input', $event.target.checked)"
          type="checkbox"
          :checked="checked"
          class="form-checkbox w-5 h-5 text-gray-800"
        >
        <div class="ml-3 -mt-px text-sm">
          <span class="block font-medium text-gray-800">{{ label }}</span>
          <span v-if="helpText" class="block text-gray-600">{{ helpText }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: {
      type: String,
      required: true,
      default: 'checkbox',
    },
    label: {
      type: String,
      required: true,
    },
    helpText: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>