import { useAlbumsStore } from './albums'
import { useAppStore } from './app'

export const useStore = () => ({
  app: useAppStore(),
  albums: useAlbumsStore(),
})
