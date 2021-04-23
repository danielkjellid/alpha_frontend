<template>
  <div class="relative min-h-screen">
    <div v-if="isDevEnvironment" class="dev-env-warning z-50 py-1 text-center">
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div>
    <SiteMessage :display="confimedAccount == false">
      <div class="md:hidden flex-col">
        <span>Bekreft kontoen din gjennom e-posten vi har sendt deg. Ikke mottatt?</span>
        <BaseButton @click="sendNewVerificationEmail" plain class="hover:text-gray-700 sm:ml-0 ml-1 font-medium underline">Send e-post</BaseButton>
      </div>
      <div class="md:block hidden">
        <span>{{ userFirstName }}, for å kunne gå videre må du bekrefte kontoen din ved å trykke på knappen i e-posten vi har sendt deg på {{ userEmail }}. Ikke mottatt e-post?</span>
        <BaseButton @click="sendNewVerificationEmail" plain class="hover:text-gray-900 ml-1 font-medium underline">Send e-post på nytt</BaseButton>
      </div>
    </SiteMessage>
    <router-view class="relative" />
    <div v-if="showMessage" class="sm:pb-5 fixed inset-x-0 bottom-0 pb-2">
      <div class="sm:px-6 lg:px-8 max-w-screen-xl px-2 mx-auto">
        <div class="sm:p-3 p-2 bg-white rounded-lg shadow-lg">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center">
              <span class="flex p-2 bg-gray-300 rounded-lg">
                <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p class="ml-3 font-medium text-gray-800">
                <span class="md:hidden">
                  Vi har lansert ny nettside!
                </span>
                <span class="md:flex md:items-center hidden">
                  Ny nettside! Masse spennende innhold kommer, så besøk oss gjerne igjen 😊
                </span>
              </p>
            </div>
            <div class="sm:order-3 sm:ml-2 flex-shrink-0 order-2">
              <button @click="hideMessage" type="button" class="hover:text-gray-600 flex p-2 -mr-1 text-gray-500 transition duration-150 ease-in-out rounded-md" aria-label="Dismiss">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteMessage from '@/components/site-message.vue'

export default {
  name: 'App',
  page() {
    return {
      title: 'Flishuset',
      titleTemplate: 'Flishuset - %s'
    }
  },
  components: {
    SiteMessage
  },
  computed: {
    isDevEnvironment() {
      if (process.env.NODE_ENV !== 'production') return true

      return false
    },
    confimedAccount() {
      return this.$store.getters['auth/getIsAccountVerifiedOrAnonymous']
    },
    currentUser() {
      return this.$store.getters['auth/getCurrentUser']
    },
    userEmail() {
      if (this.currentUser) return this.currentUser.email

      return undefined
    },
    userFirstName() {
      if (this.currentUser) return this.currentUser.first_name

      return undefined
    }
  },
  data() {
    return {
      showMessage: localStorage.getItem('show_message') ? JSON.parse(localStorage.getItem('show_message')) : true,
    }
  },
  methods: {
    hideMessage() {
      this.showMessage = false
      localStorage.setItem('show_message', false)
    },
    sendNewVerificationEmail() {
      this.$store.dispatch('auth/resendVerificationEmail')
    }
  },
}
</script>

<style>
   @import url('https://rsms.me/inter/inter.css');
   html { font-family: 'Inter', sans-serif; }
</style>

<style scoped>
  .dev-env-warning {
    background: repeating-linear-gradient(
      45deg,
      #FBBF24,
      #FBBF24 10px,
      #F59E0B 10px,
      #F59E0B 20px
    );
  }
</style>
