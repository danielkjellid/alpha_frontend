<template>
  <div>
    <Pill>Mottatt</Pill>
    <AdminOverviewTemplate 
      title="Brukere"
      subtitle="En oversikt over alle registrerte brukere"
      detailBase="/users/"
      :showTableActions="true"
      tableActionInputIcon="search"
      :tableHeaders="tableHeaders"
      :tableItems="tableItems"
    >
      <template #table-actions>
        <BaseButton light class="mr-2">Eksporter</BaseButton>
        <BaseButton>Ny bruker</BaseButton>
      </template>
    </AdminOverviewTemplate>
  </div>
</template>

<script>
import AdminOverviewTemplate from '@/views/templates/AdminOverview'
import Pill from '@/components/pill'

export default {
  name: 'Home',
  components: {
    AdminOverviewTemplate,
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
