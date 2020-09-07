<template>
  <div class="relative min-h-screen">
    <BaseNavbar />
    <div>
      <div>
        <!-- main promotional campaign -->
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
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full">
              <div class="text-center">
                <h2 class="text-2xl font-medium text-white">Vårkolleksjonen har ankommet</h2>
                <h3 class="mt-3 text-lg text-white">En verden av ro, ærlige materialer, naturlige farger og bærekraftige design</h3>
                <BaseButton class="mt-5" outlined to="`/kampanje/`">
                  Se den her
                </BaseButton>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton icon light plain>
                <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
              </BaseButton>
            </div>
          </div>
        </article>
      </div>
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
      <div>
        <div class="sm:grid-cols-2 grid grid-cols-1 gap-0">
          <article
            v-for="category in categories" 
            :key="category.id"
            class="relative overflow-hidden border border-red-700"
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
                alt=""
                :srcset="`${category.image_512x512} 512w,
                          ${category.image_1024x1024} 1024w,
                          ${category.image_1536x1536} 1536w`"
              >
            </div>
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full">
              <h2 class="text-xl text-white">{{ category.name }}</h2>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton outlined :to="`/kategorier/${category.slug}/`">
                {{ category.name }}
              </BaseButton>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/common/api.service'

export default {
  name: 'Home',
  data() {
    return {
      categories: null,
    }
  },
  methods: {
    fetchCategories() {
      apiService(`categories/`)
      .then(categories => {
        this.categories = categories
      })
    }
  },
  created() {
    this.fetchCategories()
  }
}
</script>

<style scoped>
  .image-full-container {
    height: 375px;
    width: 100%;
  }

  .image-half-container {
    height: 375px;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .image-full-container {
      height: 300px;
      width: 100%;
    }

    .image-half-container {
      height: 300px;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .image-full-container {
      height: 366px;
      width: 100%;
    }

    .image-half-container {
      height: 362px;
      width: 100%;
    }
  }

  @media (min-width:1024px) {
    .image-full-container {
      height: 480px;
      width: 100%;
    }

    .image-half-container {
      height: 480px;
      width: 100%;
    }
  }

  @media (min-width: 1280px) {
    .image-full-container {
      height: 660px;
      width: 100%;
    }

    .image-half-container {
      height: 660px;
      width: 100%;
    }
  }

  @media (min-width: 2048px) {
    .image-full-container {
      height: 800px;
      width: 100%;
    }

    .image-half-container {
      height: 800px;
      width: 100%;
    }
  }

  @media (min-width: 3072px) {
    .image-full-container {
      height: 940px;
      width: 100%;
    }

    .image-half-container {
      height: 940px;
      width: 100%;
    }
  }
</style>