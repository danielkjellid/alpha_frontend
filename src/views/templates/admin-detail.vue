<template>
  <div>
    <AdminNav />
    <div class="container max-w-6xl px-8 pt-8 mx-auto">
      <AdminDetailHeader :title="title" :subtitle="subtitle" :breadcrumbs="breadcrumbs">
        <!-- to be able to attach a pill/icon/button at the end of the page title -->
        <!-- i dynamically create a slot and check if this is present -->
        <!-- this is to be able to change classes dynamically ('flex') --> 
        <template v-if="$slots['header-append']" #header-append>
          <slot name="header-append"></slot>
        </template>
        <template #page-actions>
          <slot name="page-actions"></slot>
        </template>
      </AdminDetailHeader>
      <div class="h-min-screen flex items-start w-full">
        <!-- the left part of the screen is important information about the detail instance -->
        <div class="w-1/4 py-5 pr-5 border-r border-gray-300">
          <!-- in the parent component there is a defined a list which lables the data -->
          <!-- the loops bellow attaches each field to its label based on the fields pulled from api -->
          <div v-for="(data, index) in wrapperData" :key="index">
            <h2 class="text-lg font-medium text-gray-900" :class="{ 'mt-6': data !== wrapperData[0] }">{{ data.label }}</h2>
            <div v-for="(field, index) in data.fields" :key="index" class="mt-5">
              <p class="mb-1 text-sm font-semibold text-gray-600">{{ field.text }}</p>
              <div v-for="(value, property, index) in item" :key="index" class="text-sm text-gray-900">
                <template v-if="field.field === property">
                  <!-- attach slot to be able to change representation of data if needed -->
                  <slot :name="property" :item="item">
                    {{ value }}
                  </slot>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3/4 h-full py-5 pl-5">
          <slot name="overview-content">
            Content
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin-nav.vue'
import AdminDetailHeader from '@/components/admin-detail-header.vue'

export default {
  name: 'AdminDetail',
  components: {
    AdminNav,
    AdminDetailHeader
  },
  props: {
    // title of page
    title: {
      required: true
    },
    // subtitle of page
    subtitle: {
      type: String,
      required: false
    },
    // page breadcrumbs
    breadcrumbs: {
      type: Array,
      required: true
    },
    // array of objects which attaches the correct field name to the correct label
    wrapperData: {
      type: Array,
      required: true,
    },
    // data
    item: {
      type: Object,
      required: true,
    }
  }
}
</script>