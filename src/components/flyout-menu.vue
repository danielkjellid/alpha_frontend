<template>
  <div class="absolute left-0 right-0 transform bg-white shadow-lg">
    <div class="xl:gap-12 grid max-w-6xl grid-cols-5 gap-20 px-8 py-6 mx-auto">
      <div v-for="menuItem in menuItems" :key="menuItem.title">
        <h3 class="text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">
          {{ menuItem.title }}
        </h3>
        <div class="mt-2">
          <router-link 
            v-for="(item, index) in menuItem.items" 
            :key="index" 
            :to="item.href" 
            class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-700"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    }
  },
}
</script>