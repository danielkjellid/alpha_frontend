<template>
  <div class="relative">
      <div class="relative flex flex-none bg-white">
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
                <slot name="title">
                  <h1 class="text-2xl font-semibold text-gray-900">Detail</h1>
                </slot>
              </div>
              <div class="flex items-center">
                <slot name="actions">
                  <BaseButton light>
                    Action
                  </BaseButton>
                </slot>
              </div>
            </div>
            <div class="mt-10">
              <div class="mx-4">
                <Tabs :tabs="tabs" />
              </div>
              <slot>
                <div class="h-96 border-4 border-gray-200 border-dashed rounded-lg"></div>
              </slot>
            </div>
          </main>
        </div>
      </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin-sidebar.vue'
import Tabs from '@/components/tabs.vue'

export default {
  name: 'AdminDetail',
  components: {
    AdminSidebar,
    Tabs,
  },
  props: {
    tabs: {
      type: Array,
      required: true
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