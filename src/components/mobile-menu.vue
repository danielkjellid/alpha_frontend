<template>
  <div class="absolute inset-0 z-50">
    <div class="relative min-h-screen bg-white">
      <div class="h-full px-5 pt-5 overflow-y-auto" :class="collapsedUserMenuActive ? 'pb-56' : 'pb-24'">
        <div class="flex items-center justify-between">
          <div></div>
          <div class="text-center">
            <p class="text-base leading-6 text-gray-900">Meny</p>
          </div>
          <button @click="closeMobileMenu" class="hover:text-gray-800 w-5 h-5 text-gray-600">
            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="mt-5 overflow-y-auto">
          <div>
            <!-- product dropdown listing all categories and subcategories -->
            <BaseButton 
              @click="catalogMenuActive = !catalogMenuActive" 
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
            <transition
              enter-class="-translate-y-1 opacity-0"
              enter-active-class="transition duration-200 ease-out"
              enter-to-class="translate-y-0 opacity-100"
              leave-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <!-- display dropdown menu accoring to state -->
              <div v-show="catalogMenuActive">
                <!-- loop through prop and set title and subcontent accordingly -->
                <div class="mt-6" v-for="menuItem in menuItems" :key="menuItem.id">
                  <h3 class="text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">
                    {{ menuItem.name }}
                  </h3>
                  <div>
                    <router-link 
                      v-for="child in menuItem.children" 
                      :key="child.id" :to="`/kategori/${menuItem.slug}/?subcategory=${child.slug}`" 
                      class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-700"
                    >
                      {{ child.name }}
                    </router-link>
                  </div>
                </div>
              </div>
            </transition>
          </div> 
          <router-link to="/kjokken/" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="mt-4">Kjøkken</router-link>  
          <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" plain :class="renderNavbarLinkClasses" class="mt-4">Tegnetime</a>
          <!-- <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Inspirasjon</router-link>
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Tegnetime</router-link>
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Om oss</router-link>
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Tilbud</router-link> -->

        </nav>
      </div>
      <!-- footer that displays usermenu -->
      <!-- if the user is not authenticated, they will be redirected to login upon click -->
      <div v-if="userIsAuthenticated" @click="collapsedUserMenuActive = !collapsedUserMenuActive" class="absolute bottom-0 left-0 right-0 px-5 py-5 bg-white border-t border-gray-200">
        <BaseButton plain class="hover:text-gray-600 flex items-center justify-between w-full text-left text-gray-500">
          <div class="flex items-center">
            <div class="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full">
              <BaseIcon name="user" fill="text-gray-500" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-6 text-gray-800">Daniel Kjellid</div>
              <div class="text-sm font-medium leading-5 text-gray-600">daniel@example.com</div>
            </div>
          </div>
          <BaseIcon name="chevron-down" solid />
        </BaseButton>
        <div v-show="collapsedUserMenuActive" class="mt-5">
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Din konto</router-link>
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Innstillinger</router-link>
          <router-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Logg ut</router-link>
        </div>
      </div>
      <div v-else class="absolute bottom-0 left-0 right-0 px-5 py-5 bg-white border-t border-gray-200">
        <BaseButton @click="redirectToLogin" plain class="hover:text-gray-600 flex items-center text-base leading-7 text-gray-900">
          <BaseIcon name="user" class="mr-2" />
          Logg inn
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      required: true,
    }
  },
  computed: {
    // property that holds if the user is authenticated
    userIsAuthenticated() {
      return this.$store.getters['auth/getIsAuthenticated']
    },
    // render classes of links according to the route meta
    renderNavbarLinkClasses() {
      return 'hover:text-gray-600 block leading-8 text-gray-800 transition duration-150 ease-in-out'
    },
    // set active links according to route meta
    renderNavbarLinkActiveClasses() {
      return 'text-gray-900'
    },
    renderChevronPath() {
      if (this.catalogMenuActive) return 'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'

      return 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
    },
  },
  data() {
    return {
      catalogMenuActive: false,
      collapsedUserMenuActive: false,
    }
  },
  methods: {
    // emit to parent click event and close dropdown
    closeMobileMenu() {
      this.catalogMenuActive = false
      this.$emit('close-menu')
    },
    // redirect user to login page
    redirectToLogin() {
      this.$router.push({name: 'LogIn'})
    }
  }
}
</script>