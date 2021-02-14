<template>
  <div class="relative flex flex-none bg-white">
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
          <Tabs :tabs="[{text: 'Oversikt', to: '/backend/users/detail'},{text: 'Forespørsler', to: '/'}, {text: 'Handlekurv', to: '/'}, {text: 'Innlogginger', to: '/'}, {text: 'Rettigheter', to: '/'}]" />
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
import Tabs from '@/components/tabs'
export default {
  name: 'Test',
  components: {
    AdminSidebar,
    Tabs
  }
}
</script>