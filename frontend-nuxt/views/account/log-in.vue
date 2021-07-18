<template>
  <AuthSidebarContent :errorMessage="errorMessage">
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
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-4 mb-4 text-center">
          <router-link to="/konto/nullstill-passord/" class="text-sm font-medium text-gray-900 underline">Glemt passordet?</router-link>
        </div>
        <BaseButton type="submit" class="flex justify-center w-full">Logg inn</BaseButton>
      </form>
    </template>
  </AuthSidebarContent>
</template>

<script lang="ts">
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'
import { useStore, computed, ref, useContext, useRouter} from '@nuxtjs/composition-api'
import $catchError from '~/mixins/catch-error'
import $errorMsg from '~/mixins/error-message'

export default {
  name: 'LogIn',
  layout: 'auth',
  components: {
    AuthSidebarContent
  },
  setup() {

    const store = useStore()
    const router = useRouter()
    const { $axios } = useContext()

    let email = ref<HTMLElement | string>('')
    let password = ref<HTMLElement | string>('')
    let errors = ref<HTMLElement | object | string>('')

    const errorMessage = computed(() => {
      return store.getters['common/getErrorNotification']
    })

    const login = async () => {
      await $axios.$post('auth/token/obtain/', {username: email.value, password: password.value})
        .then(data => {
          // reset errors object
          errors.value = ''
          // update localStorage with access and refresh key
          if (process.browser) {
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
          }

          // populate the current user state in the users module once tokens is obtained
          store.dispatch('auth/fetchCurrentUser')
          store.dispatch('common/setNotification', 'Logget inn suksessfullt!')

          // redirect to home
          router.push({name: 'index'})
        })
        .catch(error => {
          errors.value = $catchError(error)
          store.dispatch('common/setErrorNotification', errors.value)

          // reset variables
          email.value = ''
          password.value = ''
        })
    }

    const resetErrorMessage = () => {
      if (errorMessage.value) {
        store.dispatch('common/resetErrorNotification')
      }
    }

    return {
      email,
      password,
      errors,
      errorMessage,
      $errorMsg,
      login,
      resetErrorMessage
    }
  }
}
</script>
