<script setup lang="ts">
import { ButtonHTMLAttributes, toRefs, withDefaults } from 'vue'

interface ButtonProps extends ButtonHTMLAttributes {
  variant?: 'primary' | 'outlined'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
})

const { variant, disabled } = toRefs(props)
</script>

<template>
  <button
    v-wave
    class="button"
    :class="[variant, disabled && 'disabled']"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
@import url('./Button.css');
</style>
