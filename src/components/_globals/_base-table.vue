<template>
  <div>
    <!-- table actions consits of an input field and action buttons -->
    <div v-if="showTableActions" class="flex items-center justify-between mb-5">
      <slot name="table-actions">
        <!-- table actions -->
      </slot>
    </div>
    <div class="overflow-x-auto">
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
              class="bg-blue-50 px-5 py-5 text-sm font-medium leading-5 tracking-wider text-gray-600 uppercase"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="bg-white">
          <!-- loop through items in the row items array -->
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(value, property, index) in item" :key="index" class="px-5 py-5 text-sm leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-300">
              <!-- add slot to be able to style/edit each column according to content presented -->
              <slot :name="property" :item="item">
                {{ value }}
              </slot>
            </td>
            <!-- icon to go to the detail of the data presented -->
            <td v-if="hasActions" class="px-5 py-5 text-right whitespace-no-wrap border-b border-gray-300">
              <BaseButton icon light :to="typeof item.id !== undefined ? `${detailBase}${item.id}` : `${detailbase}${item.slug}`">
                <BaseIcon name="eye" />
              </BaseButton>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length">
              <BaseNodata></BaseNodata>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    // sets the table headers
    headers: {
      type: Array,
      required: true
    },
    // sets the table items (rows)
    items: {
      type: Array,
      required: true
    },
    // base url for viewing detail page
    detailBase: {
      type: String,
      required: true
    },
    // boolean to show/hide table actions
    showTableActions: {
      type: Boolean,
      required: false,
      default: false,
    },
    // icon to be displayed in input (if any), e.g. search
    tableActionInputIcon: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    hasActions() {
      if (this.headers.filter(header => header.value === 'actions').length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>