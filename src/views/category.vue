<template>
  <div>
    <BaseNavbar />
    <main>
      <!-- main category image -->
      <section>
        <article class="image-full-container relative overflow-hidden">
          <div class="table-cell align-middle">
            <!-- dummy images for the time being -->
            <img
              src="https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg" 
              alt=""
              class="absolute bottom-0 left-0 right-0 w-full h-full"
              :srcset="`https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/efd2f12a48eb069752621b400d983518.jpg 512w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/734a76e4dabe6516991d5fbb76cc44c9.jpg 1024w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/85d0abe28a8db662b56d4dfd4dfe59c3.jpg 1024w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg 1536w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/6f8b4f797cade7a3fc042e251fd82d7c.jpg 2048w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/5fd72d0a6328b5d9f453eaa3216d663b.jpg 2560w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/1766491d3dd2b83b5c7a17f421c414f6.jpg 3072w`"
            >
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
              <div class="text-center">
                <h2 class="text-2xl font-medium text-white">Fliser</h2>
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
                <BaseButton
                  v-for="filter in selectedFilters"
                  :key="filter"
                  plain
                  class="hover:bg-gray-100 w-full px-2 py-2 text-sm leading-6 text-gray-500 rounded"
                  @click="() => toggleFilter(filter)"
                > 
                  <div class="flex items-center">
                    <BaseIcon name="x" solid height="h-4" width="w-4" />
                    <span class="ml-3 text-gray-700">{{ filter }}</span>
                  </div>
                </BaseButton>
              </div>
            </div>
            <ProductFilterBlock title="Kategorier" :items="filters.categories" :activeFilters="selectedFilters" @toggle-filter="toggleFilter"/>
            <ProductFilterBlock title="Stil" :items="filters.styles" :activeFilters="selectedFilters" @toggle-filter="toggleFilter"/>
            <ProductFilterBlock title="Bruksområde" :items="filters.applications" :activeFilters="selectedFilters" @toggle-filter="toggleFilter"/>
            <ProductFilterBlock title="Materiale" :items="filters.materials" :activeFilters="selectedFilters" @toggle-filter="toggleFilter"/>
            <ProductFilterBlock title="Farger" :items="filters.colors" :activeFilters="selectedFilters" @toggle-filter="toggleFilter">
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
              <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
              {{ availableFilters }}
              {{ filters }}
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
      let productList = []
      this.products.filter(product => {
        product.categories.filter(category => {
          if (this.selectedFilters.includes(category.name)) {
            productList.push(product)
            return productList
          }
        })
        product.styles.filter(style => {
          if (this.selectedFilters.includes(style)) {
            productList.push(product)
            return productList
          }
        })
        product.applications.filter(application => {
          if (this.selectedFilters.includes(application)) {
            productList.push(product)
            return productList
          }
        })
        product.materials.filter(material => {
          if (this.selectedFilters.includes(material)) {
            productList.push(product)
            return productList
          }
        })
        product.colors.filter(colors => {
          if (this.selectedFilters.includes(colors)) {
            productList.push(product)
            return productList
          }
        })
      })
      if (productList.length > 0)
        return productList
      else {
        return this.products
      }
    },
    availableFilters() {
      // let filterList = []

      // this.filters.filter(filter => {
      //   // this.filteredProducts.filter(product => {
      //   //   if (product.categories.includes(filter.categories)) {
      //   //     filterList.push(filter)
      //   //     return filterList
      //   //   }
      //   // })
      //   console.log(filter)
      // })
      
      // if (filterList.length > 0) {
      //   return filterList
      // } else {
      //   return this.filters
      // }
      return console.log(typeof this.filters)
    }
  },
  data() {
    return {
      products: [],
      filters: [],
      selectedFilters: [],
    }
  },
  methods: {
    fetchFilters() {
      let category = this.$route.path
      const cleanCategory = category.replace(/\\|\//g,'')
      
      apiService(`products/${cleanCategory}/filters/`)
        .then(filters => {
          this.filters = filters
        })
    },
    fetchProducts() {
      let category = this.$route.path
      const cleanCategory = category.replace(/\\|\//g,'')

      apiService(`products/${cleanCategory}/`)
        .then(products => {
          this.products = products
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