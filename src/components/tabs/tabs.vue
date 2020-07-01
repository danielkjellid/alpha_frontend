<template>
  <div class="border-b-2 border-gray-200">
    <nav class="-mb-px flex">
      <router-link 
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.to"
        exact
        active-class="border-gray-800 text-gray-800 focus:outline-none focus:text-gray-900 focus:border-gray-900"
        class="whitespace-no-wrap mr-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-800 focus:outline-none focus:text-gray-700 focus:border-gray-800"
      >
        {{ tab.text }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    }
  }
}
</script>