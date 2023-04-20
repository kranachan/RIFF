<script setup lang="ts">
import AlbumItem from '@/components/album-item/AlbumItem.vue'
import { useStore } from '@/store'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { albumStore } = useStore()
const albumId = route.params.albumId as string
const album = computed(() => albumStore.getAlbumById(albumId))
// const imageHeight = ref<number>()

// const calculateImageHeight = () => {
//   const windowWidth = useWindowSize().width.value
//   const imageOriginWidth = album.value?.content.image?.width ?? 0
//   const imageOriginHeight = album.value?.content.image?.height ?? 0
//   imageHeight.value = Math.floor(
//     (windowWidth / imageOriginWidth) * imageOriginHeight,
//   )
// }

watchEffect(async () => {
  if (!album.value) {
    await albumStore.fetchAlbumById(albumId)
  }
})
</script>

<template>
  <AlbumItem v-if="album" :album="album" with-back />
</template>

<style scoped>
@import url('./Album.css');
</style>
