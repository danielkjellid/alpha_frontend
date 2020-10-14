<template>
  <div>
    <BaseNavbar />
    <main>
      <section>
        <!-- main promotional campaign -->
        <article class="image-full-container relative overflow-hidden">
          <div class="table-cell align-middle">
            <!-- dummy images for the time being -->
            <img
              src="https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg" 
              alt=""
              class="absolute bottom-0 left-0 right-0 w-full h-full"
              srcset="https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/c95a96ef93109c6546738fdc429bcb8c.jpg 512w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/3b181ea54fb5c380b14d957b2764a98c.jpg 1024w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/f9501d53983d6e627f73a9b4ee3f87ad.jpg 1024w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/189f0b6d44d6e8dada70557aa6e6103a.jpg 1536w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/0afee951bb0d570c0249611747f2b64f.jpg 2048w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/3ad72ec9f2e2f8596c422c843c52be52.jpg 2560w,
                      https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/test/auth/d0bd021152e6ee41573939506b9c5102.jpg 3072w"
            >
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
              <div class="text-center">
                <h2 class="text-2xl font-medium text-white">Velkommen til vår nye nettside</h2>
                <h3 class="mt-3 text-lg text-white">En verden av ro, ærlige materialer, naturlige farger og bærekraftige design</h3>
                <!-- <BaseButton class="mt-5" outlined to="`/kampanje/`">
                  Se den her
                </BaseButton> -->
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 flex justify-center mb-8 text-center">
              <div>
                <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
              </div>
            </div>
          </div>
        </article>
      </section>
      <div>
        <div class="max-w-3xl px-8 py-8 mx-auto text-center">
          <p class="text-sm text-gray-900">
            Fliser fra Flishuset er av svært høy kvalitet. Alle våre fliser er gjennomfarget og betegnes som ”full body stone” på fagspråket. Denne type fliser egner seg til alle bruksområder. Flisene er bygget på modul, slik at det vil være mulig å kombinere ulike størrelser med fliser og de vil stemme overens i fuger.
          </p>
          <br>
          <p class="text-sm text-gray-900">
            En stor andel av våre kunder er “vanlige kunder” som ønsker fliser i fra våre anerkjente Italienske produsenter. En annen stor andel av kundene våre er arkitekter og interiørarkitekter.
          </p>
          <br>
          <p class="text-sm text-gray-900">
            Vi leverer over hele landet.
          </p>
        </div>
        <!-- categories -->
        <section v-if="loaded" class="sm:grid-cols-2 grid grid-cols-1 gap-0">
          <article
            v-for="category in categories" 
            :key="category.id"
            class="relative overflow-hidden"
            :class="category.width === 'full' ? 'col-span-2 image-full-container' : 'col-span-2 sm:col-span-1 image-half-container'"
          >
            <div class="table-cell align-middle">
              <img
                v-if="category.width === 'full'" 
                :src="category.image_1536x660" 
                alt=""
                class="absolute bottom-0 left-0 right-0 w-full h-full"
                :srcset="`${category.image_512x512} 512w,
                          ${category.image_1024x1024} 1024w,
                          ${category.image_1024x480} 1024w,
                          ${category.image_1536x660} 1536w,
                          ${category.image_2048x800} 2048w,
                          ${category.image_2560x940} 2560w,
                          ${category.image_3072x940} 3072w`"
              >
              <img
                v-else
                :src="category.image_1024x1024" 
                :alt="`Placeholder image of the ${category.name} category.`"
                :srcset="`${category.image_512x512} 512w,
                          ${category.image_1024x1024} 1024w,
                          ${category.image_1536x1536} 1536w`"
              >
            </div>
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full">
              <h2 class="text-xl text-white">{{ category.name }}</h2>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton outlined :to="`/kategori/${category.slug}/`">
                {{ category.name }}
              </BaseButton>
            </div>
          </article>
        </section>
        <section v-else class="animate-pulse grid grid-cols-1 gap-0">
          <div v-for="i in 5" :key="i" class="image-full-container bg-gray-400" />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import apiService from '@/common/api'

export default {
  name: 'Home',
  page() {
    return {
      title: `Hjem`,
      meta: [
        {
          name: 'description',
          content: 'Velkommen til flishuset sin hjemmeside.'
        }
      ]
    }
  },
  data() {
    return {
      categories: null,
      loaded: false,
    }
  },
  methods: {
    fetchCategories() {
      apiService.get('categories/')
        .then(categories => {
          this.categories = categories.data
          this.loaded = true
        })
    }
  },
  created() {
    this.fetchCategories()
  }
}
</script>
