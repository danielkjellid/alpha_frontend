<template>
  <div>
    <AdminNav />
    <AdminTitle :title="title" :subtitle="subtitle" />
    <div class="container py-12 px-8 mx-auto">
      <!-- <div class="mb-8">
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex">
              <a href="#" class="whitespace-no-wrap py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                My Account
              </a>
              <a href="#" class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                Company
              </a>
              <a href="#" class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700" aria-current="page">
                Team Members
              </a>
              <a href="#" class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                Billing
              </a>
            </nav>
          </div>
        </div>
      </div> -->
      <Table 
        :showTableActions="showTableActions"
        :tableActionInputIcon="tableActionInputIcon"
        :headers="tableHeaders" 
        :items="tableItems"
        :detailBase="detailBase"
      />
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import AdminTitle from '@/components/AdminTitle'
import Table from '@/components/Table'

export default {
  name: 'AdminOverview',
  components: {
    AdminNav,
    AdminTitle,
    Table
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
    tableHeaders: {
      type: Array,
      required: true
    },
    tableItems: {
      type: Array,
      required: true
    },
    detailBase: {
      type: String,
      required: true,
    },
    showTableActions: {
      type: Boolean,
      required: false,
      default: true,
    },
    tableActionInputIcon: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>