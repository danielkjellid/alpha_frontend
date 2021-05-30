<template>
  <div class="relative">
    <AdminOverviewTemplateNew title="Produkter">
      <template #action>
        <BaseButton light @click="addModalActive = true" >
          Nytt produkt
        </BaseButton>
      </template>
      <BaseTable 
        showSearchbar
        showPagination
        searchbarPlaceholder="Søk etter navn, leverandør eller status"
        @onSearch="queryProducts"
        @onPrevious="previousPage"
        @onNext="nextPage"
        :headers="tableHeaders" 
        :items="tableItems"
        :currentRange="currentRangeDisplayed"
        :totalInstances="totalInstancesFetched"
        :currentPage="currentPageDisplayed"
        :totalPages="totalPagesFetched"
      >
        <template #product="{ item }">
          <div class="flex items-center">
            <img :src="item.product.thumbnail" class="object-cover w-10 h-8 mr-3 bg-gray-200 rounded-md" />
            {{ item.product.name }}
          </div>
        </template>
        <template #gross_price="{ item }">
          {{ item.site_state.gross_price | formatPrice }}kr
        </template>
        <template #status="{ item }">
          <div v-if="item.status == 'Draft'" class="flex items-center">
            <div class="flex items-center text-gray-800">
              <span class="mr-2 w-1.5 h-1.5 bg-gray-300 rounded-full" />
              Kladd
            </div>
          </div>
          <div v-else-if="item.status == 'Hidden'" class="flex items-center">
            <div class="flex items-center text-gray-800">
              <span class="mr-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
              Skjult
            </div>
          </div>
          <div v-else-if="item.status == 'Available'" class="flex items-center">
            <div class="flex items-center text-gray-800">
              <span class="mr-2 w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Tilgjengelig
            </div>
          </div>
          <div v-else-if="item.status == 'Discontinued'" class="flex items-center">
            <div class="flex items-center text-gray-800">
              <span class="mr-2 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
              Utgått
            </div>
          </div>
        </template>
        <template #variants="{ item }">
          <div class="flex items-center -space-x-5">
            <div v-for="(variant, index) in item.variants" :key="`${index}-${variant}`">
              <div class="w-8 h-8 mr-2 overflow-hidden border-2 border-gray-200 rounded-full">
                <img :src="variant.image" :alt="`Image of ${item.product.name} variant: ${variant.name}`">
              </div>
            </div>
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
        { text: 'Pris', value: 'gross_price' },
        { text: 'Enhet', value: 'unit' },
        { text: 'Status', value: 'status' },
        { text: 'Varianter', value: 'variants' },
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
    fetchProducts(endpoint) {
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
    queryProducts(query) {
      this.fetchUsers(`products/?search=${query}`)
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
      // apiService.post('users/', this.formData)
      //   .then(response => {
      //     if (response) {
      //       // close modal
      //       this.addModalActive = false
      //       // notify user that edit was successful
      //       this.$store.dispatch('common/setNotification', 'Bruker opprettet')
      //       // fetch user again for vue to update instance without reload
      //       this.fetchProducts('products/')
      //     }
      //   })
      //   .catch(error => {
      //     if (error.response) {
      //       let errorMessage = error.response.data
      //       this.errors = errorMessage
      //     }
      //   })
    }
  },
  created() {
    this.fetchProducts('products/')
  }
}
</script>