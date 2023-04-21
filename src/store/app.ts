import { ColorScheme, ThemeOptions } from '@/constants'
import { Self } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

const useAppStore = defineStore('app', () => {
  const self = ref<Self>()
  const isLoggedIn = computed(() => !!self.value)
  const themeOptions = reactive<ThemeOptions>({
    scheme: ColorScheme.Auto,
    deviceScheme: ColorScheme.Light,
  })

  const patchColorScheme = (scheme: ThemeOptions['scheme']) => {
    themeOptions.scheme = scheme
  }

  const patchDeviceColorScheme = (
    deviceScheme: ThemeOptions['deviceScheme'],
  ) => {
    themeOptions.deviceScheme = deviceScheme
  }

  const actions = {
    patchColorScheme,
    patchDeviceColorScheme,
  }

  return { self, isLoggedIn, themeOptions, actions }
})

export { useAppStore }
