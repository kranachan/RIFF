import { User } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useAppStore = defineStore('app', () => {
  const self = ref<User>().value
  const isLoggedIn = computed(() => !!self)
  return { self, isLoggedIn }
})

export { useAppStore }
