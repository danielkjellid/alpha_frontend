<template>
  <article 
    @mouseenter="showVariants = true" 
    @mouseleave="showVariants = false"
    class="product-card lg:px-3 lg:py-3 relative bg-white"
    :class="{'shadow' : showVariants }"
  >
    <router-link :to="`${product.slug}/`">
      <div class="product-media relative overflow-hidden bg-gray-100">
        <img :src="productImage" :alt="`Image of ${product.name}`">
        <div class="absolute bottom-0 left-0 mb-6">
          <div v-show="product.can_be_purchased_online" class="py-1 pl-2 pr-3 text-sm font-medium text-white bg-gray-900 bg-opacity-75 rounded-r-full">Kan kjøpes på nett</div>
          <!-- TODO: add logic to check if product is part of campagin -->
          <!-- <div class="inline-block py-1 pl-2 pr-3 mt-2 text-sm font-medium text-white bg-indigo-600 rounded-r-full">-20%</div> -->
        </div>
      </div>
      <div class="product-info pt-4 pb-1">
        <div v-if="!showVariants" class="flex items-center justify-between">
          <p class="text-base font-medium text-gray-900">{{ product.name }}</p>
          <p class="text-sm font-medium text-gray-900">kr {{ product.gross_price | formatPrice }} <span class="text-gray-500">per {{ product.unit }}</span></p>
          <!-- TODO: add logic for discounted products -->
          <!-- <p class="text-sm font-medium text-gray-900">
            <span class="text-gray-500"><strike>kr 499,00</strike></span> - old price
            <span class="text-red-600"> kr 399,00 </span> - new price
            <span class="text-gray-500">m2</span> - unit
          </p> -->
        </div>
        <div v-else class="flex items-center" @mouseleave="productImage = product.thumbnail">
          <div
            @mouseover="productImage = product.thumbnail"
            class="w-8 h-8 mr-2 overflow-hidden border-2 border-gray-300 rounded-full"
          >
            <img :src="product.thumbnail" :alt="`Image of ${product.name}`">
          </div>
          <div v-for="(variant, index) in product.variants" :key="`${index}-${variant}`">
            <div 
              v-if="index <= indexBasedOnBreakpont"
              @mouseover="productImage = variant.thumbnail"
              class="w-8 h-8 mr-2 overflow-hidden border-2 border-gray-300 rounded-full"
            >
              <img :src="variant.image" :alt="`Image of ${product.name} variant: ${variant.name}`">
            </div>
          </div>
          <div v-if="amountOfVariants > 0" class="text-sm text-gray-500">
            +{{ amountOfVariants }}
          </div>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
import breakpoints from '@/utils/breakpoints'

export default {
  name: 'ProductCard',
  computed: {
    amountOfVariants() {
      return this.product.variants.length-this.indexBasedOnBreakpont
    },
    indexBasedOnBreakpont() {
      if (this.breakpoints.w <= 375) return 6
      if (this.breakpoints.w <= 640) return 4
      if (this.breakpoints.w <= 768) return 6
      if (this.breakpoints.w <= 1024) return 3
      if (this.breakpoints.w <= 1280) return 3
      if (this.breakpoints.w <= 1440) return 3
      if (this.breakpoints.w <= 1920) return 5

      return 3
    }
  },
  data() {
    return {
      showVariants: false,
      productImage: this.product.thumbnail,
      breakpoints: breakpoints
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
  .product-card {
    width: 100%;
    height: auto;
  }

  .product-media {
    height: auto;
    width: 100%;
  }

  .product-info {
    width: 100%;
  }
</style>