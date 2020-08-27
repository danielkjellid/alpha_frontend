<template>
  <div class="min-h-screen bg-gray-500">
    <BaseNavbar />
    <router-link to="/2">Home 2</router-link>
    <p>{{ breakpoints.is }}</p>
    <div class="max-w-screen-xl mx-auto">
      
      <div class="sm:grid-cols-2 grid grid-cols-1 gap-0">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="relative mb-4 bg-gray-800"
          :class="category.width === 'full' ? 'sm:col-span-2 category-full-container' : 'sm:col-span-1 category-half-container'"
          :style="`background-image: url('${renderImage(category)}')`"
        >
          <div class="flex items-center justify-center h-full">
            <h2 class="text-xl text-white">{{ category.name }}</h2>
          </div>
          <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
            <BaseButton outlined :to="`/kategorier/${category.slug}/`">
              {{ category.name }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service'
import breakpoints from '@/utils/breakpoints'

export default {
  name: 'Home',
  data() {
    return {
      categories: null,
      breakpoints
    }
  },
  methods: {
    fetchCategories() {
      apiService(`categories/`)
      .then(categories => {
        this.categories = categories
      })
    },
    renderImage(category) {
      return category[`image_${this.breakpoints.is}`]
    }
  },
  mounted() {
    this.fetchCategories()
  }
}
</script>

<style scoped>
  .category-full-container {
    height: 375px;
    width: 375px;
  }
  
  @media (min-width: 640px) {
    .category-full-container {
      height: 300px;
      width: 640px;
    }

    .category-half-container {
      height: 300px;
      width: 320px;
    }
  }

  @media (min-width: 768px) {
    .category-full-container {
      height: 366px;
      width: 768px;
    }

    .category-half-container {
      height: 362px;
      width: 384px;
    }
  }

  @media (min-width:1024px) {
    .category-full-container {
      height: 480px;
      width: 1024px;
    }

    .category-half-container {
      height: 480px;
      width: 512px;
    }
  }

  @media (min-width: 1280px) {
    .category-full-container {
      height: 600px;
      width: 1280px;
    }

    .category-half-container {
      height: 600px;
      width: 640px;
    }
  }
</style>