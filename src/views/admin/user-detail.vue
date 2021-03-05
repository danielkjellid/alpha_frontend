<template>
  <AdminDetailTemplate v-if="user.profile">
    <template #title>
      <div :style="`background-color: ${user.profile.avatar_color}`" class="flex items-center justify-center w-10 h-10 mr-3 rounded-full">
        <span class="text-sm text-white">{{ user.profile.initial }}</span>
      </div>
      <h1 class="text-2xl font-semibold text-gray-900">{{ user.profile.full_name }}</h1>
    </template>
    <template #actions>
      <BaseButton light>
        Rediger bruker
      </BaseButton>
    </template>

    <div class="grid grid-cols-3 gap-6 mt-6">
      <div class="col-span-2">
        <AdminSection title="Brukerinformasjon">
          <DescriptionList :fields="fields" :item="user">
            <template #is_active="{ item }">
              <div v-if="item.is_active" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Aktiv
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Ikke aktiv
              </div>
            </template>
            <template #subscribed_to_newsletter="{ item }">
              <div v-if="item.subscribed_to_newsletter" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
            <template #allow_personalization="{ item }">
              <div v-if="item.allow_personalization" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
            <template #allow_third_party_personalization="{ item }">
              <div v-if="item.allow_third_party_personalization" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
          </DescriptionList>
        </AdminSection>
        <AdminSection title="Notater">
          <AdminNotes 
            :notes="user.notes"
            @add-note="addNote"
            @edit-note="editNote"
            @delete-note="deleteNote"
          />
        </AdminSection>
      </div>
      <div class="col-span-1">
        <AdminSection title="Aktivitet">
          <AdminAuditLog :logs="user.audit_logs" :creationDate="user.date_joined" />
        </AdminSection>
      </div>
    </div>
  </AdminDetailTemplate>
</template>

<script>
import AdminDetailTemplate from '@/views/templates/admin-detail.vue'
import DescriptionList from '@/components/description-list.vue'
import AdminSection from '@/components/admin-section.vue'
import AdminAuditLog from '@/components/admin-audit-log.vue'
import AdminNotes from '@/components/admin-notes.vue'

import apiService from '@/common/api'

export default {
  name: 'UserDetail',
  components: {
    AdminDetailTemplate,
    DescriptionList,
    AdminSection,
    AdminAuditLog,
    AdminNotes,
  },
  data() {
    return {
      user: {
        notes: [],
        audit_logs: [],
      },
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
      ],
    }
  },
  methods: {
    fetchUser(id) {
      apiService.get(`users/${id}/`)
        .then(user => {
          this.user = user.data
        })
    },
    addNote(note) {
      apiService.post(`users/2/notes/`, {note: note})
        .then(
          this.$store.dispatch('common/setNotification', 'Notat opprettet!'),
          this.fetchUser(2)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
    editNote(note) {
      apiService.put(`users/2/notes/`, {id: note.id, note: note.note})
        .then(
          this.$store.dispatch('common/setNotification', 'Notat oppdatert'),
          this.fetchUser(2)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
    deleteNote(id) {
      apiService.delete(`utils/notes/${id}/delete/`)
        .then(
          this.$store.dispatch('common/setNotification', 'Notat slettet'),
          this.fetchUser(2)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    }
  },
  created() {
    this.fetchUser(2)
  }
}
</script>