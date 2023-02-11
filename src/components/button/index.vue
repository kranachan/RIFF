<script setup lang="ts">
import { ref, withDefaults } from 'vue'

type ButtonType = 'primary' | 'outline' | 'disabled'

const props = withDefaults(
  defineProps<{
    btnType: ButtonType
  }>(),
  {
    btnType: 'primary',
  },
)

const type = ref<ButtonType>('primary')
</script>

<template>
  <button
    class="button"
    :class="props.btnType"
    :disabled="props.btnType === 'disabled'"
  >
    <slot />
  </button>
</template>

<style scoped>
@import url('./index.css');
</style>
