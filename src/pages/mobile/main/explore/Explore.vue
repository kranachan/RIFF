<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import Logo from '@/assets/branding/logo.svg?component'
import MasonryImageStream from '@/components/masonry-image-stream/MasonryImageStream.vue'
import { onMounted } from 'vue'
import { useStore } from '@/store'
import { useCycleList } from '@vueuse/core'
import MenuDrawer from '@/components/menu-drawer/MenuDrawer.vue'

const { albumStore } = useStore()
const recommendedAlbums = albumStore.recommendedAlbumList

onMounted(async () => {
  if (albumStore.recommendedAlbumList.length === 0) {
    try {
      await albumStore.fetchRecommendedAlbums()
    } catch (error) {
      console.warn(error)
    }
  }
})

const { state: isDrawerOpened, next: toggleDrawerOpened } = useCycleList([
  false,
  true,
])
</script>

<template>
  <div class="header">
    <div class="header-fixed">
      <button class="header-button" @click="() => toggleDrawerOpened()">
        <Icon name="Menu" />
      </button>
      <div class="header-logo">
        <Logo />
      </div>
      <div class="header-right">
        <button class="header-button">
          <Icon name="Bell" /><span class="tips">2</span>
        </button>
        <button class="header-button"><Icon name="Search" /></button>
      </div>
    </div>
  </div>
  <MasonryImageStream :albums="recommendedAlbums ?? []" />
  <MenuDrawer :open="isDrawerOpened" @close="toggleDrawerOpened" />
</template>

<style scoped>
@import url('./Explore.css');
</style>
