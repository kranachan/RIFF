<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

const floatingAnim = gsap.timeline()

onMounted(() => {
  floatingAnim
    .fromTo('.root', { bottom: -200 }, { bottom: 5, duration: 0.8 })
    .to('.root', { bottom: 0, ease: 'elastic' })
})
</script>

<template>
  <div class="root">
    <slot />
  </div>
</template>

<style scoped>
@import url('./FloatingLand.css');
</style>
