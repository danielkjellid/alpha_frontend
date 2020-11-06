<template>
  <div>
    <BaseNavbar />
    <main class="mx-auto">
      <BaseImageheader :object="kitchenObject" />
      <!-- site product content -->
      <div class="container max-w-screen-xl min-h-screen mx-auto">
        <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="xl:px-0 px-4 py-8" />
        <div class="bg-gray-50 w-full">
          <div class="sm:px-6 lg:px-8 max-w-2xl px-4 py-8 mx-auto text-center">
            <h2 class="sm:text-4xl sm:leading-10 text-2xl font-extrabold leading-9 text-gray-900">
              En verden av muligheter, skreddersydd for deg.
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-600">Vi er stolte samarbeidspartnere med Kjøkkenhuset Lillestrøm, som tilbyr et hav av mulige løsninger fra JKE Design, skreddersydd dine behov.</p>
            <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900 inline-flex items-center flex-shrink-0 px-4 py-2 mt-8 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md">Bestill tegnetime hos oss i dag!</a>
          </div>
        </div>
        <section class="lg:mt-5 mt-0">
          <div v-if="loaded">
            <div 
              class="lg:flex lg:items-center lg:mb-5 w-full mb-8" 
              v-for="(kitchen, index) in fetchedKitchens" 
              :key="kitchen.id"
              :class="index % 2 == 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'"
            >
              <div class="image-container flex-shrink-0 overflow-hidden">
                <img 
                  :src="kitchen.thumbnail_660x400" 
                  alt=""
                  :srcset="`${kitchen.thumbnail_500x305} 500w,
                            ${kitchen.thumbnail_660x400} 660w,
                            ${kitchen.thumbnail_850x520} 850w`"   
                >
              </div>
              <div class="lg:px-16 px-4">
                <div class="flex items-center justify-between mt-4">
                  <h1 class="text-xl font-medium text-gray-900">{{ kitchen.name }}</h1>
                  <BaseButton plain :to="`/kjokken/${kitchen.slug}/`" class="hover:underline lg:hidden text-sm">Les mer →</BaseButton>
                </div>
                <p class="mt-2 text-sm text-gray-700">{{ kitchen.thumbnail_description }}</p>
                <BaseButton plain :to="`/kjokken/${kitchen.slug}/`" class="hover:underline lg:block hidden mt-4 text-sm">Les mer →</BaseButton>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- sceleton loading -->
            <div 
              class="lg:flex lg:items-center lg:mb-5 w-full mb-8"
              v-for="i in 8"
              :key="i"
              :class="i % 2 == 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
            >
              <div class="image-container animate-pulse flex-shrink-0 overflow-hidden bg-gray-400" />
              <div class="lg:px-16 w-full px-4">
                <div class="animate-pulse flex items-center justify-between mt-4">
                  <div class="w-2/5 h-8 bg-gray-400 rounded" />
                  <div class="animate-pulse lg:hidden w-1/4 h-6 bg-gray-400 rounded" />
                </div>
                <div class="animate-pulse mt-5 space-y-2">
                  <div class="h-4 bg-gray-400 rounded" />
                  <div class="w-5/6 h-4 bg-gray-400 rounded" />
                  <div class="h-4 bg-gray-400 rounded" />
                  <div class="w-4/6 h-4 bg-gray-400 rounded" />
                </div>
                <div class="animate-pulse lg:block hidden w-1/4 h-6 mt-4 bg-gray-400 rounded" />
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

export default {
  name: 'KitchenList',
  page() {
    return {
      title: 'Kjøkken',
      meta: [
        {
          name: 'description',
          content: 'En oversikt over kjøkken vi fører.'
        }
      ]
    }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '/' },
        { text: 'Kjøkken', disabled: true },
      ]
    },
  },  
  data() {
    return {
      loaded: false,
      category: {},
      kitchenObject: {
        name: 'Kjøkken',
        image_512x512: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/4327513b303bdda4203fcea3505383bf.jpg',
        image_1024x1024: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/598aac538a099b7a2943731a769abc46.jpg',
        image_1024x480: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/3f6c9bc7b7784b50aced890e0073e1da_YNMYSBh.jpg',
        image_1536x660: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/d1a0f21a4b80fe684fe8ce56abf82bb7_o0VQgFk.jpg',
        image_2048x800: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/aa5c87e019add477da9f674f9213bbaa_SQPv9LT.jpg',
        image_2560x940: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/902a5579ae8dc54d446f20369fbe8783.jpg',
        image_3072x940: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/af0b0547d2eef32a2923f7948116f393.jpg',
      },
      fetchedKitchens: []
    }
  },
  methods: {
    fetchKitchens() {
      apiService.get('kitchens/')
        .then(kitchens => {
          this.fetchedKitchens = kitchens.data
          this.loaded = true
        })
    },
  },
  created() {
    this.fetchKitchens()
  }
}
</script>

<style scoped>
  .image-container {
    width: 100%;
    height: 250px;
  }

  @media (min-width: 640px) {
    .image-container {
      height: 300px;
    }
  }

  @media (min-width: 768px) {
    .image-container {
      height: 350px;
    }
  }

  @media (min-width: 1024px) {
    .image-container {
      height: 400px;
      width: 60%;
    }
  }

  @media (min-width: 1280px) {
    .image-container {
      height: 520px;
      width: 66%;
    }
  }
</style>