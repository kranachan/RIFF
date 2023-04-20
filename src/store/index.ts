import { useAlbumStore } from './album'
import { useAppStore } from './app'
import { useUserStore } from './user'

export const useStore = () => ({
  app: useAppStore(),
  albumStore: useAlbumStore(),
  userStore: useUserStore(),
})
