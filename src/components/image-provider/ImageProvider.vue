<script setup lang="ts">
defineProps<{
  url?: string
  ripple?: boolean
}>()
</script>

<template>
  <div
    class="image"
    v-wave="ripple ?? false"
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
