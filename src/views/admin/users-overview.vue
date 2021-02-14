<template>
  <AdminOverviewTemplateNew title="Brukere">
    <BaseTable 
      showSearchbar
      showPagination
      @onSearch="queryUsers"
      @onPrevious="previousPage"
      @onNext="nextPage"
      :headers="tableHeaders" 
      :items="tableItems"
      :currentRange="currentRangeDisplayed"
      :totalInstances="totalInstancesFetched"
      :currentPage="currentPageDisplayed"
      :totalPages="totalPagesFetched"
    >
      <template #profile="{ item }">
        <div class="flex items-center">
          <div :style="`background-color: ${item.profile.avatar_color}`" class="flex items-center justify-center w-6 h-6 mr-2 text-xs text-white rounded-full">{{item.profile.initial}}</div>
          {{ item.profile.full_name }}
        </div>
      </template>
      <template #is_active="{ item }">
        <div v-if="item.is_active" class="flex items-center">
          <BaseIcon v-if="item.is_active" name="check-circle" fill="text-green-400" class="mr-2" />
          Aktiv
        </div>
        <div v-else class="flex items-center">
          <BaseIcon v-if="!item.is_active" name="x-circle" fill="text-red-400" class="mr-2" />
          Inaktiv
        </div>
      </template>
      <template #action="{ item }">
        <router-link :to="'/users/' + item.id" class="hover:bg-gray-200 flex items-center px-4 py-2 text-sm text-gray-800">
          Se bruker
        </router-link>
        <router-link :to="'/users/' + item.id" class="hover:bg-gray-200 flex items-center px-4 py-2 text-sm text-gray-800">
          Rediger bruker
        </router-link>
      </template>
    </BaseTable>
  </AdminOverviewTemplateNew>
</template>

<script>
import apiService from '@/common/api'
import AdminOverviewTemplateNew from '@/views/templates/admin-overview.vue'

export default {
  components: {
    AdminOverviewTemplateNew
  },
  data() {
    return {
      currentRangeDisplayed: null,
      totalInstancesFetched: null,
      currentPageDisplayed: null,
      totalPagesFetched: null,
      previousPath: null,
      nextPath: null,
      tableItems: [],
      tableHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Navn', value: 'name' },
        { text: 'E-post', value: 'email' },
        { text: 'Aktiv', value: 'active' },
        { text: 'Registrert', value: 'dateJoined' },
        { text: '', value: 'actions' },
      ],
    }
  },
  methods: {
    fetchUsers(endpoint) {
      apiService.get(endpoint)
        .then(response => {
          this.previousPath = response.data.links.previous
          this.nextPath = response.data.links.next
          this.currentRangeDisplayed = response.data.meta.current_range
          this.totalInstancesFetched = response.data.meta.total
          this.currentPageDisplayed = response.data.meta.current_page
          this.totalPagesFetched = response.data.meta.total_pages
          this.tableItems = response.data.results
  
        })
    },
    queryUsers(query) {
      this.fetchUsers(`users/?search=${query}`)
    },
    nextPage() {
      this.fetchUsers(this.nextPath)
    },
    previousPage() {
      this.fetchUsers(this.previousPath)
    }
  },
  created() {
    this.fetchUsers('users/')
  }
}
</script>