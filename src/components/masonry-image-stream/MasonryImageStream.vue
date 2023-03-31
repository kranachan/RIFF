<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { Image } from '@/constants/image'
import ImagePreview from '@/components/image-preview/ImagePreview.vue'

/**
 * TODO: add visual list support
 */
const { images, col, gap } = withDefaults(
  defineProps<{
    images: Image[]
    col?: number
    gap?: number
  }>(),
  {
    col: 2,
    gap: 4,
  },
)

const rootStyle = {
  gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
  gap: `${gap}px`,
}

const colStyle = { gap: rootStyle.gap }

const COL_RENDER_SIZE = 50

const getDisplayable = (colIndex: number, imageIndex: number): boolean => {
  return Array.from(Array(COL_RENDER_SIZE).keys())
    .map((n) => colIndex + col * n)
    .includes(imageIndex + 1)
}

onMounted(() => {
  gsap.fromTo(
    '.image-preview',
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      ease: 'power1.inOut',
      duration: 0.3,
      delay: 0.35,
      stagger: {
        amount: 0.4,
        grid: [col, images.length / col],
        from: 'start',
      },
    },
  )
})
</script>

<template>
  <div class="root" :style="rootStyle">
    <div class="col" v-for="colIndex in col" :key="colIndex" :style="colStyle">
      <template v-for="(image, imageIndex) in images">
        <ImagePreview
          class="image-preview"
          v-if="getDisplayable(colIndex, imageIndex)"
          :source="image.source"
          :liked="image.liked"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('./MasonryImageStream.css');
</style>
