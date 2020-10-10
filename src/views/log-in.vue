<template>
  <div>
    <BaseNotification v-if="!error" title="Logget inn suksessfullt!" subtitle="Du blir automatisk sendt tilbake til hjemmesiden." :display="showNotification" @close-notification="showNotification = false" />
    <BaseNotification v-else :success="!error" title="Innlogging feilet" subtitle="Feil brukernavn eller passord. Merk at du må skille mellom store og små bokstaver." :display="showNotification" @close-notification="showNotification = false" />
    <div :style="`background-image: url(${require('../assets/images/auth.jpg')});`" class="bg-center bg-no-repeat bg-cover">
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
                  <div class="focus:outline-none focus:text-gray-700 focus:border-gray-700 px-3 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b-2 border-gray-900" aria-current="page">
                    Logg inn
                  </div>
                  <router-link to="/konto/registrer/" class="hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:text-gray-700 focus:border-gray-300 px-3 py-4 ml-2 text-sm font-medium leading-5 text-gray-600 whitespace-no-wrap border-b-2 border-transparent">
                    Opprett konto
                  </router-link>
                </nav>
              </div>
            </div>
            <div class="mb-8 text-center">
              <h1 class="text-xl font-medium text-gray-900">Velkommen tilbake!</h1>
              <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
                Har du ikke en konto? <router-link to="/konto/registrer/" class="ml-1 font-medium text-gray-900 underline">Lag en her</router-link>
              </div>
            </div>
            <div v-if="error" class="mb-8">
              <BaseError :errors="['Feil brukernavn eller passord. Merk at du må skille mellom store og små bokstaver.']" />
            </div>
            <form class="max-w-sm m-auto" @submit.prevent="login">
              <div>
                <BaseInput v-model="email" id="id_email" label="E-post" block type="email"></BaseInput>
              </div>
              <div class="mt-5">
                <BaseInput v-model="password" id="id_password" label="Passord" block type="password"></BaseInput>
              </div>
              <div class="mt-4 mb-4 text-center">
                <span href="#" class="text-sm font-medium text-gray-900 underline">Glemt passordet?</span>
              </div>
              <BaseButton type="submit" class="flex justify-center w-full">Logg inn</BaseButton>
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
  name: 'LogIn',
  data() {
    return {
      email: '',
      password: '',
      showNotification: false,
      error: false
    }
  },
  methods: {
    login() {
      // get new token pair
      apiService.post('auth/token/obtain/', {email: this.email, password: this.password})
        .then(response => {
          // update localStorage with access and refresh key
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)
        })
        .finally(() => {
          let self = this

          // set appropriate state
          this.error = false
          this.showNotification = true

          // populate the current user state in the users module once tokens is obtained
          this.$store.dispatch('auth/fetchCurrentUser')

          // set automatic redirect after login
          setTimeout(function() {
            self.$router.push({name: 'Home'})
          }, 2000)
        })
        .catch(() => {
          // populate state to display error message in form
          this.error = true
          // show an error notification
          this.showNotification = true
        })
    }
  }
}
</script>