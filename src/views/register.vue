<template>
  <div>
    <BaseNotification v-if="!error" title="Oppretting av konto var vellykket" subtitle="Du blir automatisk sendt tilbake til hjemmesiden." :display="showNotification" @close-notification="showNotification = false" />
    <BaseNotification v-else :success="!error" title="Oppretting av konto feilet" :display="showNotification" @close-notification="showNotification = false" />
    <div :style="`background-image: url(${require('../assets/images/auth.jpg')});`">
      <div class="md:bg-transparent bg-white">
        <div class="md:m-0 lg:max-w-md max-w-sm min-h-screen px-5 py-6 m-auto bg-white">
          <nav class="absolute top-0 left-0 mt-5 ml-4">
            <router-link to="/" class="flex items-center text-sm font-medium leading-5 text-gray-900">
              <svg class="flex-shrink-0 w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Tilbake til Flishuset
            </router-link>
          </nav>
          <div class="pt-20">
            <div class="flex justify-center mb-8">
              <div class="border-b border-gray-200">
                <nav class="flex -mb-px">
                  <router-link to="/konto/logg-inn/" class="hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:text-gray-700 focus:border-gray-300 px-3 py-4 ml-2 text-sm font-medium leading-5 text-gray-600 whitespace-no-wrap border-b-2 border-transparent">
                    Logg inn
                  </router-link>
                  <div class="focus:outline-none focus:text-gray-700 focus:border-gray-700 px-3 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b-2 border-gray-900" aria-current="page">
                    Opprett konto
                  </div>
                </nav>
              </div>
            </div>
            <div class="mb-8 text-center">
              <h1 class="text-xl font-medium text-gray-900">Kom i gang med å handle</h1>
              <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
                Har du allerede en konto? <a href="{% url 'user-login' %}" class="ml-1 font-medium text-gray-900 underline">Logg inn her</a>
              </div>
            </div>
            <div v-if="error" class="mb-8">
              <BaseError />
            </div>
            <form @submit.prevent="createAccount">
              <div class="sm:flex sm:items-center sm:justify-between sm:w-full">
                <div class="sm:w-1/2">
                  <BaseInput 
                    id="id_first_name"
                    v-model="user.first_name" 
                    label="Fornavn" 
                    block
                    :error="errorMsg(errors.first_name)"
                  />
                </div>
                <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
                  <BaseInput 
                    id="id_last_name"
                    v-model="user.last_name" 
                    label="Etternavn" 
                    block
                    :error="errorMsg(errors.last_name)"
                  />
                </div>
              </div>
              <div class="mt-5">
                <BaseInput 
                  id="id_phone_number"
                  v-model="user.phone_number" 
                  label="Mobilnummer" 
                  type="number" 
                  block
                  :error="errorMsg(errors.phone_number)"
                />
              </div>
              <div class="mt-5">
                <BaseInput 
                  id="id_email"
                  v-model="user.email" 
                  label="E-post" 
                  block
                  :error="errorMsg(errors.email)"
                />
              </div>
              <div class="mt-5">
                <BaseInput 
                  id="id_password"
                  v-model="user.password"
                  label="Passord" 
                  block 
                  type="password"
                  :error="errorMsg(errors.password)"
                />
              </div>
              <div class="mt-5">
                <BaseInput
                  id="id_password2"
                  v-model="user.password2" 
                  label="Gjenta passord" 
                  block 
                  type="password"
                  :error="errorMsg(errors.password2)"
                />
              </div>
              <div class="mt-5">
                <BaseInput 
                  id="id_street_address"
                  v-model="user.street_address" 
                  label="Gateadresse" 
                  block
                  :error="errorMsg(errors.street_address)"
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
                    :error="errorMsg(errors.zip_code)"
                  />
                </div>
                <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
                  <BaseInput
                    id="id_zip_place"
                    v-model="user.zip_place" 
                    label="Sted" 
                    block
                    :error="errorMsg(errors.zip_place)"
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
              <BaseButton type="submit" class="flex justify-center w-full mt-5">Logg inn</BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/common/api'

export default {
  name: 'Register',
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        phone_number: '',
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
      showNotification: false
    }
  },
  methods: {
    createAccount() {
      
      // create the user
      return apiService.post('users/create/', this.user)
      .then(() => {
        // if there previously have been errors, reset these
        this.error = false
        this.showNotification = true
        this.errors = {}

        // get tokens and fetch user
        this.$store.dispatch('auth/obtainToken', {email: this.user.email, password: this.user.password})
        this.$store.dispatch('auth/fetchCurrentUser')

        // redirect to home
        setTimeout(function() {
          self.$router.push({name: 'Home'})
        }, 2000)
      })
      .catch(error => {
        // set errors
        this.error = true
        this.showNotification = true

        // get response errors and assign them to state
        let errorMessage = error.response.data
        this.errors = errorMessage
        window.scrollTo(0, 0)
      })
    },
    errorMsg(message) {
      // translate messages to string values
      if (message !== undefined) return message.toString()
    }
  }
}
</script>