<template>
  <div>
    <Edit
      :title='`Rediger "${user.full_name}"`'
      :subtitle="user.email"
      :breadcrumbs="breadcrumbs"
    >
      <template #page-actions>
        <BaseButton>Main action</BaseButton>
      </template>
      <template #edit-content>
        <FormGroup :groups="formGroups" @save-changes="saveChanges">
          <template #errors v-if="errorsLength > 0">
            <BaseError></BaseError>
          </template>
          <template #contactinfo>
            <div class="flex items-center">
              <BaseInput
                id="id_first_name"
                v-model="user.first_name" 
                label="Fornavn"
                :value="user.first_name"
                block 
                class="mr-2"
                :error="errorMsg(errors.first_name)"
              />
              <BaseInput 
                id="id_last_name"
                v-model="user.last_name" 
                :value="user.last_name"
                label="Etternavn" 
                block
                :error="errorMsg(errors.last_name)"
              />
            </div>
            <div class="mt-5">
              <BaseInput
                id="id_phone_number"
                v-model="user.phone_number" 
                :value="user.phone_number"
                label="Telefonnummer"
                block
                :error="errorMsg(errors.phone_number)"
              />
            </div>
            <div class="mt-5">
              <BaseInput
                id="id_email"
                v-model="user.email" 
                :value="user.email"
                label="E-post" 
                block
                :error="errorMsg(errors.email)"
              />
            </div>
            <div class="flex items-center mt-5">
              <BaseInput
                id="id_street_address"
                v-model="user.street_address"
                :value="user.street_address" 
                label="Gateadresse" 
                block 
                class="mr-2"
                :error="errorMsg(errors.street_address)" 
              />
              <div class="flex items-center">
                <BaseInput
                  id="id_zip_code"
                  v-model="user.zip_code" 
                  :value="user.zip_code"
                  type="number"
                  label="Postnummer" 
                  block 
                  class="mr-2"
                  :error="errorMsg(errors.zip_code)" 
                />
                <BaseInput
                  id="id_zip_place"
                  v-model="user.zip_place"
                  :value="user.zip_place"
                  label="Poststed" 
                  block
                  :error="errorMsg(errors.zip_place)"
                />
              </div>
            </div>
          </template>
          <template #notifications>
            <BaseCheckbox
              id="id_has_confirmed_email"
              v-model="user.has_confirmed_email" 
              :checked="user.has_confirmed_email" 
              label="Verifisert e-post" 
              helpText="Kunden har bekreftet e-post adressen"
            />
            <BaseCheckbox
              id="id_disabled_emails"
              v-model="user.disabled_emails" 
              :checked="user.disabled_emails" 
              label="Deaktivert e-post" 
              helpText="Kunden vil ikke få noe form for kommuinkasjon (typisk brukt for konkurenter)"
              class="mt-5"
            />
            <BaseCheckbox
              id="id_subscribed_to_newsletter"
              v-model="user.subscribed_to_newsletter" 
              :checked="user.subscribed_to_newsletter" 
              label="Nyhetsbrev" 
              helpText="Kunden mottar nyhetsbrev av oss"
              class="mt-5"
            />
            <BaseCheckbox
              id="id_allow_personalization"
              v-model="user.allow_personalization" 
              :checked="user.allow_personalization" 
              label="Personalisering" 
              helpText="Brukeren ønsker en personalisert brukeropplevelse, og kan se noen sider annerledes"
              class="mt-5"
            />
            <BaseCheckbox
              id="id_allow_third_party_personalization"
              v-model="user.allow_third_party_personalization" 
              :checked="user.allow_third_party_personalization" 
              label="Tredjepartspersonalisering" 
              helpText="Ønsker tredjepartspersonalisering, og kan derfor se relevante anonser utenfor nettsiden"
              class="mt-5"
            />
            <BaseInput
              id="id_acquisition_source"
              v-model="user.acquisition_source"
              :value="user.acquisition_source"
              label="Kilde" 
              block
              class="mt-5"
            />
          </template>
          <template #high-level-account-management>
            <!-- TBA -->
          </template>
        </FormGroup>
      </template>
    </Edit>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service'

import Edit from '@/views/templates/edit'
import FormGroup from '@/components/form-group'

export default {
  name: 'UserEdit',
  components: {
    Edit,
    FormGroup
  },
  data() {
    return {
      user: {},
      errors: {},
      formGroups: [
        { title: 'Kontaktinfo', text: 'Generel kontaktinformasjon', value: 'contactinfo' },
        { title: 'Varslinger', text: 'Hvordan ønsker du at vi skal holde kontakt med deg? Generelle preferanser og innstillinger for varsling.', value: 'notifications' },
        { title: 'Kontoadministrasjon', text: 'Høhynivå kontoadministrasjon. Vært svært forsiktig med å røre disse instillingene. Kan føre til at bruker stenges ute fra tjenesten', value: 'high-level-account-management' }
      ]
    }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'Brukere', disabled: false, href: '/backend/users' }, 
        { text: this.user.full_name, disabled: false, href: `/backend/users/${this.$route.params.id}/` },
        { text: 'Rediger', disabled: true },
      ]
    },
    errorsLength() {
      return Object.keys(this.errors).length
    }
  },
  methods: {
    fetchUser(id) {
      apiService(`users/${id}/`)
        .then(user => {
          this.user = user
        })
    },
    saveChanges() {
      apiService(`users/${this.$route.params.id}/`, 'PATCH', this.user )
        .then(response => {
          if (response) {
              // fetch user again for vue to update instance without reload
              this.fetchUser(this.$route.params.id),

              // redirect user back to detail page
              this.$router.push({
                name: 'UserDetail',
                params: this.$route.params.id
              })
          }
        })
        .catch(error => {
          let errorMessage = JSON.parse(error.message)
          this.errors = errorMessage
        })
    },
    errorMsg(message) {
      if (message !== undefined) return message.toString()
    }
  },
  created() {
    this.fetchUser(this.$route.params.id)
  },
}
</script>