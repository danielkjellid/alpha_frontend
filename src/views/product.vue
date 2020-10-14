<template>
  <div>
    <BaseNavbar />
    <main>

      <!-- image header and info box -->
      <section>
        <article class="image-full-container relative overflow-hidden">
          <div class="relative">
            <transition-group
              enter-class="translate-x-full"
              enter-active-class="transition-all duration-500 ease-linear transform"
              enter-to-class="translate-x-none"
              leave-class="translate-x-none"
              leave-active-class="transition-all duration-500 ease-linear transform"
              leave-to-class="-translate-x-full"
              tag="div"
              class="image-full-container relative"
            >
              <img
                v-for="(image, index) in product.images" :key="`image-${index}`" v-show="showingIndex === index"
                :src="image.image_1536x660"
                alt=""
                class="absolute bottom-0"
                :srcset="`${image.image_512x512} 512w,
                          ${image.image_1024x1024} 1024w,
                          ${image.image_1024x480} 1024w,
                          ${image.image_1536x660} 1536w,
                          ${image.image_2048x800} 2048w,
                          ${image.image_2560x940} 2560w,
                          ${image.image_3072x940} 3072w`"
              >
            </transition-group>
          </div>          
          <div class="table-cell align-middle">
            <div class="absolute inset-0 max-w-screen-xl mx-auto">
              <div class="xl:flex reset-margin-2xl items-center justify-end hidden h-full mr-12">

                <!-- info box on larger devices -->
                <div class="info-box bg-white rounded-md">
                  <div class="px-5 py-5">
                    <div>
                      <div v-if="loaded">
                        <h1 class="text-xl font-medium text-gray-900">{{ product.name }}</h1>
                        <p class="mt-5 text-sm text-gray-700">{{ product.short_description }}</p>
                      </div>
                      <div v-else class="animate-pulse space-y-2">
                        <div class="w-1/3 h-8 bg-gray-400 rounded" />
                        <div class="h-4 bg-gray-400 rounded" />
                        <div class="h-4 bg-gray-400 rounded" />
                        <div class="w-5/6 h-4 bg-gray-400 rounded" />
                      </div>
                    </div>
                    <div v-if="loaded" class="mt-5">
                      <h2 class="text-lg font-medium text-gray-900">{{ product.gross_price | formatPrice }} <span class="text-gray-600">per {{ product.unit }}</span></h2>
                    </div>
                    <div v-else class="animate-pulse mt-5">
                      <div class="w-2/3 h-8 bg-gray-400 rounded" />
                    </div>
                    <div class="mt-5">
                      <h2 class="text-sm font-medium text-gray-900">Varianter</h2>
                      <div v-if="loaded" class="grid grid-cols-8 gap-3 mt-3">
                        <button v-for="variant in product.variants" :key="variant.id" @click="selectVariant(variant.id)">
                          <div class="relative">
                            <img class="w-8 h-8 border-2 border-gray-300 rounded-full" :src="variant.image" />
                            <div v-if="order.selectedVariant === variant.id" class="absolute inset-0 flex items-center justify-center">
                              <BaseIcon solid name="check" fill="text-white" />
                            </div>
                          </div>
                        </button>
                      </div>
                      <div v-else class="animate-pulse flex items-center mt-3 space-x-3">
                        <div v-for="i in 5" :key="i" class="w-8 h-8 bg-gray-400 rounded-full" />
                      </div>
                    </div>
                    <div class="mt-5">
                      <h2 class="text-sm font-medium text-gray-900">Størrelser</h2>
                      <div v-if="loaded" class="gap-y-3 grid grid-cols-3 gap-6 mt-3">
                        <BaseButton 
                          v-for="size in product.sizes" 
                          :key="size.id" 
                          @click="selectSize(size.id)" 
                          plain 
                          class="hover:underline text-sm"
                        >
                          <BaseIcon v-if="order.selectedSize === size.id" solid name="check" height="h-4" width="w-4" class="mr-1" />
                          {{ size.name }}
                        </BaseButton>
                        <BaseButton v-if="product.available_in_special_sizes" @click="selectSize('Spesialstørrelse')" plain class="hover:underline text-sm">Spesialstørrelser*</BaseButton>
                      </div>
                      <div v-else class="animate-pulse gap-y-3 grid grid-cols-3 gap-6 mt-3">
                        <div v-for="i in 5" :key="i" class="h-4 bg-gray-400 rounded" />
                      </div>
                    </div>
                    <!-- <div class="mt-6" v-if="!product.can_be_purchased_online">
                      <div class="flex items-center justify-between">
                        <div class="w-full">
                          <BaseButton class="flex justify-center w-full">Legg til i handlekurv</BaseButton>
                        </div>
                        <div class="flex items-center justify-end flex-shrink-0 ml-3">
                          <BaseButton @click="decreseQuantity" plain class="mr-3">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                            </svg>
                          </BaseButton>
                          <span class="text-base font-medium text-gray-900">{{ this.order.amount }} <span class="font-medium text-gray-600">{{ this.product.unit }}</span></span>
                          <BaseButton @click="increaseQuantity" plain class="ml-3">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </BaseButton>
                        </div>
                      </div>
                    </div>
                    <div class="mt-6" v-else>
                      <BaseButton light class="flex justify-center w-full">Ta kontakt med butikk</BaseButton>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <ImageCarouselControls :images="product.images" :showingIndex="showingIndex" @next="next" @previous="previous" />
            </div>
          </div>
        </article>
      </section>

      <!-- main site content -->
      <div class="sm:px-16 sm:py-8 xl:px-0 max-w-2xl px-5 py-6 mx-auto">
        <section class="mt-12">

          <!-- main product info -->
          <article>
            <div v-if="loaded" class="flex items-center justify-between">
              <h2 v-if="loaded" class="text-lg font-medium text-gray-900">{{ product.name }}</h2>
              <h2 class="text-lg font-medium text-gray-900">{{ product.gross_price | formatPrice }} <span class="text-gray-600">per {{ product.unit }}</span></h2>
            </div>

            <!-- sceleton loading placeholder for name and price -->
            <div v-else class="animate-pulse flex items-center justify-between">
              <div class="w-1/5 h-8 bg-gray-400 rounded" />
              <div class="w-1/5 h-8 bg-gray-400 rounded" />
            </div>

            <div v-if="loaded" class="mt-5">
              <p class="text-sm text-gray-700">
                {{ product.short_description }}
              </p>
            </div>

            <!-- sceleton loadin placeholder for short description -->
            <div v-else class="animate-pulse mt-5 space-y-2">
              <div class="h-4 bg-gray-400 rounded" />
              <div class="w-5/6 h-4 bg-gray-400 rounded" />
            </div>
          </article>

          <!-- description -->
          <article class="mt-12">
            <h2 class="text-lg font-medium text-gray-900">Beskrivelse</h2>
            <div class="mt-6 text-sm text-gray-700">
              <div v-if="loaded">
                <p>{{ product.description }}</p>
              </div>

              <!-- sceleton loading placeholder for description -->
              <div v-else class="animate-pulse space-y-2">
                <div class="h-4 bg-gray-400 rounded" />
                <div class="w-5/6 h-4 bg-gray-400 rounded" />
                <div class="h-4 bg-gray-400 rounded" />
                <div class="w-4/6 h-4 bg-gray-400 rounded" />
                <div class="h-4 bg-gray-400 rounded" />
                <div class="w-5/6 h-4 bg-gray-400 rounded" />
                <div class="h-4 bg-gray-400 rounded" />
              </div>
            </div>
          </article>
          <div class="mt-12">

            <!-- Variants -->
            <article class="xl:mt-0 mt-12">
              <h2 class="text-lg font-medium text-gray-900">Varianter</h2>
              <div v-if="loaded" class="sm:grid-cols-5 sm:gap-6 grid grid-cols-3 gap-8 mt-6">
                <button v-for="variant in product.variants" :key="variant.id" @click="selectVariant(variant.id)" class="mx-auto text-center">
                  <div class="relative">
                    <img class="w-20 h-20 border-2 border-gray-300 rounded-full" :src="variant.image" />
                    <div v-if="order.selectedVariant === variant.id" class="absolute inset-0 flex items-center justify-center">
                      <BaseIcon solid name="check" fill="text-white" height="h-8" width="w-8" />
                    </div>
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
                </button>
              </div>

              <!-- sceleton loaded placeholder for variants -->
              <div v-else class="sm:grid-cols-5 sm:gap-6 animate-pulse grid grid-cols-3 gap-8 mt-6">
                <div v-for="i in 5" :key="i"><div class="w-20 h-20 mx-auto bg-gray-400 rounded-full"></div><h3 class="w-2/4 h-4 mx-auto mt-3 bg-gray-400 rounded"></h3></div>
              </div>
            </article>

            <!-- sizes -->
            <article class="xl:mt-16 mt-12">
              <h2 class="text-lg font-medium text-gray-900">Størrelser <span class="text-gray-600">oppgitt i cm</span></h2>
              <div class="mt-6">
                <!-- buttons to select sizes -->
                <div v-if="loaded" class="gap-y-6 sm:grid-cols-4 sm:gap-8 grid grid-cols-3 gap-10">
                  <BaseButton 
                    v-for="size in product.sizes" 
                    :key="size.id" 
                    @click="selectSize(size.id)" 
                    plain 
                    class="hover:underline text-sm"
                  >
                    <BaseIcon v-if="order.selectedSize === size.id" solid name="check" height="h-4" width="w-4" class="mr-1" />
                    {{ size.name }}
                  </BaseButton>
                  <BaseButton v-if="product.available_in_special_sizes" @click="selectSize('Spesialstørrelse')" plain class="hover:underline text-sm">Spesialstørrelser*</BaseButton>
                </div>

                <!-- sceleton loaded placeholder for sizes -->
                <div v-else class="gap-y-6 sm:grid-cols-4 sm:gap-8 grid grid-cols-3 gap-10">
                  <div v-for="i in 4" :key="i" class="w-full h-4 bg-gray-400 rounded"></div>
                </div>

                <!-- text to tell users to contact for more info regarding sizes -->
                <p v-if="product.available_in_special_sizes" class="mt-6 text-xs text-gray-700">* Produktet finnes i størrelser utover det som er standard, eller kan tilpasses dine behov. Ta kontakt med oss for mer informasjon!</p>
              </div>
            </article>

            <!-- specifications -->
            <article class="mt-12">
              <h2 class="text-lg font-medium text-gray-900">Spesifikasjoner</h2>
              <table v-if="loaded" class="lg:w-3/4 w-64 mt-6">
                <tr class="mt-6 sr-only">
                  <th>Spesifikasjon</th>
                  <th>Verdi</th>
                </tr>
                <ProductSpecRow title="Farge" :fields="product.colors" />
                <ProductSpecRow title="Stil" :fields="product.styles" />
                <ProductSpecRow title="Bruksområde" :fields="product.applications" />
                <ProductSpecRow title="Materiale" :fields="product.materials" />
                <tr>
                  <td class="text-sm text-gray-700">Vannoppsug</td>
                  <td class="text-sm text-gray-900">&lt;{{ product.absorption | formatPrice }}%</td>
                </tr>
                <tr>
                  <td class="text-sm text-gray-700">Opprinnelse</td>
                  <td class="text-sm text-gray-900">{{ product.origin_country }}</td>
                </tr>
              </table>

              <!-- sceleton loaded for specifcations -->
              <table v-else class="lg:w-3/4 animate-pulse w-64 mt-6">
                <tr v-for="i in 6" :key="i">
                  <td class="text-sm text-gray-700"><div class="w-11/12 h-4 bg-gray-400 rounded"></div></td>
                  <td class="text-sm text-gray-700"><div class="w-11/12 h-4 bg-gray-400 rounded"></div></td>
                </tr>
              </table>
            </article>
            
            <!-- downloads -->
            <article v-if="product.files" class="mt-12">
              <h2 class="text-lg font-medium text-gray-900">Nedlastninger</h2>
              <div v-if="loaded" class="mt-6 border border-gray-300 rounded-md">
                <div 
                  v-for="(file, index) in product.files" 
                  :key="`${index}-${file.name}`" 
                  class="flex items-center justify-between px-4 py-4"
                  :class="{'border-t border-gray-300' : index <= product.files.length && index != 0}"
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
          </div>
        </section>
      </div>

      <!-- menu for adding proucts on smaller devices -->
      <!-- <div class="xl:hidden bg-gray-50 sticky bottom-0 left-0 right-0 border-t border-gray-300">
        <div class="sm:px-16 sm:py-8 max-w-2xl px-5 py-6 mx-auto">
          <div class="flex items-center justify-between">
            <div class="w-full">
              <BaseButton class="flex justify-center w-full">Legg til i handlekurv</BaseButton>
            </div>
            <div class="flex items-center justify-end flex-shrink-0 ml-3">
              <BaseButton @click="decreseQuantity" plain class="mr-3">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
              </BaseButton>
              <span class="text-base font-medium text-gray-900">{{ this.order.amount }} <span class="font-medium text-gray-600">{{ this.product.unit }}</span></span>
              <BaseButton @click="increaseQuantity" plain class="ml-3">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>
      </div> -->
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import apiService from '@/common/api'
import ProductSpecRow from '@/components/product-spec-row.vue'
import ImageCarouselControls from '@/components/image-carousel-controls.vue'

export default {
  name: 'Product',
  page() {
    return {
      title: `${this.product.name}`,
      meta: [
        {
          name: 'description',
          content: `Detaljside av produktet ${this.product.name}`
        }
      ]
    }
  },
  components: {
    ProductSpecRow,
    ImageCarouselControls
  },
  data() {
    return {
      loaded: false,
      product: {
        images: [],
      },
      order: {
        selectedVariant: null,
        selectedSize: null,
        amount: 1
      },
      showingIndex: 0
    }
  },
  methods: {
    next() {

      // show the next image if the current index is within the array
      if (this.showingIndex < this.product.images.length-1) {
        this.showingIndex += 1

      // if not, reset the count
      } else {
        this.showingIndex = 0
      }
    },
    previous() {
      // if the first image is displayed, set the index to the last
      // this is to prevent a negative index
      if (this.showingIndex === 0) {
        this.showingIndex = this.product.images.length-1
      
      // if not, show the previous image
      } else {
        this.showingIndex -=1
      }
    },
    increaseQuantity() {
      this.order.amount++
    },
    decreseQuantity() {
      // if the order amount is above 1, decrese amount
      if (this.order.amount > 1) return this.order.amount--
      // if not, set the amount to 1 to prevent a negative amount
      else return this.order.amount === 1
    },
    selectVariant(variant) {
      this.order.selectedVariant = variant
    },
    selectSize(size) {
      this.order.selectedSize = size
    },
    fetchProduct() {
      const category = this.$route.params.categorySlug
      const slug = this.$route.params.productSlug

      // get products attached to category
      apiService.get(`categories/${category}/products/${slug}/`)
      .then(product => {
        this.product = product.data

        // when products are loaded, set loaded to true
        this.loaded = true
      })
    }
  },
  created() {
    this.fetchProduct()
  }
}
</script>

<style scoped>
  .info-box {
    width: 370px;
  }
  @media (min-width: 1340px) {
    .reset-margin-2xl {
      margin: 0;
    }
  }
</style>