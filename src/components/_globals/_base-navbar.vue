<template>
  <nav>
    <div class="sm:py-8 sm:px-8 px-5 py-5" :class="renderNavbarDark ? 'bg-white' : 'bg-transparent'">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div>
            <svg class="w-8 h-8 text-white" :class="renderNavbarDark ? 'text-gray-800' : 'text-white'" viewBox="0 0 308 308" fill="currentColor">
              <path d="M0 154.24V0h308.48v86.4H86.4v23.36h109.63l2.693 2.744v83.523l-2.744 2.694H86.4v109.76H0zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" />
            </svg>
          </div>
          <div class="md:block hidden ml-4">
            <router-link to="/" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses">Produkter</router-link>
            <router-link to="/kjokken" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Kjøkken</router-link>
            <router-link to="/tegnetime" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tegnetime</router-link>
            <router-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Om oss</router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div v-click-outside="hideUserMenu" class="relative mr-3">
            <div class="flex items-center">
              <BaseButton @click="userMenuActive = !userMenuActive" icon plain :light="!renderNavbarDark">
                <BaseIcon name="user" height="h-6" width="w-6"/>
              </BaseButton>
            </div>
            <transition
              enter-class="transform scale-95 opacity-0"
              enter-active-class="transition duration-200 ease-out"
              enter-to-class="ransform scale-100 opacity-100"
              leave-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-show="userMenuActive" class="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow">
                <div class="px-4 py-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <router-link to="/" class="hover:text-gray-800 block text-sm leading-6 text-gray-600">Din konto</router-link>
                  <router-link to="/" class="hover:text-gray-800 block mt-4 text-sm leading-6 text-gray-600">Innstillinger</router-link>
                  <router-link to="/" class="hover:text-gray-800 block mt-4 text-sm leading-6 text-gray-600">Logg ut</router-link>
                </div>
              </div>
            </transition>
          </div>
          <BaseButton to="/" icon plain :light="!renderNavbarDark" class="md:mr-0 flex items-center mr-3">
            <BaseIcon name="cart" height="h-6" width="w-6"/>
             <span class="ml-1 text-sm font-medium" :class="renderNavbarDark ? 'text-gray-600' : 'text-gray-400'">0</span>
          </BaseButton>
          <BaseButton @click="mobileMenuActive = true" icon plain :light="!renderNavbarDark" class="md:hidden">
            <BaseIcon name="menu" height="h-6" width="w-6"/>
          </BaseButton>
        </div>
      </div>
    </div>
    <transition name="slide-in">
      <div v-show="mobileMenuActive" class="absolute top-0 bottom-0 left-0 right-0 block w-full bg-white">
        <div class="px-5 py-5 border-b border-gray-300">
          <div class="flex items-center justify-between">
            <div></div>
            <div class="text-center">
              <p class="text-base leading-6 text-gray-900">Meny</p>
            </div>
            <button @click="mobileMenuActive = false" class="hover:text-gray-800 w-5 h-5 text-gray-600">
              <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="mt-5">
            <router-link to="/" class="hover:text-gray-600 block text-base leading-6 text-gray-800">Produkter</router-link>
            <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-6 text-gray-800">Kjøkken</router-link>
            <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-6 text-gray-800">Tegnetime</router-link>
            <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-6 text-gray-800">Om oss</router-link>
          </div>
        </div>
        <div class="px-5 py-5">
          <div class="flex items-center">
            <div class="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full">
              <BaseIcon name="user" fill="text-gray-500"></BaseIcon>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-6 text-gray-800">Daniel Kjellid</div>
              <div class="text-sm font-medium leading-5 text-gray-600">daniel@example.com</div>
            </div>
          </div>
          <div class="mt-5">
            <router-link to="/" class="hover:text-gray-800 block text-base leading-6 text-gray-600">Din konto</router-link>
            <router-link to="/" class="hover:text-gray-800 block mt-4 text-base leading-6 text-gray-600">Innstillinger</router-link>
            <router-link to="/" class="hover:text-gray-800 block mt-4 text-base leading-6 text-gray-600">Logg ut</router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    renderNavbarDark() {
      if (this.$route.meta.navbarDark !== undefined) return true
    
      return false
    },
    renderNavbarLinkClasses() {
      if (this.renderNavbarDark) return 'hover:text-gray-700 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out'

      return 'hover:text-white text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out'
    },
    renderNavbarLinkActiveClasses() {
      if (this.renderNavbarDark) return 'text-gray-800'

      return 'active-pale-link'
    }
  },
  data() {
    return {
      mobileMenuActive: false,
      userMenuActive: false,
    }
  },
  methods: {
    hideUserMenu() {
      this.userMenuActive = false
    }
  },
}
</script>

<style scoped>
.slide-in-enter-active {
  animation: slide-in-right 0.4s linear;
}

.slide-in-leave-active {
  animation: slide-in-right 0.4s linear reverse;
}

@keyframes slide-in-right {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}

.active-pale-link {
  color: #ffffff !important;
}
</style>
