<script setup lang="ts">
import { reactive, ref, Transition, withDefaults } from 'vue'
import Icon from '@/components/icon/index.vue'
import Divider from '@/components/divider/index.vue'

/**
 * Todo: fix drawer offset when focus on a input for firefox
 */

type ChangeType = 'full' | 'half' | 'hide'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    withOverlay?: boolean
  }>(),
  {
    withOverlay: true,
  },
)

const emits = defineEmits<{
  (e: 'close'): void
}>()

const VIEWPORT_HEIGHT = window.innerHeight
const DEFAULT_HEIGHT = VIEWPORT_HEIGHT * 0.6
const TOLERANCE_TOP_SIZE = 120
const TOLERANCE_BOTTOM_SIZE = 140
const TIME_INTERVAL = 200

const drawerRef = ref<HTMLDivElement>()
const containerRef = ref<HTMLDivElement>()

const state = reactive<{
  touchStarted: boolean
  startY: number
  currentHeight: number
  status: ChangeType
  lastTouchTimeStamp: number
  scrollMode: boolean
}>({
  touchStarted: false,
  startY: 0,
  currentHeight: DEFAULT_HEIGHT,
  status: 'half',
  lastTouchTimeStamp: 0,
  scrollMode: false,
})

const handleTouchStart = (evt: TouchEvent) => {
  const { clientY } = evt.changedTouches[0]
  const drawer = drawerRef.value
  const container = containerRef.value
  const interval = evt.timeStamp - state.lastTouchTimeStamp

  if (container) {
    state.scrollMode = state.status === 'full' && container.scrollTop > 0
  }

  if (interval > TIME_INTERVAL && drawer) {
    const { height } = drawer.getBoundingClientRect()

    state.currentHeight = height
    state.touchStarted = true
    state.startY = clientY
  }
}

const handleTouchMove = (evt: TouchEvent) => {
  const { clientY } = evt.changedTouches[0]
  const drawer = drawerRef.value
  const container = containerRef.value
  const diffY = state.startY - clientY

  if (state.touchStarted && drawer && container) {
    const h = +state.currentHeight + diffY
    const direction = diffY >= 0 ? 'top' : 'bottom'

    if ((state.status === 'full' && direction === 'top') || state.scrollMode) {
      return
    }

    drawer.style.height = Math.min(h, VIEWPORT_HEIGHT) + 'px'
  }

  evt.preventDefault()
}

const handleTouchEnd = (evt: TouchEvent) => {
  const { clientY } = evt.changedTouches[0]
  const drawer = drawerRef.value
  const diffY = clientY - state.startY

  if (state.touchStarted && !state.scrollMode && drawer) {
    let type = state.status
    if (diffY < -TOLERANCE_TOP_SIZE) {
      // move top and satisfy
      type = 'full'
    } else if (diffY > TOLERANCE_BOTTOM_SIZE) {
      // move bottom and satisfy
      type = state.status === 'full' ? 'half' : 'hide'
    }

    changeStatus(type)
    state.touchStarted = false
  }
  state.lastTouchTimeStamp = +evt.timeStamp
}

const handleTouchCancel = (evt: TouchEvent) => {
  state.lastTouchTimeStamp = +evt.timeStamp
}

const changeStatus = (type: ChangeType) => {
  let h = DEFAULT_HEIGHT
  switch (type) {
    case 'full':
      h = VIEWPORT_HEIGHT
      break
    case 'half':
      h = DEFAULT_HEIGHT
      break
    case 'hide':
      handleClose()
      break
  }
  const drawer = drawerRef.value
  if (drawer) {
    drawer.style.transition = 'all .25s ease'
    drawer.style.height = h + 'px'

    let timer: NodeJS.Timeout | null = null
    timer = setTimeout(() => {
      timer && clearTimeout(timer)
      drawer.style.transition = ''
    }, TIME_INTERVAL)
    state.status = type
  }
}

const handleClose = () => {
  emits('close')
}
</script>

<template>
  <Transition name="popup">
    <div
      class="drawer"
      ref="drawerRef"
      :style="{ height: state.currentHeight + 'px' }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel"
      v-show="props.open"
    >
      <div class="drawer-header">
        <div class="drawer-touch" />
        <div class="drawer-title" v-if="props.title">{{ props.title }}</div>
      </div>
      <div class="drawer-close" @click="handleClose" v-if="props.title">
        <Icon name="X" />
      </div>
      <Divider v-if="props.title" />
      <div class="drawer-container" ref="containerRef">
        <slot />
      </div>
    </div>
  </Transition>
  <Transition name="mask">
    <div class="overlay" v-show="props.open && props.withOverlay" />
  </Transition>
</template>

<style scoped>
@import url('./index.css');
</style>
