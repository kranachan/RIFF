import { AlbumApi } from '@/api/album'
import { Album } from '@/models'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albumList: [] as Album[],
    recommendedAlbumList: [] as Album[],
  }),
  getters: {
    getAlbumById: (state) => {
      return (albumId: string): Album | undefined =>
        state.albumList.find((item) => item.id === albumId)
    },
  },
  actions: {
    async fetchAlbumById(id: string): Promise<Album> {
      const foundedAlbum = this.getAlbumById(id)
      if (foundedAlbum) {
        return foundedAlbum
      }
      const userStore = useUserStore()
      const response = await AlbumApi.getAlbumById(id)
      await userStore.fetchUserById(response.authorId)
      this.$patch((state) => {
        state.albumList.push(response)
      })
      return response
    },
    async fetchRecommendedAlbums(): Promise<Album[]> {
      const response = await AlbumApi.getRecommends()
      const userStore = useUserStore()
      for (const album of response) {
        await userStore.fetchUserById(album.authorId)
        this.$patch((state) => {
          state.recommendedAlbumList.push(album)
          if (!state.albumList.some((item) => item.id === album.id)) {
            state.albumList.push(album)
          }
        })
      }
      return response
    },
  },
})
