<template>
  <transition
    enter-class="sm:translate-y-0 sm:translate-x-2 translate-y-2 opacity-0"
    enter-active-class="transition duration-300 ease-out transform"
    enter-to-class="sm:translate-x-0 translate-y-0 opacity-100"
    leave-class="opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-to-class="opacity-0"
  >
    <div v-if="display" class="sm:p-6 sm:items-start sm:justify-end fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto">
        <div class="overflow-hidden rounded-lg shadow-xs">
          <div class="p-4">
            <div class="flex" :class="subtitle ? 'items-start' : 'items-center'">
              <div class="flex-shrink-0">
                <svg v-if="success" class="w-6 h-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else class="w-6 h-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium leading-5 text-gray-900">
                  {{ title }}
                </p>
                <p v-if="subtitle" class="mt-1 text-sm leading-5 text-gray-600">
                  {{ subtitle }}
                </p>
              </div>
              <div class="flex flex-shrink-0 ml-4">
                <button @click="closeNotification" class="focus:outline-none focus:text-gray-600 inline-flex text-gray-500 transition duration-150 ease-in-out">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseNotification',
  props: {
    success: {
      type: Boolean,
      default: true
    },
    display: {
      type: [Boolean, String, Array, Object],
      default: false
    },
    title: {
      required: true
    },
    subtitle: {
      required: false
    }
  },
  methods: {
    closeNotification() {
      this.$emit('close-notification')
    },
    closeAfterThreeSeconds() {
      const self = this

      setTimeout(function() {
        self.closeNotification()
      }, 3000)
    }
  },
  mounted() {
    if (this.success) {
      this.closeAfterThreeSeconds()
    }
  },
  updated() {
    if (this.success) {
      this.closeAfterThreeSeconds()
    }
  }
}
</script>