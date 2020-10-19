<template>
  <AuthTemplate>
    <template #auth-heading>
      <h1 class="text-xl font-medium text-gray-900">Skriv inn det nye passordet ditt</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        For sikkerhets skyld ber vi deg skrive inn det nye passordet ditt to ganger, slik at vi kan dobbelsjekke at du har skrevet det riktig.
      </div>
    </template>
    <template #auth-content>
      <form class="max-w-sm m-auto" @submit.prevent="resetPassword">
        <div>
          <BaseInput 
            id="id_password"
            v-model="new_password1" 
            label="Nytt passord" 
            block 
            type="password"
            :error="$errorMsg(errors.new_password1)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput 
            id="id_password2"
            v-model="new_password2" 
            label="Bekfreft nytt passord" 
            block 
            type="password"
            :error="$errorMsg(errors.new_password2)"
            @input="resetErrorMessage"
          />
        </div>
        <BaseButton type="submit" class="flex justify-center w-full mt-4">Sett nytt passord</BaseButton>
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
      new_password1: '',
      new_password2: '',
      errors: {},
    }
  },
  methods: {
    resetPassword() {

      // unique id and token required to reset password
      const uid = this.$route.params.uid
      const token = this.$route.params.token

      const payload = {
        new_password1: this.new_password1,
        new_password2: this.new_password2,
        uid: uid,
        token: token
      }

      return apiService.post(`users/password/reset/confirm/${uid}/${token}/`, payload)
        .then(() => {
          // reset previous errors
          this.errors = {}

          // confirm change success to user and redirect to login
          this.$store.dispatch('auth/setAuthMessage', 'Nytt passord satt! Du kan nå logge inn.')
          this.$router.push({name: 'LogIn'})
        })
        .catch(error => {
          // set errors for fields and notify user
          this.errors = this.$catchError(error)
          this.$store.dispatch('auth/setAuthTemplateErrorMessage', this.$catchError(error))

          // reset variables
          this.new_password1 = ''
          this.new_password2 = ''
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