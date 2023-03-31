<script setup lang="ts">
import { withDefaults } from 'vue'
import Icon from '@/components/icon/Icon.vue'
import Polygon from '@/assets/icons/polygon.svg?component'

const props = withDefaults(
  defineProps<{
    title: string
    icon?: string
  }>(),
  {
    icon: '',
  },
)
</script>

<template>
  <div class="sticky-wrapper">
    <slot />
    <div class="sticky-tips">
      <div class="icon" v-if="icon"><Icon :name="props.icon" /></div>
      <div class="text">{{ props.title }}</div>
      <Polygon class="arrow" />
    </div>
  </div>
</template>

<style scoped>
@import url('./StickyTips.css');
</style>
