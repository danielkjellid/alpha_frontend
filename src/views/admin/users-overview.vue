<template>
  <div class="relative">
    <AdminOverviewTemplateNew title="Brukere">
      <template #action>
        <BaseButton light @click="addModalActive = true" >
          Ny bruker
        </BaseButton>
      </template>
      <BaseTable 
        showSearchbar
        showPagination
        @onSearch="queryUsers"
        @onPrevious="previousPage"
        @onNext="nextPage"
        :headers="tableHeaders" 
        :items="tableItems"
        :currentRange="currentRangeDisplayed"
        :totalInstances="totalInstancesFetched"
        :currentPage="currentPageDisplayed"
        :totalPages="totalPagesFetched"
      >
        <template #profile="{ item }">
          <div class="flex items-center">
            <div :style="`background-color: ${item.profile.avatar_color}`" class="flex items-center justify-center w-6 h-6 mr-2 text-xs text-white rounded-full">{{item.profile.initial}}</div>
            {{ item.profile.full_name }}
          </div>
        </template>
        <template #is_active="{ item }">
          <div v-if="item.is_active" class="flex items-center">
            <BaseIcon v-if="item.is_active" name="check-circle" fill="text-green-400" class="mr-2" />
            Aktiv
          </div>
          <div v-else class="flex items-center">
            <BaseIcon v-if="!item.is_active" name="x-circle" fill="text-red-400" class="mr-2" />
            Inaktiv
          </div>
        </template>
        <template #action="{ item }">
          <router-link :to="'/backend/users/' + item.id" class="hover:bg-gray-200 flex items-center px-4 py-2 text-sm text-gray-800">
            Se bruker
          </router-link>
          <router-link :to="'/backend/users/' + item.id" class="hover:bg-gray-200 flex items-center px-4 py-2 text-sm text-gray-800">
            Rediger bruker
          </router-link>
        </template>
      </BaseTable>
    </AdminOverviewTemplateNew>
    
    <!-- editmodal content -->
    <AdminModalPanel 
      title="Opprett bruker"
      :active="addModalActive"
      @close="addModalActive = false"
      @save="addUser"
    >
      <div class="px-4 pb-5" v-if="errorsLength > 0">
        <BaseError />
      </div>
      <AdminSection title="Kontaktinformasjon">
        <div class="flex items-center">
          <BaseInput
            id="id_first_name"
            v-model="formData.first_name" 
            label="Fornavn"
            :value="formData.first_name"
            block 
            class="mr-2"
            :error="errorMsg(errors.first_name)"
          />
          <BaseInput 
            id="id_last_name"
            v-model="formData.last_name" 
            :value="formData.last_name"
            label="Etternavn" 
            block
            :error="errorMsg(errors.last_name)"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_phone_number"
            v-model="formData.phone_number" 
            :value="formData.phone_number"
            label="Telefonnummer"
            block
            :error="errorMsg(errors.phone_number)"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_email"
            v-model="formData.email" 
            :value="formData.email"
            label="E-post" 
            block
            :error="errorMsg(errors.email)"
          />
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_password"
            v-model="formData.password"
            label="Passord" 
            block 
            type="password"
            :error="$errorMsg(errors.password)"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password2"
            v-model="formData.password2" 
            label="Gjenta passord" 
            block 
            type="password"
            :error="$errorMsg(errors.password2)"
          />
        </div>
        <div class="flex items-center mt-5">
          <BaseInput
            id="id_street_address"
            v-model="formData.street_address"
            :value="formData.street_address" 
            label="Gateadresse" 
            block 
            class="mr-2"
            :error="errorMsg(errors.street_address)" 
          />
          <div class="flex items-center">
            <BaseInput
              id="id_zip_code"
              v-model="formData.zip_code" 
              :value="formData.zip_code"
              type="number"
              label="Postnummer" 
              block 
              class="mr-2"
              :error="errorMsg(errors.zip_code)" 
            />
            <BaseInput
              id="id_zip_place"
              v-model="formData.zip_place"
              :value="formData.zip_place"
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
          v-model="formData.has_confirmed_email" 
          :checked="formData.has_confirmed_email" 
          label="Verifisert e-post" 
          helpText="Kunden har bekreftet e-post adressen"
        />
        <BaseCheckbox
          id="id_disabled_emails"
          v-model="formData.disabled_emails" 
          :checked="formData.disabled_emails" 
          label="Deaktivert e-post" 
          helpText="Kunden vil ikke få noe form for kommuinkasjon (typisk brukt for konkurenter)"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_subscribed_to_newsletter"
          v-model="formData.subscribed_to_newsletter" 
          :checked="formData.subscribed_to_newsletter" 
          label="Nyhetsbrev" 
          helpText="Kunden mottar nyhetsbrev av oss"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_allow_personalization"
          v-model="formData.allow_personalization" 
          :checked="formData.allow_personalization" 
          label="Personalisering" 
          helpText="Brukeren ønsker en personalisert brukeropplevelse, og kan se noen sider annerledes"
          class="mt-5"
        />
        <BaseCheckbox
          id="id_allow_third_party_personalization"
          v-model="formData.allow_third_party_personalization" 
          :checked="formData.allow_third_party_personalization" 
          label="Tredjepartspersonalisering" 
          helpText="Ønsker tredjepartspersonalisering, og kan derfor se relevante anonser utenfor nettsiden"
          class="mt-5"
        />
        <BaseInput
          id="id_acquisition_source"
          v-model="formData.acquisition_source"
          :value="formData.acquisition_source"
          label="Kilde" 
          block
          class="mt-5"
        />
      </AdminSection>
    </AdminModalPanel>
  </div>
</template>

<script>
import apiService from '@/common/api'
import AdminOverviewTemplateNew from '@/views/templates/admin-overview.vue'
import AdminModalPanel from '@/components/admin-modal-panel.vue'
import AdminSection from '@/components/admin-section.vue'

export default {
  components: {
    AdminOverviewTemplateNew,
    AdminModalPanel,
    AdminSection
  },
  computed: {
    errorsLength() {
      return Object.keys(this.errors).length
    }
  },
  data() {
    return {
      currentRangeDisplayed: null,
      totalInstancesFetched: null,
      currentPageDisplayed: null,
      totalPagesFetched: null,
      previousPath: null,
      nextPath: null,
      tableItems: [],
      tableHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Navn', value: 'name' },
        { text: 'E-post', value: 'email' },
        { text: 'Aktiv', value: 'active' },
        { text: 'Registrert', value: 'dateJoined' },
        { text: '', value: 'actions' },
      ],
      addModalActive: false,
      formData: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        password2: '',
        street_address: '',
        zip_code: '',
        zip_place: '',
        has_confirmed_email: false,
        disabled_emails: true,
        subscribed_to_newsletter: true,
        allow_personalization: true,
        allow_third_party_personalization: true
      },
      errors: [],
    }
  },
  methods: {
    fetchUsers(endpoint) {
      apiService.get(endpoint)
        .then(response => {
          this.previousPath = response.data.links.previous
          this.nextPath = response.data.links.next
          this.currentRangeDisplayed = response.data.meta.current_range
          this.totalInstancesFetched = response.data.meta.total
          this.currentPageDisplayed = response.data.meta.current_page
          this.totalPagesFetched = response.data.meta.total_pages
          this.tableItems = response.data.results
  
        })
    },
    queryUsers(query) {
      this.fetchUsers(`users/?search=${query}`)
    },
    nextPage() {
      this.fetchUsers(this.nextPath)
    },
    previousPage() {
      this.fetchUsers(this.previousPath)
    },
    errorMsg(message) {
      if (message !== undefined) return message.toString()
    },
    addUser() {
      apiService.post('users/', this.formData)
        .then(response => {
          if (response) {
            // close modal
            this.addModalActive = false
            // notify user that edit was successful
            this.$store.dispatch('common/setNotification', 'Bruker opprettet')
            // fetch user again for vue to update instance without reload
            this.fetchUsers()
          }
        })
        .catch(error => {
          if (error.response) {
            let errorMessage = error.response.data
            this.errors = errorMessage
          }
        })
    }
  },
  created() {
    this.fetchUsers('users/')
  }
}
</script>