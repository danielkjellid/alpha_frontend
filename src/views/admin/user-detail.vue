<template>
  <AdminDetail 
    :title='userFullName'
    :subtitle="userEmail"
    :breadcrumbs="breadcrumbs"
    :wrapperData="wrapperData"
    :item="user"
  >
    <template #page-actions>
      <BaseButton :to="`/backend/users/${$route.params.id}/edit/`">Rediger bruker</BaseButton>
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
    <template #overview-content>
      <Tabs :tabs="[{text: 'Ordre', to: 'test'}, {text: 'Handlekurv', to: 'test'}]"/>
    </template>
  </AdminDetail>
</template>

<script>
import { apiService } from '@/common/api.service'
import AdminDetail from '@/views/templates/admin-detail.vue'
import Tabs from '@/components/tabs.vue'

export default {
  name: 'UserDetail',
  page() {
    return {
      title: `Backend: ${this.user.full_name}`,
      meta: [
        {
          name: 'description',
          content: `The backend page for user ${this.user.full_name}.`
        }
      ]
    }
  },
  components: {
    AdminDetail,
    Tabs
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
    }
  },
  computed: {
    userFullName() {
      return this.user.full_name
    },
    userEmail() {
      return this.user.email
    },
    breadcrumbs() {
      return [
        {text: 'Brukere', disabled: false, href: '/backend/users'}, 
        {text: this.user.full_name, disabled: true,}
      ]
    }
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