<template>
  <AdminOverviewTemplate>
    <template #page-action>
      <BaseButton>Opprett bruker</BaseButton>
    </template>
    <BaseTable :headers="tableHeaders" :items="tableItems" detailBase="/backend/users/">
      <template #is_active="{ item }">
        <BaseIcon v-if="item.is_active" name="check-circle" solid fill="text-green-400" class="mx-auto" />
        <BaseIcon v-else name="x-circle" solid fill="text-red-400" class="mx-auto" />
      </template>
    </BaseTable>
  </AdminOverviewTemplate>
</template>

<script>
import apiService from '@/common/api'
import AdminOverviewTemplate from '@/views/templates/admin-overview.vue'

export default {
  components: {
    AdminOverviewTemplate
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
      apiService.get('users/')
        .then(users => {
          this.tableItems = users.data
        })
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>