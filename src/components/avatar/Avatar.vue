<script setup lang="ts">
import DeafultAvatar from '@/assets/images/default-avatar.png?url'

const { source, size } = withDefaults(
  defineProps<{
    source?: string | null
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
  <img class="avatar" :src="source ?? DeafultAvatar" :style="style" />
</template>

<style scoped>
@import url('./Avatar.css');
</style>
