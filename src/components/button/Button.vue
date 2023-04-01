<script setup lang="ts">
import { ButtonHTMLAttributes, toRefs, withDefaults } from 'vue'

type Variant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes {
  variant?: Variant
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
})

const { variant, disabled } = toRefs(props)
</script>

<template>
  <button
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
