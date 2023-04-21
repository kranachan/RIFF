<script setup lang="ts">
import Drawer from '../drawer/Drawer.vue'
import BannerPng from '@/assets/images/menu-drawer-banner.png'
import BannerWebp from '@/assets/images/menu-drawer-banner.webp'
import Picture from '../picture/Picture.vue'
import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'
import Divider from '../divider/Divider.vue'
import { ColorScheme } from '@/constants'
import { applyTheme, defaultTheme } from '@/theme'
import { useStore } from '@/store'
import { setLocalStorage } from '@/utils'
import { computed } from '@vue/reactivity'
import { getUserDeviceColorScheme } from '@/theme'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { app } = useStore()

const colorScheme = computed(() => app.themeOptions.scheme)
const deviceScheme = computed(() => app.themeOptions.deviceScheme)
const isAutoScheme = computed(() => colorScheme.value === ColorScheme.Auto)
const isLightScheme = computed(() => colorScheme.value === ColorScheme.Light)
const isLightDeviceScheme = computed(
  () => isAutoScheme.value && deviceScheme.value === ColorScheme.Light,
)

const setColorScheme = async (
  schemeToStore: ColorScheme,
  schemeToApply: ColorScheme.Light | ColorScheme.Dark,
) => {
  app.actions.patchColorScheme(schemeToStore)
  await setLocalStorage('themeOptions', { scheme: schemeToStore })
  applyTheme(defaultTheme, schemeToApply)
}

const toggleAutoScheme = async () => {
  if (isAutoScheme.value) {
    await setColorScheme(ColorScheme.Light, ColorScheme.Light)
    return
  }
  app.actions.patchDeviceColorScheme(getUserDeviceColorScheme())
  await setColorScheme(ColorScheme.Auto, getUserDeviceColorScheme())
}

const toggleColorScheme = async () => {
  if (isAutoScheme.value) {
    return
  }
  const schemeToApply = isLightScheme.value
    ? ColorScheme.Dark
    : ColorScheme.Light

  await setColorScheme(schemeToApply, schemeToApply)
}
</script>

<template>
  <Drawer :open="open" @close="() => emit('close')">
    <Picture :pngSource="BannerPng" :webpSource="BannerWebp" />
    <section class="p-4">
      <span class="font-semibold">Romantic Creation</span>
      <Button class="mt-4">New Album</Button>
    </section>
    <section class="feats">
      <button><Icon name="Crown" />Rank</button>
      <Divider />
      <button @click="toggleColorScheme" :disabled="isAutoScheme">
        <Icon :name="isLightScheme || isLightDeviceScheme ? 'Sun' : 'Moon'" />
        {{ isLightScheme || isLightDeviceScheme ? 'Light Mode' : 'Dark Mode' }}
        <span
          :class="['auto', isAutoScheme && 'is-auto-scheme']"
          @click.stop="toggleAutoScheme"
        >
          auto
        </span>
      </button>
      <Divider />
      <button><Icon name="Info" />About RIFF</button>
    </section>
  </Drawer>
</template>

<style scoped>
@import url('./MenuDrawer.css');
</style>
