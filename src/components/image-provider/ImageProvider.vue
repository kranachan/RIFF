<script setup lang="ts">
defineProps<{
  url?: string
}>()
</script>

<template>
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
      transition: { duration: 600 },
    }"
    :style="{
      backgroundImage: `url(${url})`,
    }"
  />
</template>

<style scoped>
@import url('./ImageProvider.css');
</style>
