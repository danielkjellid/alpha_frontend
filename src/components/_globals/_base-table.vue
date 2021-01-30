<template>
  <div>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <!-- loop through the headers, setting alignment and border radius accordingly -->
            <th 
              v-for="(header, index) in headers" 
              :key="index"
              :class="{
                'text-left': header.align === undefined || 'left',
                'text-center': header.align === 'center',
                'text-right': header.align === 'right',
              }"
              class="bg-gray-50 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="bg-white divide-y divide-gray-100">
          <!-- loop through items in the row items array -->
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(value, property, index) in item" :key="index" class="whitespace-nowrap px-6 py-3 text-sm leading-5 text-gray-900 border-b border-gray-200">
              <!-- add slot to be able to style/edit each column according to content presented -->
              <slot :name="property" :item="item">
                {{ value }}
              </slot>
            </td>
            <!-- icon to go to the detail of the data presented -->
            <td v-if="hasActions" class="whitespace-nowrap px-6 py-3 text-right border-b border-gray-200">
              <BaseButton icon light :to="typeof item.id !== undefined ? `${detailBase}${item.id}` : `${detailbase}${item.slug}`">
                <BaseIcon name="eye" />
              </BaseButton>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length" class="px-5">
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