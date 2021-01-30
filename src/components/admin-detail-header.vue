<template>
  <div class="pb-8 border-b border-gray-200">
    <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="flex items-center justify-between">
      <div class="mt-6">
        <div :class="{'flex items-center': $slots['header-append']}">
          <h1 class="text-2xl font-semibold text-gray-900" :class="{'mr-3': $slots['header-append']}">{{ title }}</h1>
          <slot name="header-append"></slot>
        </div>
        <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      <div>
        <slot name="page-actions">
          <!-- page actions -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDetailHeader',
  props: {
    title: {
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    breadcrumbs: {
      type: Array,
      required: true
    },
  }
}
</script>