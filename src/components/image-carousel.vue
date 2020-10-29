<template>
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
            v-for="(image, index) in images" :key="`image-${index}`" v-show="showingIndex === index"
            :src="image.image_1536x660"
            alt="Decorative image"
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
        <slot></slot>
        <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
          <ImageCarouselControls v-if="images.length > 1" :images="images" :showingIndex="showingIndex" @next="next" @previous="previous" />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import ImageCarouselControls from '@/components/image-carousel-controls.vue'

export default {
  name: 'ImageCarousel',
  components: {
    ImageCarouselControls,
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showingIndex: 0
    }
  },
  methods: {
    next() {

      // show the next image if the current index is within the array
      if (this.showingIndex < this.images.length-1) {
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
        this.showingIndex = this.images.length-1

      // if not, show the previous image
      } else {
        this.showingIndex -=1
      }
    },
  }
}
</script>