import { Self } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useAppStore = defineStore('app', () => {
  const self = ref<Self>()
  const isLoggedIn = computed(() => !!self.value)
  return { self, isLoggedIn }
})

export { useAppStore }
