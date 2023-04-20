<script setup lang="ts">
import ImagePreview from '@/components/image-preview/ImagePreview.vue'
import { Album } from '@/models'
import router from '@/router'

/**
 * TODO: add visual list support
 */
const props = withDefaults(
  defineProps<{
    albums: Album[]
    col?: number
    gap?: number
  }>(),
  {
    col: 2,
    gap: 4,
  },
)

const rootStyle = {
  gridTemplateColumns: `repeat(${props.col}, minmax(0, 1fr))`,
  gap: `${props.gap}px`,
}

const colStyle = { gap: rootStyle.gap }
const COL_RENDER_SIZE = 50

const getDisplayable = (colIndex: number, imageIndex: number): boolean => {
  return Array.from(Array(COL_RENDER_SIZE).keys())
    .map((n) => colIndex + props.col * n)
    .includes(imageIndex + 1)
}

const onAlbumClicked = (albumId: string) => {
  router.push(`/album/${albumId}`)
}
</script>

<template>
  <div class="root" :style="rootStyle">
    <div class="col" v-for="colIndex in col" :key="colIndex" :style="colStyle">
      <template v-for="(album, albumIndex) in albums">
        <ImagePreview
          class="image-preview"
          :album="album"
          @click="onAlbumClicked(album.id)"
          v-if="getDisplayable(colIndex, albumIndex)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('./MasonryImageStream.css');
</style>
