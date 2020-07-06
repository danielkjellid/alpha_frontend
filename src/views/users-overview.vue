<template>
  <div>
    <AdminOverviewTemplate title="Brukere" subtitle="En oversikt over alle registrerte brukere">
      <template #overview-content>
        <Table showTableActions :headers="tableHeaders" :items="tableItems" detailBase="/users/">
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
        </Table>
      </template>
    </AdminOverviewTemplate>
  </div>
</template>

<script>
//import axios from 'axios'
import AdminOverviewTemplate from '@/views/templates/admin-overview'
import Table from '@/components/table'

export default {
  name: 'UsersOverview',
  components: {
    AdminOverviewTemplate,
    Table,
  },
  computed: {
    tableItems() {
      return this.$store.state.users.usersList
    }
  },
  data() {
    return {
      // tabs: [
      //   { text: 'Side 1', to: '/' },
      //   { text: 'Side 2', to: '/test' },
      //   { text: 'Side 3', to: '/test2' }
      // ],
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
  created() {
    this.$store.dispatch('users/fetchUsers')
  }
}
</script>
