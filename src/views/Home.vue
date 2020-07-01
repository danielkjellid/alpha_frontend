<template>
  <div>
    <Pill>Mottatt</Pill>
    <AdminOverviewTemplate 
      title="Brukere"
      subtitle="En oversikt over alle registrerte brukere"
    >
        <!-- <template #active="{ item }">
          <span class="text-green-600">{{item.active}}</span>
        </template> -->
      <template #overview-content>
        <Table 
          :showTableActions="true"
          tableActionInputIcon="search"
          :headers="tableHeaders" 
          :items="tableItems"
          detailBase="/users"
        >
          <template #actions>
            <BaseButton light class="mr-2">Eksporter</BaseButton>
            <BaseButton>Ny bruker</BaseButton>
          </template>
          <template #active="{ item }">
            <span class="text-green-600">{{item.active}}</span>
          </template>
        </Table>
      </template>
    </AdminOverviewTemplate>
  </div>
</template>

<script>
import AdminOverviewTemplate from '@/views/templates/AdminOverview'
import Pill from '@/components/pill'
import Table from '@/components/table'

export default {
  name: 'Home',
  components: {
    AdminOverviewTemplate,
    Table,
    Pill
  },
  data() {
    return {
      tableHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Navn', value: 'name' },
        { text: 'E-post', value: 'email' },
        { text: 'Adresse', value: 'address' },
        { text: 'Registrert', value: 'dateJoined' },
        { text: 'Aktiv', value: 'active', align: 'center' },
        { text: '', value: 'actions' },
      ],
      tableItems: [
        { 
          id: 1,
          name: 'Daniel Test',
          email: 'daniel@ktest.no',
          address: 'Testadresse 11R',
          dateJoined: '23. August 2020',
          active: true,
        },
        { 
          id: 2,
          name: 'Test',
          email: 'daniel@ktest.no',
          address: 'Testadresse 11R',
          dateJoined: '23. August 2020',
          active: false,
        }
      ]
    }
  }
}
</script>
