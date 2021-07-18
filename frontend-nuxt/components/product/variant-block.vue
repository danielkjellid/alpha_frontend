<template>
  <article>
    <h2 class="text-lg font-medium text-gray-900">{{ title }}</h2>
    <div v-if="loaded" class="sm:grid-cols-5 sm:gap-6 grid grid-cols-3 gap-8 mt-6">
      <component
        :is="type"
        v-for="variant in variants"
        :key="variant.id"
        @click="selectVariant(variant.id)"
        class="flex items-start justify-center text-center"
      >
        <div>
          <div class="relative">
            <img
              v-if="variant.image"
              class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
              :src="variant.image"
              :class="{'border-green-300': isSelected(variant.id)}"
            />
            <div v-else-if="variant.color_hex" :style="`background-color: ${variant.color_hex }`" class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full" />

            <div v-if="isSelected(variant.id)" class="absolute inset-0 flex items-center justify-center">
              <BaseIcon solid name="check" fill="text-green-500" height="h-8" width="w-8" />
            </div>
          </div>
          <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
        </div>
      </component>
    </div>
    <!-- sceleton loaded placeholder for variants -->
    <div v-else class="sm:grid-cols-5 sm:gap-6 animate-pulse grid grid-cols-3 gap-8 mt-6">
      <div v-for="i in 5" :key="i"><div class="w-20 h-20 mx-auto bg-gray-400 rounded-full"></div><h3 class="w-2/4 h-4 mx-auto mt-3 bg-gray-400 rounded"></h3></div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { variants } from '~/tailwind.config'

export default defineComponent({
  name: 'ProductVariantBlock',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Varianter'
    },
    variants: {
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      required: false
    },
    canBeSelected: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, { emit }) {

    const type = computed(() => {
      if (props.canBeSelected) {
        return 'button'
      } else {
        return 'div'
      }
    })

    const selectVariant = (variant: number) => {
      if (props.canBeSelected) {
        emit('on-select', variant)
      }
    }

    const isSelected = (id: number) => {
      if (props.order) {
        if (props.order.selectedVariant === id) return true
      }

      return false
    }

    return {
      type,
      selectVariant,
      isSelected
    }
  }
})
</script>
