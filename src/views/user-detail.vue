<template>
  <AdminDetail 
    title='User fullname'
    subtitle="user@example.com"
    :breadcrumbs="breadcrumbs"
    :wrapperData="wrapperData"
    :item="item"
  >
    <template #page-actions>
      <BaseButton>Main action</BaseButton>
    </template>
    <template #accept_marketing="{ item }">
      <div v-if="item.accept_marketing" class="flex items-center">
        <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
        Godtar
      </div>
      <div v-else class="flex items-center">
        <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
        Godtar ikke
      </div>
    </template>
    <template #accept_personalization="{ item }">
      <div v-if="item.accept_personalization" class="flex items-center">
        <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
        Godtar
      </div>
      <div v-else class="flex items-center">
        <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
        Godtar ikke
      </div>
    </template>
    <template #accept_third_party_personalization="{ item }">
      <div v-if="item.accept_third_party_personalization" class="flex items-center">
        <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
        Godtar
      </div>
      <div v-else class="flex items-center">
        <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
        Godtar ikke
      </div>
    </template>
  </AdminDetail>
</template>

<script>
import AdminDetail from '@/views/templates/admin-detail'

export default {
  name: 'UserDetail',
  components: {
    AdminDetail
  },
  data() {
    return {
      breadcrumbs: [
        {text: 'Brukere', disabled: false, href: 'backend/users'}, 
        {text: 'Example user', disabled: true, href: 'backend/users'}
      ],
      wrapperData: [
        {
          label: 'Generelle data',
          fields: [
            { field: 'full_name', text: 'Navn' },
            { field: 'email', text: 'E-post' },
            { field: 'phone_number', text: 'Telefon' },
            { field: 'full_address', text: 'Adresse' },
          ]
        },
        {
          label: 'Preferanser',
          fields: [
            { field: 'accept_marketing', text: 'Markedsføring' },
            { field: 'accept_personalization', text: 'Personalisering' },
            { field: 'accept_third_party_personalization', text: 'Tredjepartspersonalisering' },
          ]
        },
        {
          label: 'Annet',
          fields: [
            { field: 'date_joined', text: 'Registrert' },
            { field: 'last_login', text: 'Sist login' },
            { field: 'accquisition_source', text: 'Kilde' },
          ]
        },
      ],
      item: {
        full_name: 'Example user',
        email: 'example@hotmail.com',
        phone_number: 12345678,
        full_address: 'Street 1, 0123 Oslo',
        accept_marketing: true,
        accept_personalization: false,
        accept_third_party_personalization: true,
        date_joined: '20. August 2019 15:32',
        last_login: '21. August 2019 15:32',
        accquisition_source: 'referal/newsletter/1'
      }
    }
  }
}
</script>