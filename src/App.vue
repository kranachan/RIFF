<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { StarportCarrier } from 'vue-starport'
import { ColorScheme } from '@/constants'
import { getLocalStorage, validateToken } from '@/utils'
import {
  applyTheme,
  defaultTheme,
  getUserDeviceColorScheme,
} from '@/theme/index'
import { AuthApi } from './api/auth'
import { useStore } from './store'
import { Toaster } from 'vue-sonner'

const { app } = useStore()

watchEffect(async () => {
  const storedThemeOptions = await getLocalStorage('themeOptions')
  const storedColorScheme = storedThemeOptions?.scheme ?? ColorScheme.Auto
  const isAutoScheme = storedColorScheme === ColorScheme.Auto
  const schemeToApply = isAutoScheme
    ? getUserDeviceColorScheme()
    : storedColorScheme

  app.actions.patchColorScheme(storedColorScheme)
  applyTheme(defaultTheme, schemeToApply)
})

const watchDeviceColorScheme = () => {
  const handleChanged = (e: MediaQueryListEvent) => {
    const isDarkScheme = e.matches
    const schemeToApply = isDarkScheme ? ColorScheme.Dark : ColorScheme.Light
    app.actions.patchDeviceColorScheme(schemeToApply)
    if (app.state.themeOptions.scheme === ColorScheme.Auto) {
      applyTheme(defaultTheme, schemeToApply)
    }
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', handleChanged)
}

const loginByToken = async () => {
  const isValidToken = await validateToken()
  if (!isValidToken) {
    return
  }
  try {
  const self = await AuthApi.loginByToken()
    app.state.self = self
  } catch (error) {
    console.warn(error)
  }
}

onMounted(async () => {
  app.actions.patchDeviceColorScheme(getUserDeviceColorScheme())
  watchDeviceColorScheme()
  await loginByToken()
})
</script>

<template>
  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
  <Toaster position="top-center" />
</template>
