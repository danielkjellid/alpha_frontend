<template>
  <nav class="bg-white shadow">
    <div class="container max-w-6xl px-8 mx-auto">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex items-center flex-shrink-0">
            <svg class="w-8 h-8 text-gray-800" viewBox="0 0 308.48 308.48">
              <path stroke-width=".32" d="m0 154.24v-154.24h308.48v86.4h-222.08v23.36h109.63l2.6933 2.7442v83.523l-2.7442 2.6933h-109.58v109.76h-86.4zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" fill="currentColor"/>
            </svg>
          </div>
          <div class="flex ml-6">
            <a href="#" class="hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out">
              Brukere
            </a>
            <a href="#" class="hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out">
              Forespørsler
            </a>
            <a href="#" class="hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out">
              Inventar
            </a>
            <a href="#" class="hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out">
              Markedsføring
            </a>
            <a href="#" class="hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out">
              Administrativt
            </a>
          </div>
        </div>
        <div class="sm:ml-6 flex items-center">
          <button class="hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 p-1 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full" aria-label="Notifications">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button @click="showUserMenu = !showUserMenu" class="focus:outline-none focus:border-gray-300 flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full" id="user-menu" aria-label="User menu" aria-haspopup="true">
                <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div>
            <transition 
              enter-class="transition duration-200 ease-out" 
              enter-active-class="transform scale-95 opacity-0" 
              enter-to-class="transform scale-100 opacity-100"
              leave-class="transition duration-75 ease-in"
              leave-active-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="showUserMenu" class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                <div class="py-1 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out" role="menuitem">Your Profile
                  </a>
                  <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out" role="menuitem">Settings
                  </a>
                  <a href="#" class="hover:bg-gray-100 focus:outline-none focus:bg-gray-100 block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out" role="menuitem">Sign out
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNav',
  data() {
    return {
      showUserMenu: false
    }
  }
}
</script>