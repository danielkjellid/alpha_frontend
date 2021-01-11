<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <div class="flex flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col flex-1 h-0">
          <div class="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
            <h1 class="text-xl font-semibold text-white">Backend</h1>
          </div>
          <div class="flex flex-col flex-1 overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-800">
              <div class="space-y-1">
                <a href="#" class="group flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">
                  <svg class="group-hover:text-gray-300 w-6 h-6 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Brukere
                </a>
                <a href="#" class="hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md">
                  <svg class="group-hover:text-gray-300 w-6 h-6 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Forespørsler
                </a>
                <a href="#" class="hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md">
                  <svg class="group-hover:text-gray-300 w-6 h-6 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  Inventar
                </a>
                <a href="#" class="hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md">
                  <!-- Heroicon name: archive -->
                  <svg class="group-hover:text-gray-300 w-6 h-6 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  Markedsføring
                </a>
                <a href="#" class="hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md">
                  <!-- Heroicon name: clock -->
                  <svg class="group-hover:text-gray-300 w-6 h-6 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Administrativt
                </a>
              </div>
            </nav>
            <div class="flex flex-shrink-0 p-4 bg-gray-800 border-t border-gray-900">
              <a href="#" class="group flex-shrink-0 block">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                  </div>
                  <div class="ml-3">
                    <p class="group-hover:text-gray-400 text-base font-medium text-white">
                      Tom Cook
                    </p>
                    <p class="group-hover:text-gray-400 text-sm font-medium text-gray-300">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <div class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200">
        <div class="flex justify-between flex-1 px-4">
          <div class="flex flex-1">
            <form class="flex w-full ml-0" action="#" method="GET">
              <label for="search_field" class="sr-only">Search</label>
              <div class="focus-within:text-gray-600 relative w-full text-gray-400">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="search_field" class="focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent" placeholder="Søk" type="search" name="search">
              </div>
            </form>
          </div>
          <div class="lg:ml-6 flex items-center ml-4">
            <slot name="page-action">
            
            </slot>
          </div>
        </div>
      </div>

      <main class="focus:outline-none relative flex-1 overflow-y-auto" tabindex="-1">
        <slot>
          <p>Content 1</p>
        </slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  props: {
    tabs: {
      type: Array,
      required: false
    }
  }
}
</script>