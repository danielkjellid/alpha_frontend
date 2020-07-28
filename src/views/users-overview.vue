<template>
  <div>
    <AdminOverviewTemplate title="Brukere" subtitle="En oversikt over alle registrerte brukere">
      <template #overview-content>
        <BaseTable showTableActions :headers="tableHeaders" :items="tableItems" detailBase="/backend/users/">
          <template #table-actions>
            <BaseInput label="Search" icon="search" placeholder="Søk etter brukere..." block hiddenLabel />
            <div class="flex items-center flex-shrink-0 ml-3">
              <BaseButton light class="mr-2">Eksporter</BaseButton>
              <BaseButton>Ny bruker</BaseButton>
            </div>
          </template>
          <template #is_active="{ item }">
            <BaseIcon v-if="item.is_active" name="check-circle" solid fill="text-green-400" class="mx-auto" />
            <BaseIcon v-else name="x-circle" solid fill="text-red-400" class="mx-auto" />
          </template>
        </BaseTable>
      </template>
    </AdminOverviewTemplate>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service'
import AdminOverviewTemplate from '@/views/templates/admin-overview'

export default {
  name: 'UsersOverview',
  components: {
    AdminOverviewTemplate,
  },
  data() {
    return {
      tableItems: [],
      tableHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Navn', value: 'name' },
        { text: 'E-post', value: 'email' },
        { text: 'Adresse', value: 'address' },
        { text: 'Registrert', value: 'dateJoined' },
        { text: 'Aktiv', value: 'active', align: 'center' },
        { text: '', value: 'actions' },
      ],
    }
  },
  methods: {
    fetchUsers() {
      apiService('users/')
        .then(users => {
          this.tableItems = users
        })
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
