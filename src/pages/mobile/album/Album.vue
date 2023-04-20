<script setup lang="ts">
import ImageProvider from '@/components/image-provider/ImageProvider.vue'
import { useStore } from '@/store'
import { useWindowSize } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Starport } from 'vue-starport'

const route = useRoute()
const { albumStore } = useStore()
const albumId = route.params.albumId as string
const album = computed(() => albumStore.getAlbumById(albumId))
const imageHeight = ref<number>()

const calculateImageHeight = () => {
  const windowWidth = useWindowSize().width.value
  const imageOriginWidth = album.value?.content.image?.width ?? 0
  const imageOriginHeight = album.value?.content.image?.height ?? 0
  imageHeight.value = Math.floor(
    (windowWidth / imageOriginWidth) * imageOriginHeight,
  )
}

watchEffect(async () => {
  if (!album.value) {
    await albumStore.fetchAlbumById(albumId)
  }
  calculateImageHeight()
})
</script>

<template>
  <Starport
    :port="albumId"
    :style="{ height: `${imageHeight ?? 500}px` }"
    :duration="500"
  >
    <ImageProvider :url="album?.content.image?.url" />
  </Starport>
</template>

<style scoped>
@import url('./Album.css');
</style>
