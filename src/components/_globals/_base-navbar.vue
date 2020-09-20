<template>
  <header :class="!renderNavbarTransparent ? 'relative' : 'absolute left-0 right-0'" v-click-outside="hideFlyoutMenu">
    <!-- color of navbar content is rended according to route meta -->
    <!-- this is because we want to render a transparent bar and white text over pages where there is an image on top -->
    <div class="relative z-10" :class="!renderNavbarTransparent ? 'bg-white shadow' : ( flyoutMenuActive ? 'bg-white shadow' : 'bg-transparent')">
      <div class="sm:py-8 sm:px-8 px-5 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div>
              <svg class="w-8 h-8 text-white" :class="!renderNavbarTransparent ? 'text-gray-800' : ( flyoutMenuActive ? 'text-gray-800' : 'text-white')" viewBox="0 0 308 308" fill="currentColor">
                <path d="M0 154.24V0h308.48v86.4H86.4v23.36h109.63l2.693 2.744v83.523l-2.744 2.694H86.4v109.76H0zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" />
              </svg>
            </div>
            <!-- navigation from lg breakpoint and above -->
            <nav class="lg:block hidden ml-4">
              <!-- button to toggle the flyout meunu -->
              <BaseButton 
                @click="flyoutMenuActive = !flyoutMenuActive" 
                plain 
                :class="renderNavbarLinkClasses" 
                class="flex items-center"
              >
                Katalog
                <transition
                  enter-class="-translate-y-1 opacity-0"
                  enter-active-class="transition duration-200 ease-out"
                  enter-to-class="translate-y-0 opacity-100"
                  leave-class="translate-y-0 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-to-class="-translate-y-1 opacity-0"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 mt-px ml-1" :class="{'text-gray-500 hover:fill-current' : !renderNavbarTransparent}">
                    <path fill-rule="evenodd" :d="renderChevronPath" clip-rule="evenodd"></path>
                  </svg>
                </transition>
              </BaseButton>
              <router-link to="/kjokken" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Inspirasjon</router-link>
              <router-link to="/tegnetime" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tegnetime</router-link>
              <router-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Om oss</router-link>
              <router-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tilbud</router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <!-- user menu, if not authenticated the button will redirect you to the login page -->
            <div v-click-outside="hideUserMenu" class="relative mr-3">
              <div class="flex items-center">
                <BaseButton aria-label="Open user menu" @click="openUserMenuOrRedirect" icon plain :light="renderNavbarIconLight">
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
                <div v-show="userMenuActive" class="absolute right-0 w-56 min-w-full mt-2 origin-top-right bg-white rounded shadow">
                  <div class="w-full px-5 py-5 border-b border-gray-300">
                    <div class="flex items-center">
                      <div class="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full">
                        <BaseIcon name="user" fill="text-gray-500" />
                      </div>
                      <div v-if="user" class="ml-3">
                        <div class="text-sm font-medium leading-6 text-gray-800">{{ user.full_name }}</div>
                        <div class="text-xs font-medium leading-5 text-gray-600">{{ user.email }}</div>
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
            <!-- link and icon to cart -->
            <BaseButton to="/" icon plain :light="renderNavbarIconLight" class="lg:mr-0 flex items-center mr-3">
              <BaseIcon name="shopping-bag" height="h-6" width="w-6"/>
               <span class="ml-1 text-sm font-medium" :class="!renderNavbarTransparent ? 'text-gray-600' : 'text-gray-400'">0</span>
            </BaseButton>
            <!-- menu button for md screens and bellow -->
            <BaseButton @click="mobileMenuActive = true" icon plain :light="renderNavbarIconLight" class="lg:hidden">
              <BaseIcon name="menu" height="h-6" width="w-6"/>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <!-- flyoutmenu component -->
    <transition
      enter-class="-translate-y-1 opacity-0"
      enter-active-class="transition duration-200 ease-out"
      enter-to-class="translate-y-0 opacity-100"
      leave-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-1 opacity-0"
    > 
      <!-- closing menu does not work -->
      <FlyoutMenu v-show="flyoutMenuActive" @close-menu="flyoutMenuActive = false" :menuItems="menuItems" />
    </transition>
    <!-- mobile menu component -->
    <transition name="slide-in">
      <MobileMenu v-show="mobileMenuActive" @close-menu="mobileMenuActive = false" :menuItems="menuItems" />
    </transition>
  </header>
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
    // render the navbar background and color of content accordingly based on route meta
    renderNavbarTransparent() {
      if (this.$route.meta.navbarTransparent === undefined || this.$route.meta.navbarTransparent === false) return false

      return true
    },
    // render classes of links according to the route meta
    renderNavbarLinkClasses() {
      if (!this.renderNavbarTransparent || this.flyoutMenuActive) return 'hover:text-gray-600 leading-8 text-gray-900 transition duration-150 ease-in-out'

      return 'hover:text-white leading-8 text-gray-300 transition duration-150 ease-in-out'
    },
    // set active links according to route meta
    renderNavbarLinkActiveClasses() {
      if (!this.renderNavbarTransparent) return 'text-gray-900'

      return 'active-pale-link'
    },
    renderNavbarIconLight() {
      if (!this.renderNavbarTransparent) return false
      if (this.flyoutMenuActive) return false

      return true
    },
    renderChevronPath() {
      if (this.flyoutMenuActive) return 'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'

      return 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
    },
    // set the menu items in the catalog dropdown
    // fetched from the API
    menuItems() {
      return this.$store.getters['inventory/getNavbarCategories']
    },
    // get current user logged into application
    user() {
      return this.$store.getters['users/getCurrentUser']
    },
    // property that holds if the user is authenticated
    // used to show sub user menu or redirect user to login page
    userIsAuthenticated() {
      return this.$store.getters['users/getIsAuthenticated']
    },
  },
  data() {
    return {
      mobileMenuActive: false,
      flyoutMenuActive: false,
      userMenuActive: false,
    }
  },
  methods: {
    hideFlyoutMenu() {
      if (this.flyoutMenuActive) this.flyoutMenuActive = false
    },
    hideUserMenu() {
      this.userMenuActive = false
    },
    // check if the user is autheticated and open the menu or redirect to login accordingly
    openUserMenuOrRedirect() {
      const currentUser = this.$store.getters['users/getIsAuthenticated']

      if (currentUser) {
        this.flyoutMenuActive = false
        this.userMenuActive = !this.userMenuActive
      } else {
        window.location.href = '/bruker/logg-inn/'
      }
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
