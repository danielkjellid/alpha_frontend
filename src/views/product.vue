<template>
  <div>
    <BaseNavbar />
    <main>
      <section>
        <article class="image-full-container relative overflow-hidden">
          <div class="table-cell align-middle">
            <!-- dummy images for the time being -->
            <transition-group
              name="fade"
              tag="div"
            >
              <div v-for="index in [currentIndex]" :key="index">
                <!-- <img
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
                > -->
                <img
                  :src="displayImage.image_1536x660"
                  alt=""
                  class="absolute bottom-0 left-0 right-0 w-full h-full"
                  :srcset="`${displayImage.image_512x512} 512w,
                            ${displayImage.image_1024x1024} 1024w,
                            ${displayImage.image_1024x480} 1024w,
                            ${displayImage.image_1536x660} 1536w,
                            ${displayImage.image_2048x800} 2048w,
                            ${displayImage.image_2560x940} 2560w,
                            ${displayImage.image_3072x940} 3072w`"
                >
              </div>
            </transition-group>
            <div class="absolute top-0 bottom-0 left-0 right-0 max-w-screen-xl mx-auto">
              <div class="xl:flex items-center justify-end hidden h-full">
                <div class="info-box px-5 py-5 bg-white rounded-md">
                  <div>
                    <div>
                      <h1 class="text-xl font-medium text-gray-900">Ikon</h1>
                      <p class="mt-5 text-sm text-gray-700">Ikon er en gulv- og veggkolleksjon inpirert av de gamle tradisjonene av overflater, behandlet med en blanding av marmor, stein, og terracotta fragmenter.</p>
                    </div>
                  </div>
                  <div class="mt-5">
                    <h2 class="text-lg font-medium text-gray-900">kr 499,00 <span class="text-gray-600">per m2</span></h2>
                  </div>
                  <div class="mt-5">
                    <h2 class="text-sm font-medium text-gray-900">Varianter</h2>
                    <div class="flex items-center mt-3 space-x-3">
                      <button>
                        <img class="w-8 h-8 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                      </button>
                      <button>
                        <img class="w-8 h-8 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                      </button>
                      <button>
                        <img class="w-8 h-8 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                      </button>
                      <button>
                        <img class="w-8 h-8 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                      </button>
                    </div>
                  </div>
                  <div class="mt-5">
                    <h2 class="text-sm font-medium text-gray-900">Størrelser</h2>
                    <div class="gap-y-3 grid grid-cols-3 gap-8 mt-3">
                      <BaseButton plain class="hover:underline text-sm">B120 x H120</BaseButton>
                      <BaseButton plain class="hover:underline text-sm">B60 x H120</BaseButton>
                      <BaseButton plain class="hover:underline text-sm">B30 x H120</BaseButton>
                      <BaseButton plain class="hover:underline text-sm">B40 x H80</BaseButton>
                      <BaseButton plain class="hover:underline text-sm">Spesialstørrelser*</BaseButton>
                    </div>
                  </div>
                  <div class="mt-6">
                    <BaseButton light class="flex justify-center w-full">Ta kontakt med butikk</BaseButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <div class="flex items-center justify-center">
                <button @click="previous" aria-label="previous image" class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </button>
                <div class="flex items-center ml-20 mr-20 space-x-3">
                  <div 
                    v-for="index in images.length" 
                    :key="index" 
                    class="w-2 h-2 border border-white rounded-full"
                    :class="{'bg-white' : index-1 === (currentIndex % images.length)}"
                  ></div>
                </div>
                <button @click="next" aria-label="next image" class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
      <!-- <div class="sm:px-16 sm:py-8 md:px-32 md:py-10 xl:max-w-6xl max-w-4xl px-5 py-6 mx-auto"> -->
      <div class="sm:px-16 sm:py-8 xl:max-w-5xl max-w-2xl px-5 py-6 mx-auto">
        <section class="xl:hidden">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Ikon</h2>
            <h2 class="text-lg font-medium text-gray-900">kr 499,00 <span class="text-gray-600">per m2</span></h2>
          </div>
          <p class="mt-5 text-sm text-gray-700">
            Ikon er en gulv- og veggkolleksjon inpirert av de gamle tradisjonene av overflater, behandlet med en blanding av marmor, stein, og terracotta fragmenter.
          </p>
        </section>
        <!-- Description -->
        <section class="xl:grid xl:grid-cols-5 xl:mt-0 xl:gap-16 mt-12">
          <article class="xl:col-span-2">
            <h2 class="text-lg font-medium text-gray-900">Beskrivelse</h2>
            <div class="mt-6 text-sm text-gray-700">
              <p>Vindblåste steintopper inspirerer overflatene til Aran: flisekolleksjonen er inspirert av kvartsittstein, som hører til stille, nordlige landskap. Steinens allsidighet gjør at arkitektoniske rom er frie til å uskarpe grensene mellom interiør og utvendige rom. Aran sitter ved siden av de mest innovative designtrendene, i en blanding av overordnet eleganse og moderne energi.</p>
              <br>
              <p>Aran kommer i fem flisestørrelser inkludert vanlige dimensjoner som 9,7x60 cm, opptil 60x120 cm plater med en K2-variant i 20mm tykkelse for utendørs bruk. Serien utvider mulighetene for kreativitet med tre spesielle brikker, UP-dekorasjonen og to mosaikker: versjonen av flere tykkelser og Mosaico 30x30.</p>
            </div>
          </article>
          <div class="xl:col-span-3">
            <!-- Variants -->
            <article class="xl:mt-0 mt-12">
              <h2 class="text-lg font-medium text-gray-900">Varianter</h2>
              <div class="sm:grid-cols-5 sm:gap-6 grid grid-cols-3 gap-8 mt-6">
                <div class="mx-auto text-center">
                  <div>
                    <img class="w-20 h-20 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-gray-900">Beige</h3>
                </div>
                <div class="mx-auto text-center">
                  <div>
                    <img class="w-20 h-20 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-gray-900">Beige</h3>
                </div>
                <div class="mx-auto text-center">
                  <div>
                    <img class="w-20 h-20 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-gray-900">Beige</h3>
                </div>
                <div class="mx-auto text-center">
                  <div>
                    <img class="w-20 h-20 border-2 border-gray-300 rounded-full" src="https://flishuset.s3.amazonaws.com/CACHE/images/media/products/variants/Walnut_46SutN0/529d10e88147a68db464006d7fca5a8c.jpg" />
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-gray-900">Beige</h3>
                </div>
              </div>
            </article>
            <!-- sizes -->
            <article class="xl:mt-16 mt-12">
              <h2 class="text-lg font-medium text-gray-900">Størrelser <span class="text-gray-600">oppgitt i cm</span></h2>
              <div class="mt-6">
                <div class="gap-y-6 sm:grid-cols-4 sm:gap-8 grid grid-cols-3 gap-10">
                  <p class="text-sm">B120 x H120</p>
                  <p class="text-sm">B60 x H120</p>
                  <p class="text-sm">B30 x H120</p>
                  <p class="text-sm">B40 x H80</p>
                  <p class="text-sm">Spesial*</p>
                </div>
                <p class="mt-6 text-xs text-gray-700">* Produktet finnes i størrelser utover det som er standard, eller kan tilpasses dine behov. Ta kontakt med oss for mer informasjon!</p>
              </div>
            </article>
          </div>
        </section>
        <section class="xl:grid xl:grid-cols-5 xl:gap-16 mt-12">
          <!-- specifications -->
          <article class="xl:col-span-2">
            <h2 class="text-lg font-medium text-gray-900">Spesifikasjoner</h2>
            <table class="lg:w-3/4 w-64 mt-6">
              <tr class="mt-6 sr-only">
                <th>Spesifikasjon</th>
                <th>Verdi</th>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Farge</td>
                <td class="text-sm text-gray-900">Grå</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Rom</td>
                <td class="text-sm text-gray-900">Kjøkken, Bad</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Stil</td>
                <td class="text-sm text-gray-900">Stein, Betong</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Bruksområde</td>
                <td class="text-sm text-gray-900">Gulv, Vegg</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Materiale</td>
                <td class="text-sm text-gray-900">Keramikl</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Vannoppsug</td>
                <td class="text-sm text-gray-900">&lt;0,5%</td>
              </tr>
              <tr>
                <td class="text-sm text-gray-700">Opprinnelse</td>
                <td class="text-sm text-gray-900">Italia</td>
              </tr>
            </table>
          </article>
          <article class="lg:col-span-3 xl:mt-0 mt-12">
            <h2 class="text-lg font-medium text-gray-900">Nedlastninger</h2>
            <div class="mt-6 border border-gray-300 rounded-md">
              <div class="flex items-center justify-between px-4 py-4">
                <div class="flex items-center text-sm">
                  <BaseIcon name="paper-clip" solid class="mr-2" fill="text-gray-500" />
                  Katalog
                </div>
                <BaseButton plain class="hover:underline text-sm">Last ned</BaseButton>
              </div>
              <div class="flex items-center justify-between px-4 py-4 border-t border-gray-300">
                <div class="flex items-center text-sm">
                  <BaseIcon name="paper-clip" solid class="mr-2" fill="text-gray-500" />
                  Katalog
                </div>
                <BaseButton plain class="hover:underline text-sm">Last ned</BaseButton>
              </div>
            </div>
          </article>
        </section>
      </div>
      <div class="xl:hidden bg-gray-50 sticky bottom-0 left-0 right-0 border-t border-gray-300">
        <div class="sm:px-16 sm:py-8 max-w-2xl px-5 py-6 mx-auto">
          <div class="flex items-center justify-between">
            <div class="sm:w-3/4 w-2/3">
              <BaseButton class="flex justify-center w-full">Legg til i handlekurv</BaseButton>
            </div>
            <div class="sm:w-1/4 flex items-center justify-end w-1/3 ml-3">
              <BaseButton plain class="mr-3">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
              </BaseButton>
              <span class="text-base font-medium text-gray-900">1 <span class="font-medium text-gray-600">m2</span></span>
              <BaseButton plain class="ml-3">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Product',
  computed: {
    computedImages() {
      return this.images
    },
    displayImage() {
      return this.computedImages[Math.abs(this.currentIndex) % this.images.length]
    }
  },
  data() {
    return {
      images: [
        {
          image_512x512: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/efd2f12a48eb069752621b400d983518.jpg',
          image_1024x1024: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/734a76e4dabe6516991d5fbb76cc44c9.jpg',
          image_1024x480: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/85d0abe28a8db662b56d4dfd4dfe59c3.jpg',
          image_1536x660: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg',
          image_2048x800: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/6f8b4f797cade7a3fc042e251fd82d7c.jpg',
          image_2560x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/5fd72d0a6328b5d9f453eaa3216d663b.jpg',
          image_3072x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/1766491d3dd2b83b5c7a17f421c414f6.jpg'
        },
        {
          image_512x512: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/d68737de5199ee7307de19198c6c6989.jpg',
          image_1024x1024: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/21bdc2f6739338bd9c47e750cced87e4.jpg',
          image_1024x480: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/16d0b0cf27fd9ec76155fe1af140078c.jpg',
          image_1536x660: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/460c7021b659ea573c6b2964ea2482cf.jpg',
          image_2048x800: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/5ffe267ccda83a329b0e40ec0003f61e.jpg',
          image_2560x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/82f92b954de075f8cd8c6ac0c44ccf74.jpg',
          image_3072x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/tilbehor/a05052f2cd57d67a9ae7ad87c701805c.jpg'
        },
        {
          image_512x512: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/7f3ef26aa2db9dd25388f3bbdca439bf.jpg',
          image_1024x1024: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/e36a21b3482f4f257283dd89481d17d3.jpg',
          image_1024x480: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/d403a2db093e579f09f52375448fae5b.jpg',
          image_1536x660: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/0c173c1c3894bdbbd64a2ded538ed284.jpg',
          image_2048x800: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/dd44e2a80dd5a6cee0c446ab097a3a2f.jpg',
          image_2560x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/ed6d6809b9aa468510b0ac7638f06c25.jpg',
          image_3072x940: 'https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/blandebatterier/9976f671a13890a9df4f0aca518a78b6.jpg'
        }
      ],
      currentIndex: 0
    }
  },
  methods: {
    next() {
      this.currentIndex += 1
    },
    previous() {
      this.currentIndex -= 1
    }
  }
}
</script>

<style scoped>
  .info-box {
    width: 370px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.9s ease;
    overflow: hidden;
    visibility: visible;
    position: absolute;
    width:100%;
    opacity: 1;
  }

  .fade-enter,
  .fade-leave-to {
    visibility: hidden;
    width:100%;
    opacity: 0;
  }
</style>