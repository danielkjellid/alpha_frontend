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
              srcset="https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/9291924409e100ff7d8ee709b1a5bb2d.jpg 512w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/ba3a431f6a6114ed320e5c2dff3538c8.jpg 1024w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/7f7830d5d864ba14800e48fa21a2313f.jpg 1024w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/85659844501e51c1dac2994e86a49a94.jpg 1536w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/6168a403a25aa457c0eaa8754c6c74f9.jpg 2048w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/f242d63021077f0d330df6787d716110.jpg 2560w,
                      https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/campaigns/default/94716ad55be0c7aa2d20d06a9409573a.jpg 3072w"
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
        <section class="max-w-3xl px-8 py-8 mx-auto text-center">
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
        </section>
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
          <article class="image-full-container relative col-span-2 overflow-hidden">
            <div class="table-cell align-middle">
              <img
                src="https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/Kj%C3%B8kken/1705_04_V01/e7c130d30ae92bf328bb61eab2bf8ed5.jpg" 
                alt=""
                class="absolute bottom-0 left-0 right-0 w-full h-full"
                srcset="https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/4327513b303bdda4203fcea3505383bf.jpg 512w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/598aac538a099b7a2943731a769abc46.jpg 1024w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/3f6c9bc7b7784b50aced890e0073e1da_YNMYSBh.jpg 1024w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/d1a0f21a4b80fe684fe8ce56abf82bb7_o0VQgFk.jpg 1536w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/aa5c87e019add477da9f674f9213bbaa_SQPv9LT.jpg 2048w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/902a5579ae8dc54d446f20369fbe8783.jpg 2560w,
                        https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/af0b0547d2eef32a2923f7948116f393.jpg 3072w"
              >
            </div>
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full">
              <h2 class="text-xl text-white">Kjøkken</h2>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton outlined to="/kjokken/">Kjøkken</BaseButton>
            </div>
          </article>
        </section>
        <section v-else class="animate-pulse grid grid-cols-1 gap-0">
          <div v-for="i in 5" :key="i" class="image-full-container bg-gray-400" />
        </section>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<script>
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
  computed: {
    categories() {
      return this.$store.getters['inventory/getCategories']
    },
    loaded() {
      if (this.categories.length > 0) return true

      return false
    }
  },
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
      height: 366px;
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

  @media (min-width: 1536px) {
    .image-full-container {
      height: 800px;
      width: 100%;
    }

    .image-half-container {
      height: 800px;
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