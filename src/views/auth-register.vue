<template>
  <AuthTemplate>
    <template #auth-heading>
      <h1 class="text-xl font-medium text-gray-900">Kom i gang med å handle</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        Har du allerede en konto? <router-link to="/konto/logg-inn/" class="ml-1 font-medium text-gray-900 underline">Logg inn her</router-link>
      </div>
    </template>
    <template #auth-content>
      <form @submit.prevent="createAccount">
        <div class="sm:flex sm:items-center sm:justify-between sm:w-full">
          <div class="sm:w-1/2">
            <BaseInput 
              id="id_first_name"
              v-model="user.first_name" 
              label="Fornavn" 
              block
              :error="$errorMsg(errors.first_name)"
              @input="resetErrorMessage"
            />
          </div>
          <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
            <BaseInput 
              id="id_last_name"
              v-model="user.last_name" 
              label="Etternavn" 
              block
              :error="$errorMsg(errors.last_name)"
              @input="resetErrorMessage"
            />
          </div>
        </div>
        <div class="sm:flex sm:items-end sm:justify-between sm:w-full mt-5">
          <div class="sm:w-1/4">
            <BaseSelect 
              id="id_birth_day"
              v-model="birthDay"
              label="Fødselsdato" 
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option 
                v-for="i in 31" 
                :key="i" 
                :value="i" 
                :selected="i == 1"
              >
                {{ i }}
              </option>
            </BaseSelect>
          </div>
          <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
            <BaseSelect 
              id="id_birth_month"
              v-model="birthMonth"
              label="Fødselsmåned"
              hiddenLabel 
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option 
                v-for="month in months" 
                :key="month.val" :value="month.val" 
                :selected="month.val == '01'"
              >
                  {{ month.text }}
              </option>
            </BaseSelect>
          </div>
          <div class="sm:w-1/4 sm:ml-5 sm:mt-0 mt-5">
            <BaseSelect 
              id="id_birth_year"
              v-model="birthYear"
              label="Fødselsår"
              hiddenLabel 
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option 
                v-for="year in years" 
                :key="year" 
                :value="year" 
                :selected="year == 2021"
              >
                {{ year }}
              </option>
            </BaseSelect>
          </div>
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_phone_number"
            v-model="user.phone_number" 
            label="Mobilnummer" 
            type="number" 
            block
            :error="$errorMsg(errors.phone_number)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_email"
            v-model="user.email" 
            label="E-post" 
            block
            :error="$errorMsg(errors.email)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_password"
            v-model="user.password"
            label="Passord" 
            block 
            type="password"
            :error="$errorMsg(errors.password)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password2"
            v-model="user.password2" 
            label="Gjenta passord" 
            block 
            type="password"
            :error="$errorMsg(errors.password2)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_street_address"
            v-model="user.street_address" 
            label="Gateadresse" 
            block
            :error="$errorMsg(errors.street_address)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="sm:flex sm:items-center sm:justify-between sm:w-full sm:mt-5">
          <div class="sm:w-1/2 sm:mt-0 mt-5">
            <BaseInput 
              id="id_zip_code"
              v-model="user.zip_code" 
              label="Postkode" 
              type="number" 
              block
              :error="$errorMsg(errors.zip_code)"
              @input="resetErrorMessage"
            />
          </div>
          <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
            <BaseInput
              id="id_zip_place"
              v-model="user.zip_place" 
              label="Sted" 
              block
              :error="$errorMsg(errors.zip_place)"
              @input="resetErrorMessage"
            />
          </div>
        </div>
        <div class="mt-6">
          <BaseCheckbox
            id="id_subscribed_to_newsletter"
            v-model="user.subscribed_to_newsletter" 
            :checked="user.subscribed_to_newsletter" 
            label="Jeg ønsker nyheter på e-post" 
          />
          <BaseCheckbox
            id="id_allow_personalization"
            v-model="user.allow_personalization" 
            :checked="user.allow_personalization" 
            label="Jeg ønsker en personalisert handleoppelvelse og kommunikasjon" 
            class="mt-5"
          />
          <BaseCheckbox
            id="id_allow_third_party_personalization"
            v-model="user.allow_third_party_personalization" 
            :checked="user.allow_third_party_personalization" 
            label="Jeg ønsker personlig markedsføring i andre kanaler" 
            class="mt-5"
          />
        </div>
        <BaseButton type="submit" class="flex justify-center w-full mt-5">Opprett konto</BaseButton>
      </form>
    </template>
  </AuthTemplate>
</template>

<script>
import apiService from '@/common/api'
import AuthTemplate from '@/views/templates/auth.vue'

export default {
  name: 'Register',
  page() {
    return {
      title: 'Lag konto',
      meta: [
        {
          name: 'description',
          content: 'Lag konto hos oss'
        }
      ]
    }
  },
  components: {
    AuthTemplate
  },
  computed: {
    errorMessage() {
      return this.$store.getters['auth/getAuthTemplateErrorMessage']
    },
    years() {
      const year = new Date().getFullYear()

      return Array.from({length: year - 1900}, (value, index) => 1901 + index).sort((a, b) => b - a)
    },
    fullBirthDate() {
      return `${this.birthYear}-${this.birthMonth}-${this.birthDay}`
    }
  },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        phone_number: '',
        birth_date: '',
        email: '',
        password: '',
        password2: '',
        street_address: '',
        zip_code: '',
        zip_place: '',
        subscribed_to_newsletter: true,
        allow_personalization: true,
        allow_third_party_personalization: true
      },
      error: false,
      errors: {},
      showNotification: false,
      months: [
        {val: '01', text: 'Januar'},
        {val: '02', text: 'Februar'},
        {val: '03', text: 'Mars'},
        {val: '04', text: 'April'},
        {val: '05', text: 'Mai'},
        {val: '06', text: 'Juni'},
        {val: '07', text: 'Juli'},
        {val: '08', text: 'August'},
        {val: '09', text: 'September'},
        {val: '10', text: 'Oktober'},
        {val: '11', text: 'November'},
        {val: '12', text: 'Desember'},
      ],
      birthDay: '1',
      birthMonth: '01',
      birthYear: '2021'
    }
  },
  methods: {
    createAccount() {
      // create the user
      this.user.birth_date = this.fullBirthDate

      return apiService.post('users/create/', this.user)
        .then(() => {
          // if there previously have been errors, reset
          this.errors = {}

          // get tokens and fetch user
          this.$store.dispatch('auth/obtainToken', {username: this.user.email, password: this.user.password})
          this.$store.dispatch('auth/fetchCurrentUser')
          this.$store.dispatch('common/setNotification', 'Konto opprettet suksessfullt!')

          // after user is created, send email to verify account
          apiService.post('users/verify/', {email: this.user.email})
            .catch((error) => {
              this.errors = this.$catchError(error)
              this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
          })

          // redirect to home
          this.$router.push({name: 'Home'})
        })
        .catch(error => {
          this.errors = this.$catchError(error)
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
        })
    },
    resetErrorMessage() {
      if (this.errorMessage) {
        this.$store.dispatch('common/resetErrorNoification')
      }

      if (this.errors) {
        this.errors = {}
      }
    }
  }
}
</script>