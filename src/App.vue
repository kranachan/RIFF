<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ColorScheme } from '@/constants/theme'
import { applyTheme, defaultTheme } from '@/theme/index'

onMounted(() => {
  applyTheme(defaultTheme, ColorScheme.Light)
})
</script>

<template>
  <RouterView />
</template>
