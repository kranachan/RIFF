<script setup lang="ts">
import { useMotions } from '@vueuse/motion'
import { Transition } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const triggerClose = () => {
  emit('close')
}

const motions = useMotions()
</script>

<template>
  <transition
    :css="false"
    @leave="(el: HTMLElement, done: () => void) => motions.drawerOverlay.leave(done)"
  >
    <div
      v-if="open"
      class="overlay"
      @click="triggerClose"
      v-motion="`drawerOverlay`"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 0.7, transition: { duration: 400 } }"
      :leave="{ opacity: 0 }"
    />
  </transition>
  <transition
    :css="false"
    @leave="(el: HTMLElement, done: () => void) => motions.drawer.leave(done)"
  >
    <div
      class="drawer"
      v-if="open"
      v-motion="`drawer`"
      :initial="{ left: -240 }"
      :enter="{ left: 0, transition: { duration: 300 } }"
      :leave="{ left: -240 }"
    >
      <slot />
    </div>
  </transition>
</template>

<style scoped>
@import url('./Drawer.css');
</style>
