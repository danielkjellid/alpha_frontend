<template>
  <div class="mb-5">
    <h3 class="px-3 text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">
      {{ title }}
    </h3>
    <div v-if="loaded" class="mt-2">
      <BaseButton
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
        plain
        class="hover:bg-gray-100 justify-between w-full px-3 py-2 mb-1 text-sm leading-6 text-gray-700 rounded"
        :class="{'border border-gray-200 bg-gray-50' : filterActive(item.name)}"
        @click="() => toggleFilter(item)"
      >
        <div class="flex items-center justify-start text-left">
          <slot name="box" :item="item"></slot>
          {{ item.name }}
        </div>
        <div class="flex items-center justify-center flex-shrink-0 w-5 h-5 text-xs text-gray-700 bg-gray-300 rounded">
          {{ item.count }}
        </div>
      </BaseButton>
    </div>
    <div v-else class="animate-pulse px-3 mt-2 space-y-2">
      <div v-for="i in 4" :key="i" class="w-full h-10 bg-gray-400 rounded" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductFilterBlock',
  props: {
    loaded: {
      type: Boolean,
      default: false,
    },
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
  setup(props, { emit }) {

    interface ItemObj {
      name: string;
      count: number;
    }

    const toggleFilter = (item: ItemObj) => {
      emit('toggle-filter', item.name)
    }

    const filterActive =(filter: string): boolean => {
      return props.activeFilters.includes(filter)
    }

    return {
      toggleFilter,
      filterActive
    }
  }
})
</script>
