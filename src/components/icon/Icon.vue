<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import * as icons from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
    strokeWidth?: number
    defaultClass?: string
  }>(),
  {
    size: 24,
    color: 'currentColor',
    strokeWidth: 2,
    defaultClass: 'lucide-icon',
  },
)

const icon = computed(
  () => (icons as { [key: string]: icons.Icon })[props.name],
)
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>
