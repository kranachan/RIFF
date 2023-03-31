<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import { gsap } from 'gsap'

defineProps<{
  /**
   * TODO: add post information
   */
  source: string
  liked: boolean
}>()

const onLikeClicked = (e: MouseEvent) => {
  /**
   * TODO: add toggle event
   */
  gsap.fromTo(
    e.target,
    { scale: 0.25, rotate: 45 },
    {
      scale: 1,
      rotate: 0,
      ease: 'elastic',
      duration: 0.8,
    },
  )
}
</script>

<template>
  <div>
    <img class="image" v-lazy="source" />
    <button class="action-like" @click="onLikeClicked">
      <Icon :class="liked && 'liked'" name="Heart" />
    </button>
  </div>
</template>

<style scoped>
@import url('./ImagePreview.css');
</style>
