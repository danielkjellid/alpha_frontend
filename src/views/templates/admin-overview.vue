<template>
  <div>
    <AdminNav />
    <AdminOverviewHeader :title="title" :subtitle="subtitle" />
    <div class="container max-w-6xl px-8 pt-12 mx-auto">
      <div v-if="tabs" class="mb-8">
        <Tabs :tabs="tabs" />
      </div>
      <div>
        <slot name="overview-content">
          <!-- page content -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin-nav'
import AdminOverviewHeader from '@/components/admin-overview-header'
import Tabs from '@/components/tabs'

export default {
  name: 'AdminOverview',
  components: {
    AdminNav,
    AdminOverviewHeader,
    Tabs
  },
  props: {
    // title of page
    title: {
      type: String,
      required: true
    },
    // subtitle of page
    subtitle: {
      type: String,
      required: true
    },
    // navigational tabs
    tabs: {
      type: Array,
      required: false
    }
  }
}
</script>