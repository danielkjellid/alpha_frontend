<template>
  <div>
    <AdminNav />
    <div class="container max-w-6xl px-8 pt-12 mx-auto">
      <AdminDetailHeader :title='title' :subtitle="subtitle" :breadcrumbs="breadcrumbs">
        <template v-if="$slots['header-append']" #header-append>
          <slot name="header-append"></slot>
        </template>
        <template #page-actions>
          <slot name="page-actions"></slot>
        </template>
      </AdminDetailHeader>
      <div class="w-full">
        <slot name="edit-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin-nav'
import AdminDetailHeader from '@/components/admin-detail-header'

export default {
  name: 'AdminEdit',
  components: {
    AdminNav,
    AdminDetailHeader,
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
  }
}
</script>