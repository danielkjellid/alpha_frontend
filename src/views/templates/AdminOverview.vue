<template>
  <div>
    <AdminNav />
    <AdminTitle :title="title" :subtitle="subtitle" />
    <div class="container py-12 px-8 mx-auto">
      <div v-if="tabs" class="mb-8">
        <Tabs :tabs="tabs" />
      </div>
      <slot name="overview-content">

      </slot>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin-nav'
import AdminTitle from '@/components/admin-title'
import Tabs from '@/components/tabs'

export default {
  name: 'AdminOverview',
  components: {
    AdminNav,
    AdminTitle,
    Tabs
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: false
    }
  }
}
</script>