<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import { Album } from '@/models'
import { useElementBounding } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
import { Starport } from 'vue-starport'
import ImageProvider from '../image-provider/ImageProvider.vue'

const props = defineProps<{
  album: Album
}>()

const containerRef = ref<HTMLImageElement>()
const imageHeight = ref<number>()
const image = props.album.content.image

watchEffect(() => {
  const containerWidth = useElementBounding(containerRef).width.value
  imageHeight.value = Math.floor((containerWidth / image.width) * image.height)
})

const onLikeClicked = (e: MouseEvent) => {}
</script>

<template>
  <div ref="containerRef" class="root">
    <Starport
      :port="album.id"
      :style="{ height: `${imageHeight}px` }"
      :duration="500"
    >
      <ImageProvider :url="image.url" />
    </Starport>
    <button
      class="action-like"
      @click.stop="onLikeClicked"
      v-motion
      :initial="{ scale: 1 }"
      :visible="{ scale: 1 }"
      :tapped="{ scale: 0.9 }"
    >
      <Icon :class="album.liked && 'liked'" name="Heart" />
    </button>
  </div>
</template>

<style scoped>
@import url('./ImagePreview.css');
</style>
