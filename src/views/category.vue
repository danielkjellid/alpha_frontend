<template>
  <div>
    <BaseNavbar />
    <main>
      <!-- main category image -->
      <section>
        <article 
          v-for="cat in category"
          :key="cat.name"
          class="image-full-container relative overflow-hidden">
          <div class="table-cell align-middle">
            <!-- dummy images for the time being -->
            <img 
              :src="cat.image_1536x660" 
              alt=""
              class="absolute bottom-0 left-0 right-0 w-full h-full"
              :srcset="`${cat.image_512x512} 512w,
                        ${cat.image_1024x1024} 1024w,
                        ${cat.image_1024x480} 1024w,
                        ${cat.image_1536x660} 1536w,
                        ${cat.image_2048x800} 2048w,
                        ${cat.image_2560x940} 2560w,
                        ${cat.image_3072x940} 3072w`"
            >
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
              <div class="text-center">
                <h2 class="text-2xl font-medium text-white">{{ cat.name }}</h2>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton icon light plain>
                <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
              </BaseButton>
            </div>
          </div>
        </article>
      </section>
      <!-- site product content -->
      <div class="container px-5 py-5 mx-auto">
        <!-- TODO: Fix "Back" on smaller screens -->
        <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />
        <div class="flex mt-8">
          <aside class="lg:block hidden w-1/6 mr-4">
            <div class="mb-5" v-if="selectedFilters.length > 0">
              <h3 class="text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">Valgte filtre</h3>
              <div class="mt-2">
                <BaseButton v-for="(filter, index) in selectedFilters" :key="`${filter}-${index}`" plain class="hover:bg-gray-100 bg-gray-50 w-full px-2 py-2 mb-1 text-sm leading-6 text-gray-500 border border-gray-300 rounded" @click="() => toggleFilter(filter)">
                  <div class="flex items-center">
                    <BaseIcon name="x" solid height="h-4" width="w-4" />
                    <span class="ml-3 text-gray-700">{{ filter }}</span>
                  </div>
                </BaseButton>
              </div>
            </div>
            <ProductFilterBlock title="Kategorier" :items="availableFilters.categories" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock title="Stil" :items="availableFilters.styles" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock title="Bruksområde" :items="availableFilters.applications" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock title="Materiale" :items="availableFilters.materials" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock title="Farger" :items="availableFilters.colors" :activeFilters="selectedFilters" @toggle-filter="toggleFilter">
              <template #box="{ item }">
                <div :style="`background-color: ${item.color_hex}`" class="w-5 h-5 mr-3 border border-gray-300 rounded-full"></div>
              </template>
            </ProductFilterBlock>
          </aside>
          <div class="lg:w-5/6 w-full">
            <section class="lg:px-3">
              <div class="flex items-center">
                <BaseButton light class="lg:hidden flex items-center mr-3">
                  <BaseIcon name="filter" class="mr-2" fill="text-gray-500" />
                  Filter
                </BaseButton>
                <BaseInput icon="search" placeholder="Søk i hundrevis av varer" block label="search" hiddenLabel />
              </div>
            </section>
            <section class="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-1 grid w-full grid-cols-1 gap-2 mt-5">
              <ProductCard v-for="product in filteredProducts" :key="`${product.id}-${product.name}`" :product="product" />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service'
import ProductCard from '@/components/product-card.vue'
import ProductFilterBlock from '@/components/product-filter-block.vue'

export default {
  name: 'Category',
  page() {
    return {
      title: `Category`,
      meta: [
        {
          name: 'description',
          content: `Products attached to the category category.`
        }
      ]
    }
  },
  components: {
    ProductCard,
    ProductFilterBlock
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '/' },
        { text: 'Fliser', disabled: true },
      ]
    },
    filteredProducts() {
      const productList = this.products.filter(product => 
        this.selectedFilters.every(filter => 
          product.categories.some(category => category.name === filter) ||
          product.styles.some(style => style.name == filter) ||
          product.applications.some(application => application.name == filter) ||
          product.materials.some(material => material.name == filter) ||
          product.colors.some(color => color.name == filter)
        )
      )

      if (productList.length > 0) {
        return productList
      } else {
        return this.products
      }
    },
    availableFilters() {
      let filters = {
        categories: [],
        styles: [],
        applications: [],
        materials: [],
        colors: []
      }

      // create a temporary array of fields
      let tempArray = {categories: [], styles: [], applications: [], materials: [], colors: []}

      // concat each object in the respected array in the product list 
      this.filteredProducts.map(product => {
        product.categories.map(category => {tempArray.categories.push(category)})
        product.styles.map(style => {tempArray.styles.push(style)})
        product.applications.map(application => {tempArray.applications.push(application)})
        product.materials.map(material => {tempArray.materials.push(material)})
        product.colors.map(color => tempArray.colors.push(color))

      })

      // function to add an instance of an element to the filters object
      let appendFilter = (array, destination) => {
        // map the array arg
        array.map(element => {
          // store the count of each instance
          let count = array.filter(el => el.name === element.name).length

          // create a new version of array where duplicates are removed
          let uniqueStyles = array.reduce((unique, object) => {
            // if the object is unique, push it to own unique array
            if (!unique.some(obj => obj.name === object.name)) {
              unique.push(object)
            }
            // return as an array of unique objects
            return unique
          }, [])

          // find index of element in mapping
          let objectIndex = uniqueStyles.findIndex(object => object.name === element.name)
          // append the count property and value
          uniqueStyles[objectIndex].count = count

          // check if the destinatio is the colors object
          // if so, we want to add a specific field unique to the color objects
          if (destination === 'colors') {
            uniqueStyles[objectIndex].color_hex = element.color_hex
          }

          // set the desination list equal to unique list with added properties
          filters[destination] = uniqueStyles
        })
      }

      // append filters to the filter object
      appendFilter(tempArray.categories, 'categories')
      appendFilter(tempArray.styles, 'styles')
      appendFilter(tempArray.applications, 'applications')
      appendFilter(tempArray.materials, 'materials')
      appendFilter(tempArray.colors, 'colors')

      // return available fitlers
      return filters
    }
  },
  data() {
    return {
      products: [],
      testFilters: [],
      filters: [],
      selectedFilters: [],
      category: {},
    }
  },
  methods: {
    fetchFilters() {
      let category = this.$route.path
      const cleanCategory = category.replace(/\\|\//g, '')

      apiService(`products/${cleanCategory}/filters/`)
        .then(filters => {
          this.filters = filters
        })
    },
    fetchProducts() {
      let category = this.$route.path
      const cleanCategory = category.replace(/\\|\//g, '')

      apiService(`products/${cleanCategory}/`)
        .then(products => {
          this.products = products
        })
    },
    fetchCategory() {
      let category = this.$route.path
      const cleanCategory = category.replace(/\\|\//g, '')

      apiService(`categories/category/${cleanCategory}/`)
        .then(category => {
          this.category = category
        })
    },
    toggleFilter(filter) {
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1)
      } else {
        this.selectedFilters.push(filter)
      }
    },
  },
  created() {
    this.fetchCategory()
    this.fetchProducts()
    this.fetchFilters()
  }
}
</script>

<style scoped>
  .container {
    max-width: 1700px;
  }
</style>