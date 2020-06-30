<template>
  <div>
    <div v-if="showTableActions" class="flex items-center justify-between mb-5">
      <div class="w-full">
        <BaseInput 
          label="Search" 
          :icon="tableActionInputIcon"
          block
          hiddenLabel
        />
      </div>
      <div class="flex items-center ml-3">
        <slot name="table-actions">
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
            <!-- check if the type isnt boolean -->
            <div v-if="typeof value !== 'boolean'">
              {{ value }}
            </div>
            <!-- if it is, we want to display icons istead -->
            <div v-else-if="typeof value === 'boolean'">
              <!-- if the value is true display green checkmark in circle icon -->
              <svg v-if="value === true" fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5 text-green-400 mx-auto">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <!-- if the value is false, display red x in circle -->
              <svg v-else fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5 text-red-400 mx-auto">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
            </div>
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