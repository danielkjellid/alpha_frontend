<template>
  <AdminDetailTemplate title="Daniel Kjellid">
    <template #actions>
      <BaseButton light>Rediger</BaseButton>
    </template>
    <template #instance-content>
      <DescriptionList :fields="fields" :item="user">
        <template #is_active="{ item }">
          <div v-if="item.is_active" class="flex items-center">
            <BaseIcon name="check-circle" solid fill="text-green-400"  class="mr-2"/>
            Aktiv
          </div>
          <div v-else class="flex items-center">
            <BaseIcon name="x-circle" solid fill="text-red-400" class="mr-2"/>
            Ikke aktiv
          </div>
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
      </DescriptionList>
    </template>
  </AdminDetailTemplate>
</template>

<script>
import apiService from '@/common/api'
import AdminDetailTemplate from '@/views/templates/admin-detail.vue'
import DescriptionList from '@/components/description-list.vue'

export default {
  components: {
    AdminDetailTemplate,
    DescriptionList
  },
  data() {
    return {
      user: {},
      fields: [
        { name: 'email', text: 'E-post' },
        { name: 'phone_number', text: 'Telefon' },
        { name: 'address', text: 'Adresse' },
        { name: 'date_joined', text: 'Registrert' },
        { name: 'last_login', text: 'Sist login' },
        { name: 'acquisition_source', text: 'Kilde' },
        { name: 'is_active', text: 'Aktiv' },
        { name: 'subscribed_to_newsletter', text: 'Markedsføring' },
        { name: 'allow_personalization', text: 'Personalisering' },
        { name: 'allow_third_party_personalization', text: 'Tredjepartspersonalisering' },
      ]
    }
  },
  methods: {
    fetchUser(id) {
      apiService.get(`users/${id}/`)
        .then(user => {
          this.user = user.data
        })
    } 
  },
  created() {
    this.fetchUser(1)
  }
}
</script>