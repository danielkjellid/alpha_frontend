<template>
  <div>
    <BaseNavbar />
    <main>
      <!-- <ImageCarousel :images="kitchen.images" /> -->
      <BaseImageheader :object="kitchen" />
      <!-- main site content -->
      <div class="sm:px-16 sm:py-8 xl:px-0 relative max-w-2xl px-5 py-6 mx-auto">
        <section class="mt-6">
          <div>
            <ProductDescriptionBlock 
              :title="kitchen.name" 
              :loaded="loaded" 
              :text="kitchen.description" 
            />
          </div>
          <div v-if="kitchen.example_from_price" class="mt-8">
            <div class="bg-gray-50 rounded-md">
              <div class="xl:grid-cols-2 grid grid-cols-1">
                <div>
                  <img 
                    class="example-image-container rounded-tr-md rounded-tl-md xl:rounded-tr-none xl:rounded-l-md" 
                    src="https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg" 
                    alt="Image of example set up"
                    srcset="https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg 460w,
                            https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg 550w"
                  >
                </div>
                <div class="sm:px-6 xl:px-8 px-5 py-6">
                  <div>
                    <div class="flex items-center justify-between">
                      <h2 class="text-xl font-medium text-gray-900">Priseksempel</h2>
                      <p class="text-sm font-medium text-gray-800">kr {{ kitchen.example_from_price | formatPrice}}</p>
                    </div>
                    <p class="mt-3 text-sm text-gray-700">Priseksempel for oppsett ekskludert benkeplater, armaturer og hvitevarer. Få et konkret tilbud gjennom en tegnetime.</p>
                    <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:underline mt-4 text-sm">Bestill tegnetime →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="kitchen.extra_description" class="mt-8">
            <p class="text-sm text-gray-700">{{ kitchen.extra_description }}</p>
          </div>
          <div v-if="kitchen.can_be_painted" class="mt-12">
            <article>
              <h2 class="text-lg font-medium text-gray-900">Malte fronter</h2>
              <p class="mt-4 text-sm text-gray-700">Nordic One kan fås i malte fronter. Du kan velge fritt mellom ca. 2000 farger. Ta kontakt med oss for mer informasjon.</p>
            </article>
          </div>
          <div v-if="kitchen.silk_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Silks" 
              :loaded="loaded" 
              :variants="kitchen.silk_variants" 
              :canBeSelected="false"
            />
          </div>
          <div v-if="kitchen.decor_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Dekor" 
              :loaded="loaded" 
              :variants="kitchen.decor_variants" 
              :canBeSelected="false"
            />
          </div>
          <div v-if="kitchen.plywood_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Finér" 
              :loaded="loaded" 
              :variants="kitchen.plywood_variants" 
              :canBeSelected="false"
            />
          </div>
          <div v-if="kitchen.laminate_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Laminat" 
              :loaded="loaded" 
              :variants="kitchen.laminate_variants" 
              :canBeSelected="false"
            />
          </div>
          <div v-if="kitchen.exclusive_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Eksklusiv" 
              :loaded="loaded" 
              :variants="kitchen.exclusive_variants" 
              :canBeSelected="false"
            />
          </div>
          <div v-if="kitchen.trend_variants.length > 0" class="mt-12">
            <ProductVariantBlock 
              title="Trend farger" 
              :loaded="loaded" 
              :variants="kitchen.trend_variants" 
              :canBeSelected="false"
            />
          </div>
          <div class="mt-12">
            <div class="bg-gray-50 px-5 py-5 rounded-md">
              <div class="flex flex-wrap items-center justify-between">
                <div class="mr-4">
                  <h2 class="font-medium text-gray-900">Tegnetime</h2>
                  <p class="mt-1 text-sm text-gray-700">Book en uforpliktende tegnetime med en interiørdesigner!</p>
                </div>
                <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:underline mt-4 text-sm">Bestill tegnetime →</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import apiService from '@/common/api'
import ProductDescriptionBlock from '@/components/product-description-block.vue'
import ProductVariantBlock from '@/components/product-variant-block.vue'

export default {
  name: 'KitchenDetail',
  page() {
    return {
      title: `${this.kitchen.name}`,
      meta: [
        {
          name: 'description',
          content: `Detaljside av kjøkkenserien ${this.kitchen.name}`
        }
      ]
    }
  },
  components: {
    ProductDescriptionBlock,
    ProductVariantBlock,
  },
  data() {
    return {
      loaded: false,
      kitchen: {},
    }
  },
  methods: {
    fetchKitchen() {
      const slug = this.$route.params.kitchenSlug

      // get products attached to category
      apiService.get(`kitchens/${slug}/`)
      .then(kitchen => {
        this.kitchen = kitchen.data

        // when products are loaded, set loaded to true
        this.loaded = true
      })
    }
  },
  created() {
    this.fetchKitchen()
  }
}
</script>

<style scoped>
  .example-image-container {
    height: 200px;
    width: 100%;
  }

  @media (min-width: 640px) {
    .example-image-container {
      height: 250px;
    }
  }

  @media (min-width: 768px) {
    .example-image-container {
      height: 300px;
    }
  }

  @media (min-width: 1280px) {
    .example-image-container {
      height: 250px;
    }
  }
</style>