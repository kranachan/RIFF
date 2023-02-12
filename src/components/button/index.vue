<script setup lang="ts">
import { withDefaults } from 'vue'

type Variant = 'primary' | 'outline' | 'disabled'

const props = withDefaults(
  defineProps<{
    variant: Variant
  }>(),
  {
    variant: 'primary',
  },
)
</script>

<template>
  <button
    class="button"
    :class="props.variant"
    :disabled="props.variant === 'disabled'"
  >
    <slot />
  </button>
</template>

<style scoped>
@import url('./index.css');
</style>
