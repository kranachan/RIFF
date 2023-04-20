<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { StarportCarrier } from 'vue-starport'
import { ColorScheme } from '@/constants/theme'
import { validateToken } from '@/utils'
import { applyTheme, defaultTheme } from '@/theme/index'
import { AuthApi } from './api/auth'
import { useStore } from './store'
import { Toaster } from 'vue-sonner'

const { app } = useStore()

onMounted(async () => {
  applyTheme(defaultTheme, ColorScheme.Light)
  const isValidToken = await validateToken()
  if (!isValidToken) {
    return
  }
  const self = await AuthApi.loginByToken()
  app.self = self
})
</script>

<template>
  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
  <Toaster position="top-center" />
</template>
