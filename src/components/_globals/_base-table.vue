<template>
  <div>
    <form v-if="showSearchbar" @submit.prevent="emitQuery" class="px-2 mb-4">
      <BaseInput 
        plain 
        label="search" 
        hiddenLabel
        block
        icon="search" 
        iconColor="text-gray-800"
        :placeholder="searchbarPlaceholder"
        v-model="query"
      />
    </form>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="rounded-md">
            <!-- loop through the headers, setting alignment and border radius accordingly -->
            <th 
              v-for="(header, index) in headers" 
              :key="index"
              :class="{
                'rounded-l-md': index === 0, 
                'rounded-r-md': index === headers.length -1,
                'text-left': header.align === undefined || 'left',
                'text-center': header.align === 'center',
                'text-right': header.align === 'right',
              }"
              class="bg-gray-50 px-6 py-3 text-sm font-normal text-gray-500"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="bg-white">
          <!-- loop through items in the row items array -->
          <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50 rounded-md">
            <td 
              v-for="(value, property, index) in item" 
              :key="index" 
              class="whitespace-nowrap px-6 py-3 text-sm leading-5 text-gray-900"
              :class="{'rounded-l-md': index === 0}"
            >
              <!-- add slot to be able to style/edit each column according to content presented -->
              <slot :name="property" :item="item">
                {{ value }}
              </slot>
            </td>
            <!-- icon to go to the detail of the data presented -->
            <td v-if="hasActions" class="whitespace-nowrap rounded-r-md relative px-6 py-3 text-right">
              <button @click="displayActions(item.id)">
                <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
              <div v-show="clickedItemId == item.id">
                <div class="absolute right-0 z-20 mr-16 -mt-6">
                  <div class="py-2 bg-white rounded-md shadow">
                    <slot name="action" :item="item"></slot>
                  </div>
                </div>
                <!-- dummy element to force action closed, since data range is dynamic -->
              </div>
            </td>
            <div v-if="clickedItemId == item.id" @click="closeActions" class="absolute inset-0 z-10 bg-transparent"></div>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length" class="px-5">
              <BaseNodata />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items && items.length > 0 && showPagination" class="flex items-center justify-between px-6 mt-8">
        <span class="text-sm text-gray-800">{{ currentRange }} av {{ totalInstances }}</span>
        <div class="flex items-center">
          <button v-if="currentPage != 1" @click="emitPrev" class="hover:text-gray-900 text-gray-800">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span class="mx-2 text-sm text-gray-800">{{ currentPage }} av {{ totalPages }}</span>
          <button v-if="currentPage != totalPages" @click="emitNext" class="hover:text-gray-900 text-gray-800">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
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
      type: [Object, Array],
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
    },
    // boolean to display searchbar above table
    showSearchbar: {
      type: Boolean,
      required: false,
      default: false,
    },
    // string to display placeholder in search input
    // searchBar needs to be displayed
    searchbarPlaceholder: {
      type: String,
      required: false
    },
    // boolean to display pagination bellow table
    showPagination: {
      type: Boolean,
      required: false,
      default: false
    },
    // shows which range the table is currently showing in table - only needed if pagination is showing
    currentRange: {
      type: [String, Number],
      required: false
    },
    // shows number of total instances - only needed if pagination is showing
    totalInstances: {
      type: [String, Number],
      required: false
    },
    // shows current - only needed if pagination is showing
    currentPage: {
     type: [String, Number],
      required: false
    },
    // show total pages - only needed if pagination is showing
    totalPages: {
      type: [String, Number],
      required: false
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
  },
  data() {
    return {
      query: '',
      clickedItemId: null
    }
  },
  methods: {
    displayActions(id) {
      this.clickedItemId = id
    },
    closeActions() {
      this.clickedItemId = null
    },
    emitQuery() {
      this.$emit('onSearch', this.query)
    },
    emitPrev() {
      this.$emit('onPrevious')
    },
    emitNext() {
      this.$emit('onNext')
    }
  }
}
</script>