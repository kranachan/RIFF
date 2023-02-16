<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sliderRef = ref<HTMLDivElement>()
const showMask = ref(false)

const handleMask = () => {
  if (sliderRef.value) {
    const { scrollWidth, scrollLeft, offsetWidth } = sliderRef.value

    showMask.value = scrollLeft + offsetWidth < scrollWidth
  }
}

onMounted(() => {
  handleMask()
})
</script>

<template>
  <div class="list">
    <div class="list-slider" ref="sliderRef" @scroll="handleMask">
      <div class="list-wrapper">
        <slot />
      </div>
    </div>
    <div class="mask" v-show="showMask" />
  </div>
</template>

<style scoped>
@import url('./index.css');
</style>
