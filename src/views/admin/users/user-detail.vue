<template>
  <div class="relative" v-if="user.profile">
    <AdminDetailTemplate :tabs="tabs">
      <template #title>
        <div :style="`background-color: ${user.profile.avatar_color}`" class="flex items-center justify-center w-10 h-10 mr-3 rounded-full">
          <span class="text-sm text-white">{{ user.profile.initial }}</span>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900">{{ user.profile.full_name ? user.profile.full_name : undefined }}</h1>
      </template>
      <template #actions>
        <BaseButton @click="editModalActive = true" light>
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

    <!-- editmodal content -->
    <AdminModalPanel 
      :title="`Rediger ${user.profile.full_name}`"
      :active="editModalActive"
      @close="editModalActive = false"
      @save="editUser"
    >
      <div class="px-4 pb-5" v-if="errorsLength > 0">
        <BaseError />
      </div>
      <AdminSection title="Kontaktinformasjon">
        <div class="flex items-center">
          <BaseInput
            id="id_first_name"
            v-model="form.first_name" 
            label="Fornavn"
            :value="form.first_name"
            block 
            class="mr-2"
            :error="errorMsg(errors.first_name)"
          />
          <BaseInput 
            id="id_last_name"
            v-model="form.last_name" 
            :value="form.last_name"
            label="Etternavn" 
            block
            :error="errorMsg(errors.last_name)"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_phone_number"
            v-model="form.phone_number" 
            :value="form.phone_number"
            label="Telefonnummer"
            block
            :error="errorMsg(errors.phone_number)"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_email"
            v-model="form.email" 
            :value="form.email"
            label="E-post" 
            block
            :error="errorMsg(errors.email)"
          />
        </div>
        <div class="flex items-center mt-5">
          <BaseInput
            id="id_street_address"
            v-model="form.street_address"
            :value="form.street_address" 
            label="Gateadresse" 
            block 
            class="mr-2"
            :error="errorMsg(errors.street_address)" 
          />
          <div class="flex items-center">
            <BaseInput
              id="id_zip_code"
              v-model="form.zip_code" 
              :value="form.zip_code"
              type="number"
              label="Postnummer" 
              block 
              class="mr-2"
              :error="errorMsg(errors.zip_code)" 
            />
            <BaseInput
              id="id_zip_place"
              v-model="form.zip_place"
              :value="form.zip_place"
              label="Poststed" 
              block
              :error="errorMsg(errors.zip_place)"
            />
          </div>
        </div>
      </AdminSection>
      <AdminSection title="Varslinger">
        <BaseCheckbox
          id="id_has_confirmed_email"
          v-model="form.has_confirmed_email" 
          :checked="form.has_confirmed_email" 
          label="Verifisert e-post" 
          helpText="Kunden har bekreftet e-post adressen"
        />
        <BaseCheckbox
          id="id_disabled_emails"
          v-model="form.disabled_emails" 
          :checked="form.disabled_emails" 
          label="Deaktivert e-post" 
          helpText="Kunden vil ikke få noe form for kommuinkasjon (typisk brukt for konkurenter)"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_subscribed_to_newsletter"
          v-model="form.subscribed_to_newsletter" 
          :checked="form.subscribed_to_newsletter" 
          label="Nyhetsbrev" 
          helpText="Kunden mottar nyhetsbrev av oss"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_allow_personalization"
          v-model="form.allow_personalization" 
          :checked="form.allow_personalization" 
          label="Personalisering" 
          helpText="Brukeren ønsker en personalisert brukeropplevelse, og kan se noen sider annerledes"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_allow_third_party_personalization"
          v-model="form.allow_third_party_personalization" 
          :checked="form.allow_third_party_personalization" 
          label="Tredjepartspersonalisering" 
          helpText="Ønsker tredjepartspersonalisering, og kan derfor se relevante anonser utenfor nettsiden"
          class="mt-5"
        />
        <BaseInput
          id="id_acquisition_source"
          v-model="form.acquisition_source"
          :value="form.acquisition_source"
          label="Kilde" 
          block
          class="mt-5"
        />
      </AdminSection>
      <AdminSection title="Høynivå kontoadministrasjon">
        TBA
      </AdminSection>
    </AdminModalPanel>
  </div>
</template>

<script>
import AdminDetailTemplate from '@/views/templates/admin-detail.vue'
import DescriptionList from '@/components/description-list.vue'
import AdminSection from '@/components/admin-section.vue'
import AdminAuditLog from '@/components/admin-audit-log.vue'
import AdminNotes from '@/components/admin-notes.vue'
import AdminModalPanel from '@/components/admin-modal-panel.vue'

import apiService from '@/common/api'

export default {
  name: 'UserDetail',
  components: {
    AdminDetailTemplate,
    DescriptionList,
    AdminSection,
    AdminAuditLog,
    AdminNotes,
    AdminModalPanel
  },
  computed: {
    errorsLength() {
      return Object.keys(this.errors).length
    }
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
      tabs: [{text: 'Oversikt', to: `/backend/users/${this.$route.params.id}`},{text: 'Forespørsler', to: '/'}, {text: 'Handlekurv', to: '/'}, {text: 'Innlogginger', to: '/'}, {text: 'Rettigheter', to: '/'}],
      editModalActive: false,
      form: {},
      errors: [],
    }
  },
  methods: {
    fetchUser(id) {
      apiService.get(`users/${id}/`)
        .then(user => {
          this.user = user.data
          this.form = Object.assign({}, this.user)
        })
    },
    errorMsg(message) {
      if (message !== undefined) return message.toString()
    },
    editUser() {
      apiService.put(`users/${this.$route.params.id}/`, this.form)
        .then(response => {
          if (response) {
            // close modal
            this.editModalActive = false
            // notify user that edit was successful
            this.$store.dispatch('common/setNotification', 'Bruker oppdatert')
            // fetch user again for vue to update instance without reload
            this.fetchUser(this.$route.params.id)
          }
        })
        .catch(error => {
          if (error.response) {
            let errorMessage = error.response.data
            this.errors = errorMessage
          }
        })
    },

    // note methods for adding, editing and deleting
    addNote(note) {
      apiService.post(`users/${this.$route.params.id}/notes/`, {note: note})
        .then(
          this.$store.dispatch('common/setNotification', 'Notat opprettet!'),
          this.fetchUser(this.$route.params.id)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
    editNote(note) {
      apiService.put(`users/${this.$route.params.id}/notes/`, {id: note.id, note: note.note})
        .then(
          this.$store.dispatch('common/setNotification', 'Notat oppdatert'),
          this.fetchUser(this.$route.params.id)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
    deleteNote(id) {
      apiService.delete(`utils/notes/${id}/delete/`)
        .then(
          this.$store.dispatch('common/setNotification', 'Notat slettet'),
          this.fetchUser(this.$route.params.id)
        )
        .catch(error => {
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
  },
  created() {
    this.fetchUser(this.$route.params.id)
  }
}
</script>