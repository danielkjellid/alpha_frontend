<template>
  <div class="w-full">
    <div>
      <slot name="errors"></slot>
    </div>
    <div v-for="(group, index) in groups" :key="index" class="flex items-start border-b border-gray-300">
      <div class="w-1/3 py-6 pr-5 mr-5">
        <h2 class="text-base font-medium text-gray-900">{{ group.title }}</h2>
        <p class="mt-1 text-sm text-gray-600">{{ group.text }}</p>
      </div>
      <div class="w-2/3 py-6 pl-5">
        <slot :name="group.value"></slot>
      </div>
    </div>
    <div class="flex justify-end py-5">
      <BaseButton light @click="cancelChanges" class="mr-2">Avbryt</BaseButton>
      <BaseButton @click="saveChanges">Lagre endringer</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  methods: {
    saveChanges() {
      this.$emit('save-changes')
    },
    // cancel canges method removes the /edit route from the end of the url and redirects
    cancelChanges() {
      let route = this.$route.fullPath
      let redirect = route.replace('edit/', '')
      
      return this.$router.push(redirect)
    }
  }
}
</script>