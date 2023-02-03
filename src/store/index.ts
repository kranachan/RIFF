import { useAppStore } from './app'

export const useStore = () => ({
  app: useAppStore(),
})
