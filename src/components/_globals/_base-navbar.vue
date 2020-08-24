<template>
  <nav class="relative">
    <div class="relative z-10 shadow" :class="renderNavbarDark ? 'bg-white' : 'bg-transparent'">
      <div class="sm:py-8 sm:px-8 px-5 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div>
              <svg class="w-8 h-8 text-white" :class="renderNavbarDark ? 'text-gray-800' : 'text-white'" viewBox="0 0 308 308" fill="currentColor">
                <path d="M0 154.24V0h308.48v86.4H86.4v23.36h109.63l2.693 2.744v83.523l-2.744 2.694H86.4v109.76H0zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" />
              </svg>
            </div>
            <div class="lg:block hidden ml-4">
              <BaseButton @click="flyoutMenuActive = !flyoutMenuActive" plain :class="renderNavbarLinkClasses" class="flex items-center">
                Katalog
                <transition
                  enter-class="-translate-y-1 opacity-0"
                  enter-active-class="transition duration-200 ease-out"
                  enter-to-class="translate-y-0 opacity-100"
                  leave-class="translate-y-0 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-to-class="-translate-y-1 opacity-0"
                >
                  <BaseIcon v-if="!flyoutMenuActive" name="chevron-down" solid class="hover:text-gray-600 ml-1 text-gray-500" />
                  <BaseIcon v-else name="chevron-up" solid class="hover:text-gray-600 ml-1 text-gray-500" />
                </transition>
              </BaseButton>
              <router-link to="/kjokken" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Inspirasjon</router-link>
              <router-link to="/tegnetime" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tegnetime</router-link>
              <router-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Om oss</router-link>
              <router-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tilbud</router-link>
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
                <div v-show="userMenuActive" class="absolute right-0 mt-2 origin-top-right bg-white rounded shadow">
                  <div class="w-full px-5 py-5 border-b border-gray-300">
                    <div class="flex items-center">
                      <div class="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full">
                        <BaseIcon name="user" fill="text-gray-500" />
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium leading-6 text-gray-800">Daniel Kjellid</div>
                        <div class="text-xs font-medium leading-5 text-gray-600">daniel@example.com</div>
                      </div>
                    </div>
                  </div>
                  <div class="px-5 py-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <router-link to="#" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Din konto</router-link>
                    <router-link to="#" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Innstillinger</router-link>
                    <router-link to="#" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Logg ut</router-link>
                  </div>
                </div>
              </transition>
            </div>
            <BaseButton to="/" icon plain :light="!renderNavbarDark" class="md:mr-0 flex items-center mr-3">
              <BaseIcon name="cart" height="h-6" width="w-6"/>
               <span class="ml-1 text-sm font-medium" :class="renderNavbarDark ? 'text-gray-600' : 'text-gray-400'">0</span>
            </BaseButton>
            <BaseButton @click="mobileMenuActive = true" icon plain :light="!renderNavbarDark" class="lg:hidden">
              <BaseIcon name="menu" height="h-6" width="w-6"/>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-class="-translate-y-1 opacity-0"
      enter-active-class="transition duration-200 ease-out"
      enter-to-class="translate-y-0 opacity-100"
      leave-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <FlyoutMenu v-show="flyoutMenuActive" :menuItems="menuItems" />
    </transition>
    <transition name="slide-in">
      <MobileMenu v-show="mobileMenuActive" @close-menu="mobileMenuActive = false" :menuItems="menuItems" />
    </transition>
  </nav>
</template>

<script>
import MobileMenu from '@/components/mobile-menu.vue'
import FlyoutMenu from '@/components/flyout-menu.vue'

export default {
  name: 'Home',
  components: {
    MobileMenu,
    FlyoutMenu
  },
  computed: {
    renderNavbarDark() {
      if (this.$route.meta.navbarDark !== undefined) return true
    
      return false
    },
    renderNavbarLinkClasses() {
      if (this.renderNavbarDark) return 'hover:text-gray-600 leading-8 text-gray-900 transition duration-150 ease-in-out'

      return 'hover:text-white leading-8 text-gray-300 transition duration-150 ease-in-out'
    },
    renderNavbarLinkActiveClasses() {
      if (this.renderNavbarDark) return 'text-gray-900'

      return 'active-pale-link'
    }
  },
  data() {
    return {
      mobileMenuActive: false,
      flyoutMenuActive: false,
      userMenuActive: false,
      menuItems: [
        { 
          title: 'Fliser',
          items: [
            { title: 'Alle fliser', href: '#' },
            { title: 'Bad', href: '#' },
            { title: 'Kjøkken', href: '#' },
            { title: 'Stue, gang og oppholdsrom', href: '#' },
            { title: 'Utendørs', href: '#' },
            { title: 'Fliseheller', href: '#' },
            { title: 'Mosaikk', href: '#' },
            { title: 'Spesialflis', href: '#' },
          ] 
        },
        { 
          title: 'Kjøkken',
          items: [
            { title: 'Alle kjøkken', href: '#' },
            { title: 'Nordic One', href: '#' },
            { title: 'Nordic Craft', href: '#' },
            { title: 'Nordic Nature', href: '#' },
            { title: 'Nordic Multifront', href: '#' },
            { title: 'Nordic Inline', href: '#' },
            { title: 'Nordic Modern', href: '#' },
            { title: 'Nordic Silk', href: '#' },
          ] 
        },
        { 
          title: 'Innredning',
          items: [
            { title: 'All innredning', href: '#' },
            { title: 'Servanter', href: '#' },
            { title: 'Servantskap', href: '#' },
            { title: 'Vannklosetter', href: '#' },
            { title: 'Badekar', href: '#' },
            { title: 'Dusj', href: '#' },
            { title: 'Benkeplate', href: '#' },
            { title: 'Speil og speilskap', href: '#' },
          ] 
        },
        { 
          title: 'Belysning',
          items: [
            { title: 'All belysning', href: '#' },
            { title: 'Gulvlamper', href: '#' },
            { title: 'Bordlamper', href: '#' },
            { title: 'Vegglamper', href: '#' },
            { title: 'Taklamper', href: '#' },
            { title: 'Baderomsbelysning', href: '#' },
          ] 
        },
        { 
          title: 'Blandebatterier',
          items: [
            { title: 'Alle blandebatterier', href: '#' },
            { title: 'Bad', href: '#' },
            { title: 'Kjøkken', href: '#' },
          ] 
        },
      ]
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
