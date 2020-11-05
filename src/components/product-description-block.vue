<template>
  <article>
    <div v-if="loaded" :class="{'flex items-center justify-between' : price}">
      <h2 class="text-lg font-medium text-gray-900" :class="{'text-center' : center}">{{ title }}</h2>
      <h2 v-if="price" class="text-lg font-medium text-gray-900">{{ price.gross_price | formatPrice }} <span class="text-gray-600">per {{ price.unit }}</span></h2>
    </div>
    <div v-else class="animate-pulse flex items-center justify-between">
      <h2 class="text-lg font-medium text-gray-900" :class="{'text-center' : center}">{{ title }}</h2>
      <div v-if="price" class="w-1/5 h-8 bg-gray-400 rounded" />
    </div>
    
    <div class="mt-5 text-sm text-gray-700">
      <div v-if="loaded">
        <p>{{ text }}</p>
      </div>
      <div v-else class="animate-pulse space-y-2">
        <div class="h-4 bg-gray-400 rounded" />
        <div class="w-5/6 h-4 bg-gray-400 rounded" />
        <div class="h-4 bg-gray-400 rounded" />
        <div class="w-4/6 h-4 bg-gray-400 rounded" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Beskrivelse'
    },
    price: {
      type: Object,
      required: false
    },
    loaded: {
      type: Boolean,
      required: true
    },
    text: {
      required: true
    },
    center: {
      type: Boolean,
      required: false
    }
  }
}
</script>