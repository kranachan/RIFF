<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ColorScheme } from '@/constants/theme'
import { applyTheme, defaultTheme } from '@/theme/index'
import { AuthApi } from './api/auth'
import { useStore } from './store'
import { getLocalStorage } from './utils'
import { Toaster } from 'vue-sonner'

const { app } = useStore()

onMounted(async () => {
  applyTheme(defaultTheme, ColorScheme.Light)
  const token = await getLocalStorage('token')
  if (!token) {
    return
  }
  const self = await AuthApi.loginByToken(token)
  app.self = self
})
</script>

<template>
  <RouterView />
  <Toaster position="top-center" />
</template>
