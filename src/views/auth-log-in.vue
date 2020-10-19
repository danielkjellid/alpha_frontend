<template>
  <AuthTemplate>
    <template #auth-heading>
      <h1 class="text-xl font-medium text-gray-900">Velkommen tilbake!</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        Har du ikke en konto? <router-link to="/konto/registrer/" class="ml-1 font-medium text-gray-900 underline">Lag en her</router-link>
      </div>
    </template>
    <template #auth-content>
      <form class="max-w-sm m-auto" @submit.prevent="login">
        <div>
          <BaseInput 
            id="id_email"
            v-model="email" 
            label="E-post" 
            block 
            type="email"
            :error="$errorMsg(errors.email)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password"
            v-model="password" 
            label="Passord" 
            block 
            type="password"
            :error="$errorMsg(errors.password)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-4 mb-4 text-center">
          <router-link to="/konto/nullstill-passord/" class="text-sm font-medium text-gray-900 underline">Glemt passordet?</router-link>
        </div>
        <BaseButton type="submit" class="flex justify-center w-full">Logg inn</BaseButton>
      </form>
    </template>
  </AuthTemplate>
</template>

<script>
import apiService from '@/common/api'
import AuthTemplate from '@/views/templates/auth.vue'

export default {
  name: 'LogIn',
  page() {
    return {
      title: 'Logg inn',
      meta: [
        {
          name: 'description',
          content: 'Logg inn på flishuset'
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
    }
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login() {
      // get new token pair
      return apiService.post('auth/token/obtain/', {email: this.email, password: this.password})
        .then(response => {
          // reset errors object
          this.errors = {}

          // update localStorage with access and refresh key
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)

          // populate the current user state in the users module once tokens is obtained
          this.$store.dispatch('auth/fetchCurrentUser')
          this.$store.dispatch('auth/setAuthMessage', 'Logget inn suksessfullt!')
          
          // redirect to home
          this.$router.push({name: 'Home'})
        })
        .catch(error => {
          this.errors = this.$catchError(error)
          this.$store.dispatch('auth/setAuthTemplateErrorMessage', this.$catchError(error))

          // reset variables
          this.email = ''
          this.password = ''
        })
    },
    resetErrorMessage() {
      if (this.errorMessage) {
        this.$store.dispatch('auth/resetAuthTemplateErrorMessage')
      }
    }
  },
}
</script>