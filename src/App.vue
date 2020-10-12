<template>
  <div class="relative min-h-screen">
    <router-view/>
    <BaseFooter />
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
export default {
  name: 'App',
  page() {
    return {
      title: 'Flishuset',
      titleTemplate: 'Flishuset - %s'
    }
  },
  data() {
    return {
      showMessage: localStorage.getItem('show_message') ? JSON.parse(localStorage.getItem('show_message')) : true
    }
  },
  methods: {
    hideMessage() {
      this.showMessage = false
      localStorage.setItem('show_message', false)
    }
  }
}
</script>

<style>
   @import url('https://rsms.me/inter/inter.css');
   html { font-family: 'Inter', sans-serif; }

   .image-full-container {
     height: 375px;
     width: 100%;
   }

   .image-half-container {
     height: 375px;
     width: 100%;
   }

   @media (min-width: 640px) {
     .image-full-container {
       height: 300px;
       width: 100%;
     }

     .image-half-container {
       height: 300px;
       width: 100%;
     }
   }

   @media (min-width: 768px) {
     .image-full-container {
       height: 366px;
       width: 100%;
     }

     .image-half-container {
       height: 362px;
       width: 100%;
     }
   }

   @media (min-width:1024px) {
     .image-full-container {
       height: 480px;
       width: 100%;
     }

     .image-half-container {
       height: 480px;
       width: 100%;
     }
   }

   @media (min-width: 1280px) {
     .image-full-container {
       height: 660px;
       width: 100%;
     }

     .image-half-container {
       height: 660px;
       width: 100%;
     }
   }

   @media (min-width: 1536px) {
     .image-full-container {
       height: 800px;
       width: 100%;
     }

     .image-half-container {
       height: 800px;
       width: 100%;
     }
   }

   @media (min-width: 2048px) {
     .image-full-container {
       height: 800px;
       width: 100%;
     }

     .image-half-container {
       height: 800px;
       width: 100%;
     }
   }

   @media (min-width: 3072px) {
     .image-full-container {
       height: 940px;
       width: 100%;
     }

     .image-half-container {
       height: 940px;
       width: 100%;
     }
   }
</style>