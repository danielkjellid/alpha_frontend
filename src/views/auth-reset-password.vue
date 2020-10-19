<template>
  <AuthTemplate>
    <template #auth-heading>
      <h1 class="text-xl font-medium text-gray-900">Har du glemt passordet ditt?</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        Gi oss e-postadressen din, så sende vi deg instruksjoner for hvordan du kan sette et nytt!
      </div>
    </template>
    <template #auth-content>
      <form class="max-w-sm m-auto" @submit.prevent="sendResetEmail">
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
        <BaseButton type="submit" class="flex justify-center w-full mt-4">Nullstill passordet mitt</BaseButton>
      </form>
    </template>
  </AuthTemplate>
</template>

<script>
import apiService from '@/common/api'
import AuthTemplate from '@/views/templates/auth.vue'

export default {
  name: 'ResetPassword',
  page() {
    return {
      title: 'Nullstill passord',
      meta: [
        {
          name: 'description',
          content: 'Nullstill passordet ditt hos oss'
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
      errors: {},
    }
  },
  methods: {
    sendResetEmail() {
      return apiService.post('users/password/reset/', {'email': this.email})
        .then(() => {
          // reset previous errors
          this.errors = {}
          this.$store.dispatch('auth/setAuthMessage', 'E-post med nullstilling av passord sendt!')
          this.$router.push({name: 'ResetPasswordConfirm'})
        })
        .catch(error => {
          this.errors = this.$catchError(error)
          this.$store.dispatch('auth/setAuthTemplateErrorMessage', this.$catchError(error))

          // reset variables
          this.email = ''
        })
    },
    resetErrorMessage() {
      if (this.errorMessage) {
        this.$store.dispatch('auth/resetAuthTemplateErrorMessage')
      }

      if (this.errors) {
        this.errors = {}
      }
    }
  }
}
</script>