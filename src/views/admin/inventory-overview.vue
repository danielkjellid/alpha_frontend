<template>
  <div>
    <AdminOverviewTemplate title="Inventar" subtitle="En oversikt over kategorier og inventar" :tabs="tabs">
      <template #overview-content>
        <BaseTable showTableActions :headers="tableHeaders" :items="tableItems" detailBase="/backend/users/">
          <template #table-actions>
            <BaseInput label="Search" icon="search" placeholder="Søk etter brukere..." block hiddenLabel />
            <div class="flex items-center flex-shrink-0 ml-3">
              <!-- TODO: figure out how to dynamixcally switch between buttons and tables -->
              <!-- <BaseButton>Opprett kategori</BaseButton> -->
              <BaseButton v-if="$perm('has_users_export') " light>Eksporter</BaseButton>
            </div>
          </template>
        </BaseTable>
      </template>
    </AdminOverviewTemplate>
  </div>
</template>

<script>
//import apiService from '@/common/api'
import AdminOverviewTemplate from '@/views/templates/admin-overview.vue'

export default {
  name: 'InventoryOverview',
  page() {
    return {
      title: 'Backend: Inventory',
      meta: [
        {
          name: 'description',
          content: 'An overview of inventory.'
        }
      ]
    }
  },
  components: {
    AdminOverviewTemplate,
  },
  data() {
    return {
      tabs: [{ text: 'Produkter', to: '/backend/inventory/' }, { text: 'Kategorier', to: '#' }, {text: 'Kjøkken', to: '#'}],
      tableItems: [],
      tableHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Navn', value: 'name' },
        { text: 'Forelder', value: 'parent' },
        { text: 'Rekkefølge', value: 'order' },
        { text: 'Bredde', value: 'width' },
        { text: 'Aktiv', value: 'active', align: 'center' },
        { text: '', value: 'actions' },
      ],
    }
  },
  // methods: {
  //   fetchUsers() {
  //     apiService('users/')
  //       .then(users => {
  //         this.tableItems = users
  //       })
  //   }
  // },
  // created() {
  //   this.fetchUsers()
  // }
}
</script>
