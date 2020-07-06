<template>
  <div>
    <AdminNav />
    <div class="container px-8 py-12 mx-auto">
      <div class="pb-8 border-b border-gray-300">
        <BaseBreadcrumbs :breadcrumbs="[{text: 'Brukere', disabled: false, href: 'backend/users'}, {text: 'Daniel Kjellid', disabled: true, href: 'backend/users'}]" />
        <div class="flex items-center justify-between">
          <div class="mt-6">
            <h1 class="text-2xl font-semibold text-gray-900">Daniel Kjellid</h1>
            <p class="text-sm text-gray-600">daniel.kjellid@gmail.com</p>
          </div>
          <div>
            <slot name="page-actions">
              <!-- page actions -->
            </slot>
          </div>
        </div>
      </div>
      <div class="flex items-start w-full">
        <div class="w-1/4 py-5 pr-5">
          <div v-for="(data, index) in wrapperData" :key="index">
            <h2 class="text-lg font-medium text-gray-900" :class="{ 'mt-6': data !== wrapperData[0] }">{{ data.label }}</h2>
            <div v-for="field in data.fields" :key="field" class="mt-5">
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

export default {
  name: 'AdminDetail',
  components: {
    AdminNav
  },
  props: {
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