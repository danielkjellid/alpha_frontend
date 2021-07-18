<template>
  <div class="absolute left-0 right-0 z-10 transform bg-white shadow-lg">
    <div class="xl:gap-12 grid max-w-6xl grid-cols-4 gap-20 px-8 py-6 mx-auto">
      <!-- loop through prop and set title and subcontent accordingly in a grid format -->
      <div v-for="menuItem in menuItems" :key="menuItem.id">
        <h3 class="text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">
          {{ menuItem.name }}
        </h3>
        <div class="mt-2">
          <nuxt-link
            v-for="child in menuItem.children"
            :key="child.id"
            :to="`/kategori/${menuItem.slug}/?subcategory=${child.slug}`"
            class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-700"
            @click.native="closeFlyoutMenu"
          >
            {{ child.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    menuItems: {
      required: true,
    }
  },
  setup(props, { emit }) {
    const closeFlyoutMenu = (): void => {
      emit('close-menu')
    }

    return {
      closeFlyoutMenu
    }
  }
})
</script>
