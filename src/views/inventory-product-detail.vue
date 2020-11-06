<template>
  <div>
    <BaseNavbar />
    <main>
      <ImageCarousel :images="product.images">
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
                  <h2 class="text-lg font-medium text-gray-900">kr {{ product.gross_price | formatPrice }} <span class="text-gray-600">per {{ product.unit }}</span></h2>
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
      </ImageCarousel>
      <!-- main site content -->
      <div class="sm:px-16 sm:py-8 xl:px-0 max-w-2xl px-5 py-6 mx-auto">
        <section class="mt-12">
          <div>
            <ProductDescriptionBlock 
              :title="product.name" 
              :price="{gross_price: product.gross_price, unit: product.unit}" 
              :loaded="loaded" 
              :text="product.short_description" 
            />
          </div>
          <div class="mt-12">
            <ProductDescriptionBlock 
              title="Beskrivelse" 
              :loaded="loaded" 
              :text="product.description" 
            />
          </div>
          <div class="mt-12">
            <ProductVariantBlock 
              title="Varianter" 
              :loaded="loaded" 
              :variants="product.variants" 
              :order="order"
              @on-select="selectVariant"
            />
          </div>
          <div class="mt-12">
            <article>
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
          </div>
          <div class="mt-12">
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
          </div>
          <div class="mt-12">
            <ProductFilesBlock :loaded="loaded" :files="product.files" />
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
import ImageCarousel from '@/components/image-carousel.vue'
import ProductDescriptionBlock from '@/components/product-description-block.vue'
import ProductVariantBlock from '@/components/product-variant-block.vue'
import ProductFilesBlock from '@/components/product-files-block.vue'

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
    ImageCarousel,
    ProductDescriptionBlock,
    ProductVariantBlock,
    ProductSpecRow,
    ProductFilesBlock
  },
  data() {
    return {
      loaded: false,
      product: {
        images: [],
        files: [],
      },
      order: {
        selectedVariant: null,
        selectedSize: null,
        amount: 1
      },
    }
  },
  methods: {
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
      const slug = this.$route.params.productSlug

      // get products attached to category
      apiService.get(`products/${slug}/`)
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