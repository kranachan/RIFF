<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import { Image } from '@/models/media'
import { useElementBounding } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  image: Image
  liked: boolean
}>()

const likeBtnRef = ref<HTMLButtonElement>()
const containerRef = ref<HTMLImageElement>()

const imageHeight = ref<number>()

watchEffect(() => {
  const containerWidth = useElementBounding(containerRef).width.value
  imageHeight.value = Math.floor(
    (containerWidth / props.image.width) * props.image.height,
  )
})

const onLikeClicked = (e: MouseEvent) => {}
</script>

<template>
  <div ref="containerRef" class="root">
    <div
      class="image"
      v-motion
      :initial="{
        opacity: 0,
        filter: 'blur(5px)',
      }"
      :enter="{
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 800 },
      }"
      :style="{
        backgroundImage: `url(${image.url})`,
        height: `${imageHeight}px`,
      }"
    />
    <button
      ref="likeBtnRef"
      class="action-like"
      @click="onLikeClicked"
      v-motion
      :initial="{ scale: 1 }"
      :visible="{ scale: 1 }"
      :tapped="{ scale: 0.9 }"
    >
      <Icon :class="liked && 'liked'" name="Heart" />
    </button>
  </div>
</template>

<style scoped>
@import url('./ImagePreview.css');
</style>
