<template>
  <div class="border-b border-gray-200">
    <nav class="flex -mb-px">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.to"
        exact
        exact-active-class="focus:border-gray-700 text-gray-900 border-gray-900"
        class="hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:text-gray-700 focus:border-gray-200 px-3 py-4 ml-2 text-sm font-medium leading-5 text-gray-600 whitespace-nowrap border-b-2 border-transparent"
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
    // array of tabs text and path of which they should lead to
    tabs: {
      type: Array,
      required: true,
    }
  }
}
</script>