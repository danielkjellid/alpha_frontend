<template>
  <div class="relative flex bg-white">
    <BaseNotification 
      :display="errorMessage" 
      :success="false" 
      title="Oida! Noe gikk galt" 
      @close-notification="resetErrorMessage"
    />
    <BaseNotification 
      :display="notification" 
      :success="true" 
      :title="notification" 
      @close-notification="resetNotification"
    />
    <AdminSidebar />
    <div class="max-w-screen-2xl flex flex-col flex-1 w-0 px-12 py-8 mx-auto">
      <main class="focus:outline-none relative flex-1" tabindex="0">
        <div class="flex items-center justify-between px-4">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
            </svg>
            <h1 class="text-2xl font-semibold text-gray-900">{{title}}</h1>
          </div>
          <div class="flex items-center">
            <slot name="action">

            </slot>
          </div>
        </div>
        <div class="mt-10">
          <slot>
            <div class="h-96 border-4 border-gray-200 border-dashed rounded-lg"></div>
          </slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin-sidebar.vue'
export default {
  name: 'Test',
  components: {
    AdminSidebar,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Overview'
    },
    icon: {
      type: String,
      default: 'M4 6h16M4 12h16M4 18h16'
    }
  },
  computed: {
    errorMessage() {
      return this.$store.getters['common/getErrorNotification']
    },
    notification() {
      return this.$store.getters['common/getNotification']
    },
  },
  methods: {
    resetErrorMessage() {
      if (this.errorMessage) {
        this.$store.dispatch('common/resetErrorNotification')
      }
    },
    resetNotification() {
      if (this.notification) {
        this.$store.dispatch('common/resetNotification')
      }
    }
  }
}
</script>