<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <svg class="h-8 w-8 text-gray-800" viewBox="0 0 308.48 308.48">
              <path stroke-width=".32" d="m0 154.24v-154.24h308.48v86.4h-222.08v23.36h109.63l2.6933 2.7442v83.523l-2.7442 2.6933h-109.58v109.76h-86.4zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" fill="currentColor"/>
            </svg>
          </div>
          <div class="ml-6 flex">
            <a href="#" class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Brukere
            </a>
            <a href="#" class="ml-8 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Forespørsler
            </a>
            <a href="#" class="ml-8 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Inventar
            </a>
            <a href="#" class="ml-8 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Markedsføring
            </a>
            <a href="#" class="ml-8 inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Administrativt
            </a>
          </div>
        </div>
        <div class="flex sm:ml-6 items-center">
          <button class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out" aria-label="Notifications">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button @click="showUserMenu = !showUserMenu" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div>
            <transition 
              enter-class="transition ease-out duration-200" 
              enter-active-class="transform opacity-0 scale-95" 
              enter-to-class="transform opacity-100 scale-100"
              leave-class="transition ease-in duration-75"
              leave-active-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="showUserMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Your Profile
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Settings
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Sign out
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
  name: 'AdminHeader',
  data() {
    return {
      showUserMenu: false
    }
  }
}
</script>