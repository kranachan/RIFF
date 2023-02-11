<script setup lang="ts">
import Icon from '@/components/icon/index.vue'
import Polygon from '@/assets/icons/polygon.svg?component'
</script>

<template>
  <div class="sticky-wrapper">
    <slot />
    <div class="sticky-tips">
      <div class="icon"><Icon name="PlusSquare" /></div>
      <div class="text">add-photo</div>
      <Polygon class="arrow" />
    </div>
  </div>
</template>

<style scoped>
@import url('./index.css');
</style>
