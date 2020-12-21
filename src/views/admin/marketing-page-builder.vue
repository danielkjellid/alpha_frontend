<template>
  <div class="bg-gray-50 min-h-screen px-8 py-8">
    <div style="min-width: 1280px" class="mx-auto">
      <div class="flex flex-row-reverse mb-3">
        <div class="w-3/4">
          <div class="flex items-center justify-end space-x-3">
            <BaseButton 
              plain 
              icon 
              class="hover:bg-gray-300 p-4 rounded"
              :class="{'bg-gray-300' : activeViewport === 'mobile'}"
              @click="activeViewport = 'mobile'"
            >
              <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </BaseButton>
            <BaseButton 
              plain 
              icon 
              class="hover:bg-gray-300 p-4 rounded"
              :class="{'bg-gray-300' : activeViewport === 'tablet'}"
              @click="activeViewport = 'tablet'"
            >
              <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </BaseButton>
            <BaseButton 
              plain 
              icon 
              class="hover:bg-gray-300 p-4 rounded"
              :class="{'bg-gray-300' : activeViewport === 'desktop'}"
              @click="activeViewport = 'desktop'"
            >
              <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="flex items-start w-full pb-8">
        <div class="w-1/4 mr-8">
          <div class="bg-white rounded shadow">
              <Tabs :tabs="[{text: 'Blokker', to: '#blocks'}, {text: 'Innstillinger', to: '#settings'}]" />
              <div v-if="this.$route.hash === '#settings'" class="p-5">
                <div>
                  <BaseInput
                    id="id_title"
                    v-model="settings.title" 
                    label="Tittel"
                    block 
                    :error="$errorMsg(errors.title)"
                    @input="resetErrorMessage"
                  />
                </div>
                <div class="mt-5">
                  <BaseInput
                    id="id_sub_title"
                    v-model="settings.sub_title" 
                    label="Undertittel"
                    block 
                    :error="$errorMsg(errors.sub_title)"
                    @input="resetErrorMessage"
                  />
                </div>
                <div class="flex items-end mt-5">
                  <BaseInput
                    id="id_slug"
                    v-model="settings.slug" 
                    label="Slug"
                    block 
                    :error="$errorMsg(errors.slug)"
                    @input="resetErrorMessage"
                  />
                  <BaseButton @click="slugify" light class="ml-2">Create</BaseButton>
                </div>
                <div class="mt-5">
                  <BaseTextarea
                    id="id_meta_description"
                    v-model="settings.meta_description"
                    label="Meta beskrivelse"
                    block
                    :error="$errorMsg(errors.sub_title)"
                    @input="resetErrorMessage"
                  >
                    {{ settings.meta_description }}
                  </BaseTextarea>
                </div>
                <div class="mt-5">
                  <BaseFileinput
                    id="id_image"
                    v-model="settings.image"
                    label="Cover bilde"
                    block
                    :error="$errorMsg(errors.image)"
                    @change="createImagePreview($event)"
                  />
                </div>
                <div class="mt-5">
                  <BaseCheckbox
                    id="id_is_active"
                    v-model="settings.is_active" 
                    :checked="settings.is_active" 
                    label="Siden er aktiv"
                    helpText="Hvis kampanjesiden er inaktiv fjernes den fra alle sider og bannere."
                  />
                </div>
              </div>
              <div 
                v-else 
                class="flex flex-wrap p-5 space-y-4"
              >
                <button 
                  v-for="block in blocks" 
                  :key="block.name"
                  class="hover:bg-gray-100 flex items-center justify-between w-full p-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded"
                  @click="pushBlockToContent(block)"
                >
                  {{ block.name }}
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
          </div>
        </div>
        <div class="w-3/4">
          <div 
            class="min-h-screen mx-auto bg-white border border-blue-600 border-dashed rounded shadow"
            :class="
              activeViewport == 'mobile' ? 'width-mobile' 
              : activeViewport == 'tablet' ? 'width-tablet' 
              : 'w-full'"
          >
            <div 
              class="relative overflow-hidden bg-gray-400"
              :class="
              activeViewport == 'mobile' ? 'image-full-container-mobile' 
              : activeViewport == 'tablet' ? 'image-full-container-tablet' 
              : 'image-full-container'"
            >
              <img :src="imagePreviewUrl" />
              <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
                <div class="text-center">
                  <h2 class="text-2xl font-medium text-white">{{ settings.title }}</h2>
                  <h3 class="mt-3 text-lg text-white">{{ settings.sub_title }}</h3>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 mb-4 text-center">
                <BaseButton icon light plain>
                  <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
                </BaseButton>
              </div>
            </div>
            <div class="container max-w-screen-xl min-h-screen mx-auto">
              <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="px-4 py-6" />
              <!-- actual editable content -->
              <div class="p-4">
                <div v-for="(block, index) in orderedContent" :key="index">
                  <div class="relative my-4">
                    <div class="absolute top-0 left-0 right-0 -mt-3 -ml-3 -mr-3">
                      <div class="flex items-start justify-between">
                        <div>
                          <button @click="decreaseOrder(block)" class="hover:text-gray-700 flex items-center justify-center p-2 text-gray-500 bg-white rounded-full shadow">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                          <button @click="increaseOrder(block)" class="hover:text-gray-700 flex items-center justify-center p-2 mt-2 text-gray-500 bg-white rounded-full shadow">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <button @click="deleteBlockFromContent(block)" class="hover:text-red-500 flex items-center justify-center p-2 text-gray-500 bg-white rounded-full shadow">
                          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div v-html="block.markup" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/tabs'
export default {
  components: {
    Tabs
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '#' },
        { text: 'Kampanjer', disabled: false, href: '#' },
        { text: this.settings.title, disabled: true },
      ] 
    },
    orderedContent() {
      return this.content.slice().sort(((a, b) => a.order < b.order ? -1 : (a.order > b.order) ? 1 : 0))
    }
  }, 
  data() {
    return {
      errors: {},
      imagePreviewUrl: '',
      activeViewport: 'desktop',
      settings: {
        title: 'Navn på kampanje',
        sub_title: '',
        slug: '',
        meta_description: '',
        is_active: true,
        image: '',
      },
      blocks: [
        {
          name: 'CTA Section',
          markup: '<div class="bg-gray-50 w-full"><div class="sm:px-6 lg:px-8 max-w-2xl px-4 py-8 mx-auto text-center"><h2 class="sm:text-4xl sm:leading-10 text-2xl font-extrabold leading-9 text-gray-900">En verden av muligheter, skreddersydd for deg.</h2><p class="mt-4 text-lg leading-6 text-gray-600">Vi er stolte samarbeidspartnere med Kjøkkenhuset Lillestrøm, som tilbyr et hav av mulige løsninger fra JKE Design, skreddersydd dine behov.</p><a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900 inline-flex items-center flex-shrink-0 px-4 py-2 mt-8 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md">Bestill tegnetime hos oss i dag!</a></div></div>'
        },
        {
          name: 'Banner Block',
          markup: '<p>Testing</p>',
        },
        {
          name: 'Product Collection',
          markup: '',
        },
        {
          name: 'Series Collection',
          markup: '',
        }
      ],
      content: [],
    }
 },
 methods: {
    pushBlockToContent(item) {

      let newItem = {
        id: this.content.length+1,
        name: item.name,
        markup: item.markup,
        order: this.content.length+1
      }

      this.content.push(newItem)
    },
    deleteBlockFromContent(item) {
      const itemIndex = this.content.indexOf(item)

      this.content.splice(itemIndex, 1)
    },
    decreaseOrder(item) {
      const itemIndex = this.content.indexOf(item) 

      this.content[itemIndex].order -= 1
    },
    increaseOrder(item) {
      const itemIndex = this.content.indexOf(item) 

      this.content[itemIndex].order += 1
    },
    resetErrorMessage() {
      // handle errors reset
    },
    slugify() {
      let str = this.settings.title

      str = str.replace(/^\s+|\s+$/g, "") // trim
      str = str.toLowerCase()

      // remove accents, swap ñ for n, etc
      let from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
      let to = "aaaaaaeeeeiiiioooouuuunc------"

      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes

      return this.settings.slug = str
    },
    createImagePreview(event) {
    this.imagePreviewUrl = URL.createObjectURL(event) // event sends event.target.files[0]
    },
  }
}
</script>

<style scoped>
  .image-full-container {
    height: 480px;
    width: 100%;
  }

  .image-full-container-mobile {
    height: 375px;
    width: 100%;
  }

  .image-full-container-tablet {
    height: 366px;
    width: 100%;
  }

  .width-mobile {
    width: 375px;
  }

  .width-tablet {
    width: 768px;
  }
</style>