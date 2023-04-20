import { useAlbumStore } from './album'
import { useAppStore } from './app'

export const useStore = () => ({
  app: useAppStore(),
  albumStore: useAlbumStore(),
})
