<template>
  <article>
    <h2 class="text-lg font-medium text-gray-900">Nedlastninger</h2>
    <div v-if="loaded" class="mt-6 border border-gray-300 rounded-md">
      <div 
        v-for="(file, index) in files" 
        :key="`${index}-${file.name}`" 
        class="flex items-center justify-between px-4 py-4"
        :class="{'border-t border-gray-300' : index <= files.length && index != 0}"
      >
        <div class="flex items-center text-sm">
          <BaseIcon name="paper-clip" solid class="mr-2" fill="text-gray-500" />
          {{ file.name }}
        </div>
        <a :href="file.file" target="_blank" rel="noopener noreferrer" plain class="hover:underline text-sm">Last ned</a>
      </div>
    </div>
    <div v-else class="animate-pulse">
      <div class="w-full h-12 mt-6 bg-gray-400 rounded" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProductFilesBlock',
  props: {
    files: {
      type: Array,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    }
  }
}
</script>