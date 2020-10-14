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
      <div class="container px-5 py-8 mx-auto">
        <!-- filter menu on smaller devices -->
        <div v-show="filterMenuActive" class="fixed inset-0 z-20 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div @click="filterMenuActive = false" class="absolute inset-0 transition-opacity bg-black bg-opacity-50"></div>
              <transition
                enter-class="-translate-x-full"
                enter-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
                enter-to-class="translate-x-0"
                leave-class="translate-x-0"
                leave-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
                leave-to-class="-translate-x-full"
              >
                <section v-show="filterMenuActive" class="absolute inset-y-0 left-0 z-30 flex max-w-full mr-10">
                  <div class="w-screen max-w-xs">
                    <div class="flex flex-col h-full py-6 space-y-6 overflow-y-scroll bg-white shadow-xl">
                      <header class="sm:px-6 px-4">
                        <div class="flex items-start justify-between space-x-3">
                          <h2 class="text-base font-medium leading-6 text-gray-900">Filtrer</h2>
                          <div class="h-7 flex items-center">
                            <button @click="filterMenuActive = false" class="hover:text-gray-800 w-5 h-5 text-gray-600">
                              <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </header>
                      <div class="relative flex-1 px-3">
                        <div class="mb-5" v-if="selectedFilters.length > 0">
                          <h3 class="px-3 text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">Valgte filtre</h3>
                          <div class="mt-2">
                            <BaseButton v-for="(filter, index) in selectedFilters" :key="`${filter}-${index}`" plain class="hover:bg-gray-100 bg-gray-50 w-full px-2 py-2 mb-1 text-sm leading-6 text-gray-500 border border-gray-300 rounded" @click="() => toggleFilter(filter)">
                              <div class="flex items-center">
                                <BaseIcon name="x" solid height="h-4" width="w-4" />
                                <span class="ml-3 text-gray-700">{{ filter }}</span>
                              </div>
                            </BaseButton>
                          </div>
                        </div>
                        <ProductFilterBlock :loaded="loaded" title="Kategorier" :items="availableFilters.categories" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
                        <ProductFilterBlock :loaded="loaded" title="Stil" :items="availableFilters.styles" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
                        <ProductFilterBlock :loaded="loaded" title="Bruksområde" :items="availableFilters.applications" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
                        <ProductFilterBlock :loaded="loaded" title="Materiale" :items="availableFilters.materials" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
                        <ProductFilterBlock :loaded="loaded" title="Farger" :items="availableFilters.colors" :activeFilters="selectedFilters" @toggle-filter="toggleFilter">
                          <template #box="{ item }">
                            <div :style="`background-color: ${item.color_hex}`" class="w-5 h-5 mr-3 border border-gray-300 rounded-full"></div>
                          </template>
                        </ProductFilterBlock>
                      </div>
                    </div>
                  </div>
                </section>
              </transition>
          </div>
        </div>
        
        <!-- TODO: Fix "Back" on smaller screens -->
        <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="lg:px-3"/>
        <div class="flex mt-8">
          <aside class="lg:block hidden w-1/6 mr-4">
            <div class="mb-5" v-if="selectedFilters.length > 0">
              <h3 class="px-3 text-xs font-medium leading-4 tracking-wide text-gray-500 uppercase">Valgte filtre</h3>
              <div class="mt-2">
                <BaseButton v-for="(filter, index) in selectedFilters" :key="`${filter}-${index}`" plain class="hover:bg-gray-100 bg-gray-50 w-full px-2 py-2 mb-1 text-sm leading-6 text-gray-500 border border-gray-300 rounded" @click="() => toggleFilter(filter)">
                  <div class="flex items-center">
                    <BaseIcon name="x" solid height="h-4" width="w-4" />
                    <span class="ml-3 text-gray-700">{{ filter }}</span>
                  </div>
                </BaseButton>
              </div>
            </div>
            <ProductFilterBlock :loaded="loaded" title="Kategorier" :items="availableFilters.categories" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loaded="loaded" title="Stil" :items="availableFilters.styles" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loaded="loaded" title="Bruksområde" :items="availableFilters.applications" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loaded="loaded" title="Materiale" :items="availableFilters.materials" :activeFilters="selectedFilters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loaded="loaded" title="Farger" :items="availableFilters.colors" :activeFilters="selectedFilters" @toggle-filter="toggleFilter">
              <template #box="{ item }">
                <div :style="`background-color: ${item.color_hex}`" class="w-5 h-5 mr-3 border border-gray-300 rounded-full"></div>
              </template>
            </ProductFilterBlock>
          </aside>
          <div class="lg:w-5/6 w-full">
            <section class="lg:px-3">
              <div>
                <div class="lg:hidden w-full mb-2">
                  <BaseButton @click="filterMenuActive = true" light class="lg:hidden flex items-center justify-center w-full mr-3">
                    <BaseIcon name="filter" class="mr-2" fill="text-gray-500" />
                    Filter
                    <span v-if="selectedFilters.length > 0" class="flex items-center justify-center w-5 h-5 ml-2 text-xs text-gray-700 bg-gray-300 rounded-full">{{ countFiltersActive }}</span>
                  </BaseButton>
                </div>
                <form @submit.prevent="searchEndpoint()">
                  <div class="flex items-center w-full">
                    <BaseInput 
                      v-model="search" 
                      icon="search" 
                      placeholder="Søk i hundrevis av varer" 
                      block 
                      label="search" 
                      hiddenLabel
                    />
                    <BaseButton type="submit" class="ml-2">Søk i varer</BaseButton>
                  </div>
                </form>
              </div>
            </section>
            <div v-if="loaded">
              <section v-if="products.length > 0" class="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-1 grid w-full grid-cols-1 gap-6 mt-5">
                <ProductCard v-for="product in filteredProducts" :key="`${product.id}-${product.name}`" :product="product" />
              </section>
              <section v-else class="px-3">
                <BaseNodata errorMessage="Vi fant dessverre ingen ting..." />
              </section>
            </div>
            <div v-else>
              <section class="animate-pulse sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-1 grid w-full grid-cols-1 gap-6 px-3 mt-5">
                <div v-for="i in 12" :key="i" style="height: 408px" class="w-full bg-gray-400 rounded" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import apiService from '@/common/api'
import ProductCard from '@/components/product-card.vue'
import ProductFilterBlock from '@/components/product-filter-block.vue'

export default {
  name: 'Category',
  page() {
    return {
      title: `${this.metaTitle}`,
      meta: [
        {
          name: 'description',
          content: `Products tilhørende ${this.currentCategory} kategorien.`
        }
      ]
    }
  },
  components: {
    ProductCard,
    ProductFilterBlock,
  },
  computed: {
    metaTitle() {
      // make first letter of category slug capital
      return this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1)
    },
    currentCategory() {
      return this.$route.params.categorySlug
    },
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '/' },
        { text: `${this.currentCategory}`, disabled: true },
      ]
    },
    products() {
      return this.fetchedProducts
    },
    countFiltersActive() {
      return this.selectedFilters.length
    },
    filteredProducts() {

      // check each product filter if any values is inside the selectedFilter array
      const productList = this.products.filter(product => 
        this.selectedFilters.every(filter => 
          product.categories.some(category => category.name === filter) ||
          product.styles.some(style => style.name === filter) ||
          product.applications.some(application => application.name === filter) ||
          product.materials.some(material => material.name === filter) ||
          product.colors.some(color => color.name === filter)
        ) 
      )

      // if any filters is selected, return the filtered list
      if (productList.length > 0) {
        return productList
      
      // if not, return all products
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
      fetchedProducts: [],
      selectedFilters: [],
      category: {},
      filterMenuActive: false,
      search: '',
      loaded: false,
    }
  },
  methods: {
    fetchProducts() {
      const category = this.$route.params.categorySlug

      apiService.get(`categories/${category}/products/`)
        .then(products => {
          this.fetchedProducts = products.data
          this.loaded = true
          this.selectFilterFromQuery()
        })
    },
    fetchCategory() {
      const category = this.$route.params.categorySlug

      apiService.get(`categories/${category}/`)
        .then(category => {
          this.category = category.data
        })
    },
    searchEndpoint() {
      const category = this.$route.params.categorySlug

      apiService.get(`categories/${category}/products/?search=${this.search}`)
        .then(products => {
          this.fetchedProducts = products.data
          this.loaded = true
        })
    },
    toggleFilter(filter) {
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1)
      } else {
        this.selectedFilters.push(filter)
      }
    },
    selectFilterFromQuery() {
      let routeQuery = this.$route.query.subcategory

      if (routeQuery) return routeQuery = routeQuery.replace(/-/g, ' ')

      this.availableFilters.categories.filter(category => {

        let name = category.name
        name = name.replace(/,/g, '')
        name = name.replace(/æ/g, 'ae')
        name = name.replace(/ø/g, 'o')
        name = name.replace(/å/g, 'a')
        name = name.toLowerCase()

        if (name.includes(routeQuery)) {
          this.selectedFilters.push(category.name)
        }
      })
    }
  },
  created() {
    this.fetchCategory()
    this.fetchProducts()
  }
}
</script>

<style scoped>
  .container {
    max-width: 1700px;
  }

  .slide-in-enter-active {
    animation: slide-in-left 0.4s linear;
  }

  .slide-in-leave-active {
    animation: slide-in-left 0.4s linear reverse;
  }

  @keyframes slide-in-left {
    from {
      margin-right: 100%;
    }
    to {
      margin-right: 0%;
    }
  }
</style>