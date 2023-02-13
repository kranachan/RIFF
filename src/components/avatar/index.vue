<script setup lang="ts">
const { source, size } = withDefaults(
  defineProps<{
    source: string | null
    size?: number
  }>(),
  {
    size: 40,
  },
)

const sizeWithUnit = `${size}px`
const style = { width: sizeWithUnit, height: sizeWithUnit }
</script>

<template>
  <img class="avatar" v-lazy="source" :style="style" />
</template>

<style scoped>
@import url('./index.css');
</style>
