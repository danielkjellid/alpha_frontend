<template>
  <div>
    <div 
      class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 rounded-lg"
      :class="{'flex items-center justify-between' : !disableCollapse}"
    >
      <h1>{{ title }}</h1>
      <BaseButton v-if="!disableCollapse" @click="collapsed = !collapsed" class="hover:text-gray-900 text-gray-600" plain>
        <BaseIcon v-if="!collapsed" solid name="chevron-up" />
        <BaseIcon v-else solid name="chevron-down" />
      </BaseButton>
    </div>
    <div class="px-4 my-6">
      <div v-show="!collapsed">
        <slot>
          Content
        </slot>
      </div>
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
    },
    disableCollapse: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>