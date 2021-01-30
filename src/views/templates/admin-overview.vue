<template>
  <AdminLayout>
    <template #page-action>
      <slot name="page-action"></slot>
    </template>
    <Tabs v-if="tabs" :tabs="tabs" class="mt-2" />
    <slot>
  
    </slot>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/components/admin-layout.vue'
import Tabs from '@/components/tabs.vue'


export default {
  name: 'AdminOverviewTemplate',
  components: {
    AdminLayout,
    Tabs
  },
  props: {
    tabs: {
      type: Array,
      required: false,
    }
  }
}
</script>