<template>
  <div class="mb-5">
    <h3 class="text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">
      {{ title }}
    </h3>
    <div class="mt-2">
      <BaseButton
        v-for="(item, index) in items" 
        :key="index" 
        plain
        class="hover:bg-gray-100 justify-between w-full px-2 py-2 text-sm leading-6 text-gray-700 rounded"
        @click="() => toggleFilter(item)"
      > 
        <div class="flex items-center">
          <slot name="box" :item="item">
            <BaseCheckbox :label="`select ${item.name}`" hiddenLabel :checked="filterActive(item.name)" />
          </slot>
          <span>{{ item.name }}</span>
        </div>
        <div class="flex items-center justify-center w-5 h-5 text-xs text-gray-700 bg-gray-300 rounded">
          {{ item.count }}
        </div>
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFilterBlock',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      required: true
    },
    activeFilters: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleFilter(item) {
      this.$emit('toggle-filter', item.name)
    },
    filterActive(filter) {
      return this.activeFilters.includes(filter)
    }
  }
}
</script>
