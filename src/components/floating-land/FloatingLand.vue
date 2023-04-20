<script setup lang="ts"></script>

<template>
  <div
    class="root"
    v-motion
    :initial="{ bottom: -200 }"
    :enter="{ bottom: 5, transition: { duration: 500 } }"
  >
    <slot />
  </div>
</template>

<style scoped>
@import url('./FloatingLand.css');
</style>
