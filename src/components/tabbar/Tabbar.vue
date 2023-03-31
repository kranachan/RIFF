<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

defineProps<{
  list: { key: number; label: string }[]
  activeKey: number
}>()

const emit = defineEmits<{
  (e: 'change', key: number): void
}>()

const containerRef = ref<HTMLDivElement>()

const state = reactive({
  showLeftMask: false,
  showRightMask: false,
})

onMounted(() => {
  handleMask()
})

const handleMask = () => {
  if (containerRef.value) {
    const { scrollWidth, scrollLeft, offsetWidth } = containerRef.value

    state.showLeftMask = scrollLeft > 0
    state.showRightMask = scrollLeft + offsetWidth < scrollWidth
  }
}

const handleClickItem = (evt: MouseEvent, key: number) => {
  emit('change', key)

  autoPosition(evt.target as HTMLDivElement)
}

// auto position the selected item to the visible area
const autoPosition = (target: HTMLDivElement) => {
  const container = containerRef.value
  if (container) {
    const { x: itemX, width: itemWidth } = target.getBoundingClientRect()
    const containerWidth = container.offsetWidth
    const scrollX = container.scrollLeft
    const half = containerWidth / 2

    container.scrollTo({
      left: itemX - half + itemWidth / 2 + scrollX,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div class="tabbar">
    <div class="tabbar-container" ref="containerRef" @scroll="handleMask">
      <div class="tabbar-wrapper">
        <div
          class="tabbar-item"
          :class="item.key === activeKey ? 'active' : ''"
          v-for="item in list"
          :key="item.key"
          @click="(evt) => handleClickItem(evt, item.key)"
        >
          <span class="tabbar-item-label">{{ item.label }}</span>
          <div class="tabbar-item-bg" />
        </div>
      </div>
      <div class="tabbar-mask-left" v-show="state.showLeftMask" />
      <div class="tabbar-mask-right" v-show="state.showRightMask" />
    </div>
  </div>
</template>

<style scoped>
@import url('./Tabbar.css');
</style>
