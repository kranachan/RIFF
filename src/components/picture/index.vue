<script setup lang="ts">
defineProps<{
  pngSource?: string
  jpgSource?: string
  webpSource?: string
}>()
</script>

<template>
  <picture>
    <source v-if="webpSource" :srcset="webpSource" />
    <source v-if="pngSource" :srcset="pngSource" />
    <source v-if="jpgSource" :srcset="jpgSource" />
    <img :src="pngSource ?? jpgSource" />
  </picture>
</template>

<style scoped>
@import url('./index.css');
</style>
