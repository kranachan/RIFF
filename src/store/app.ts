import { ColorScheme, ThemeOptions } from '@/constants'
import { Self } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ComputedRef, reactive, ref } from 'vue'

const useAppStore = defineStore('app', () => {
  const self = ref<Self>()
  const isLoggedIn = computed(() => !!self.value)

  const themeOptions = reactive<ThemeOptions>({
    scheme: ColorScheme.Auto,
    deviceScheme: ColorScheme.Light,
  })

  const checkColorScheme = (
    scheme: ColorScheme.Light | ColorScheme.Dark,
  ): ComputedRef<boolean> => {
    return computed(() => {
      return (
        (isAutoScheme.value && themeOptions.deviceScheme === scheme) ||
        themeOptions.scheme === scheme
      )
    })
  }

  const isSelf = (userId?: string): boolean => {
    if (!userId || !isLoggedIn.value) {
      return false
    }

    return userId === self.value?.id
  }

  const isAutoScheme = computed(() => themeOptions.scheme === ColorScheme.Auto)
  const isLightScheme = checkColorScheme(ColorScheme.Light)
  const isDarkScheme = checkColorScheme(ColorScheme.Dark)

  const patchColorScheme = (scheme: ThemeOptions['scheme']) => {
    themeOptions.scheme = scheme
  }

  const patchDeviceColorScheme = (
    deviceScheme: ThemeOptions['deviceScheme'],
  ) => {
    themeOptions.deviceScheme = deviceScheme
  }

  const state = {
    self,
    isLoggedIn,
    themeOptions,
  }

  const getters = {
    isSelf,
    isAutoScheme,
    isLightScheme,
    isDarkScheme,
  }

  const actions = {
    patchColorScheme,
    patchDeviceColorScheme,
  }

  return {
    state,
    getters,
    actions,
  }
})

export { useAppStore }
