<template>
  <div>
    <AdminNav />
    <div class="container px-8 py-12 mx-auto">
      <AdminDetailHeader :title='title' :subtitle="subtitle" :breadcrumbs="breadcrumbs">
        <template v-if="$slots['header-append']" #header-append>
          <slot name="header-append"></slot>
        </template>
        <template #page-actions>
          <slot name="page-actions"></slot>
        </template>
      </AdminDetailHeader>
      <div class="flex items-start w-full">
        <div class="w-1/4 py-5 pr-5">
          <div v-for="(data, index) in wrapperData" :key="index">
            <h2 class="text-lg font-medium text-gray-900" :class="{ 'mt-6': data !== wrapperData[0] }">{{ data.label }}</h2>
            <div v-for="(field, index) in data.fields" :key="index" class="mt-5">
              <p class="mb-1 text-sm font-semibold text-gray-600">{{ field.text }}</p>
              <div v-for="(value, property, index) in item" :key="index" class="text-sm text-gray-900">
                <template v-if="field.field === property">
                  <slot :name="property" :item="item">
                    {{ value }}
                  </slot>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3/4 h-full py-5 pl-5 border-l border-gray-300">
          <p>Content</p>
          <slot name="overview-content">
            <!-- page content -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin-nav'
import AdminDetailHeader from '@/components/admin-detail-header'

export default {
  name: 'AdminDetail',
  components: {
    AdminNav,
    AdminDetailHeader
  },
  props: {
    title: {
      type: String,
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
    wrapperData: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    }
  }
}
</script>