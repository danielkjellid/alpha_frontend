<template>
  <div>
    <BaseNotification 
      :display="errorMessage" 
      :success="false" 
      title="Oida! Noe gikk galt" 
      @close-notification="resetErrorMessage"
    />
    <BaseNotification 
      :display="authMessage" 
      :success="true" 
      :title="authMessage" 
      @close-notification="resetAuthMessage"
    />
    <div :style="`background-image: url(${require('../../assets/images/auth.jpg')});`" class="bg-center bg-no-repeat bg-cover">
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
          <div v-if="!currentUser" class="pt-20">
            <div v-if="navigableRoute" class="flex justify-center mb-8">
              <Tabs :tabs="tabs" />
            </div>
            <div class="mb-8 text-center">
              <slot name="auth-heading">
                <!-- heading content -->
              </slot>
            </div>
            <div v-if="errorMessage" class="mb-8">
              <BaseError :errors="errorMessage" />
            </div>
            <slot name="auth-content" @set-errors="console.log('fired')">
              <!-- auth body content -->
            </slot>
          </div>
          <div v-else class="pt-20">
            <div class="mb-8 text-center">
              <h1 class="text-xl font-medium text-gray-900">Velkommen tilbake!</h1>
              <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
                Du er allerede logget inn som {{ currentUser.full_name }} <button plain @click="logOut" class="ml-1 font-medium text-gray-900 underline">Logg ut?</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/tabs.vue'

export default {
  name: 'AuthTemplate',
  components: {
    Tabs,
  },
  computed: {
    currentUser() {
      return this.$store.getters['auth/getCurrentUser']
    },
    errorMessage() {
      return this.$store.getters['auth/getAuthTemplateErrorMessage']
    },
    authMessage() {
      return this.$store.getters['auth/getAuthMessage']
    },
    navigableRoute() {
      if (this.$route.name === 'LogIn' || this.$route.name === 'Register') return true

      return false
    }
  },
  data() {
    return {
      tabs: [
        { text: 'Logg inn', to: '/konto/logg-inn/'},
        { text: 'Opprett konto', to: '/konto/registrer/'},
      ],
      error: false,
      errors: {},
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logOut')
      this.$router.push({name: 'Home'})
    },
    resetErrorMessage() {
      if (this.errorMessage) {
        this.$store.dispatch('auth/resetAuthTemplateErrorMessage')
      }
    },
    resetAuthMessage() {
      if (this.authMessage) {
        this.$store.dispatch('auth/resetAuthMessage')
      }
    }
  }
}
</script>