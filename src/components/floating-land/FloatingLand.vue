<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { gsap } from 'gsap'

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  { show: true },
)

const floatingAnim = gsap.timeline()

const handleToggle = () => {
  if (props.show) {
    floatingAnim
      .fromTo(
        '.root',
        { display: 'flex', bottom: -200 },
        { bottom: 5, duration: 0.8 },
      )
      .to('.root', { bottom: 0, ease: 'elastic' })
  } else {
    floatingAnim.fromTo(
      '.root',
      { bottom: 0 },
      { display: 'none', bottom: -200, duration: 0.8 },
    )
  }
}

onMounted(() => {
  handleToggle()
})

watch(
  () => props.show,
  () => {
    handleToggle()
  },
)
</script>

<template>
  <div class="root">
    <slot />
  </div>
</template>

<style scoped>
@import url('./FloatingLand.css');
</style>
