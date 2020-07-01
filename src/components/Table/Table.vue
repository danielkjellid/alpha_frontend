<template>
  <div>
    <div v-if="showTableActions" class="flex items-center justify-between mb-5">
      <div>
        <BaseInput 
          label="Search" 
          :icon="tableActionInputIcon"
          block
          hiddenLabel
        />
      </div>
      <div class="flex items-center ml-3">
        <slot name="actions">
          <!-- table-actions -->
        </slot>
      </div>
    </div>
    <table class="min-w-full">
      <thead>
        <tr>
          <!-- loop through the headers, setting alignment and border radius accordingly -->
          <th 
            v-for="(header, index) in headers" 
            :key="index"
            :class="{
              'rounded-l-lg': index === 0, 
              'rounded-r-lg': index === headers.length -1,
              'text-left': header.align === undefined || 'left',
              'text-center': header.align === 'center',
              'text-right': header.align === 'right',
            }"
            class="px-5 py-5 bg-blue-50 text-sm leading-5 font-medium text-gray-600 uppercase tracking-wider"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <!-- loop through items in the row items array -->
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(value, property, index) in item" :key="index" class="px-5 py-5 whitespace-no-wrap border-b border-gray-300 text-sm leading-5 text-gray-900">
            <slot :name="property" :item="item">
              {{ value }}
            </slot>
          </td>
          <td class="px-5 py-5 whitespace-no-wrap border-b border-gray-300 text-right">
            <BaseButton icon :to="typeof item.id !== undefined ? `${detailBase}${item.id}` : `${detailbase}${item.slug}`">
              <BaseIcon name="eye" />
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    detailBase: {
      type: String,
      required: true
    },
    showTableActions: {
      type: Boolean,
      required: false,
      default: true,
    },
    tableActionInputIcon: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      data: []
    }
  },
  computed: {
    mappedItems() {
      return this.items.map(item => {
        if (item.id) {
          delete item.id
          return item
        } else if (item.slug) {
          delete item.slug
          return item
        } else {
          return item
        }
      })
    }
  }
}
</script>