<template>
  <AdminDetail 
    :title='userFullName'
    :subtitle="user.email"
    :breadcrumbs="breadcrumbs"
    :wrapperData="wrapperData"
    :item="user"
  >
    <template #page-actions>
      <BaseButton>Main action</BaseButton>
    </template>
    <template #subscribed_to_newsletter="{ item }">
      <div v-if="item.subscribed_to_newsletter" class="flex items-center">
        <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
        Godtar
      </div>
      <div v-else class="flex items-center">
        <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
        Godtar ikke
      </div>
    </template>
    <template #allow_personalization="{ item }">
      <div v-if="item.allow_personalization" class="flex items-center">
        <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
        Godtar
      </div>
      <div v-else class="flex items-center">
        <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
        Godtar ikke
      </div>
    </template>
    <template #allow_third_party_personalization="{ item }">
      <div v-if="item.allow_third_party_personalization" class="flex items-center">
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
import { apiService } from '@/common/api.service'
import AdminDetail from '@/views/templates/admin-detail'

export default {
  name: 'UserDetail',
  components: {
    AdminDetail
  },
  data() {
    return {
      user: {},
      wrapperData: [
        {
          label: 'Generelle data',
          fields: [
            { field: 'full_name', text: 'Navn' },
            { field: 'email', text: 'E-post' },
            { field: 'phone_number', text: 'Telefon' },
            { field: 'address', text: 'Adresse' },
          ]
        },
        {
          label: 'Preferanser',
          fields: [
            { field: 'subscribed_to_newsletter', text: 'Markedsføring' },
            { field: 'allow_personalization', text: 'Personalisering' },
            { field: 'allow_third_party_personalization', text: 'Tredjepartspersonalisering' },
          ]
        },
        {
          label: 'Annet',
          fields: [
            { field: 'date_joined', text: 'Registrert' },
            { field: 'last_login', text: 'Sist login' },
            { field: 'acquisition_source', text: 'Kilde' },
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
  },
  computed: {
    breadcrumbs() {
      return [
        {text: 'Brukere', disabled: false, href: 'backend/users'}, 
        {text: this.userFullName, disabled: true,}
      ]
    },
    userFullName() {
      return this.user.first_name + ' ' + this.user.last_name
    },
  },
  methods: {
    fetchUser(id) {
      apiService(`users/${id}/`)
        .then(user => {
          this.user = user
        })
    } 
  },
  created() {
    this.fetchUser(this.$route.params.id)
  }
}
</script>