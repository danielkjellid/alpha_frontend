<template>
  <div class="px-5 py-5 bg-green-800">
    <div class="flex items-center justify-between">
      <div>
        <svg class="w-8 h-8 text-white" viewBox="0 0 308 308" fill="currentColor">
          <path d="M0 154.24V0h308.48v86.4H86.4v23.36h109.63l2.693 2.744v83.523l-2.744 2.694H86.4v109.76H0zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" />
        </svg>
      </div>
      <div class="flex items-center">
        <router-link to="/" class="mr-3">
          <svg class="hover:text-white w-6 h-6 text-gray-300" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </router-link>
        <router-link to="/" class="mr-3">
          <svg class="hover:text-white w-6 h-6 text-gray-300" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </router-link>
        <router-link to="/">
          <svg class="hover:text-white w-6 h-6 text-gray-300" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
