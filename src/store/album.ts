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
      return (albumId: string) =>
        state.albumList.find((item) => item.id === albumId)
    },
  },
  actions: {
    async fetchAlbumById(id: string) {
      const album = this.getAlbumById(id)
      const userStore = useUserStore()
      if (!album) {
        const resp = await AlbumApi.getAlbumById(id)
        await userStore.fetchUserById(resp.authorId)
        this.$patch((state) => {
          state.albumList.push(resp)
        })
      }
    },
    async fetchRecommendedAlbums(): Promise<Album[]> {
      const resp = await AlbumApi.getRecommends()
      const userStore = useUserStore()
      resp.forEach(async (album) => {
        await userStore.fetchUserById(album.authorId)
      })
      this.$patch((state) => {
        state.recommendedAlbumList.push(...resp)
        state.albumList.push(
          ...resp.filter((item) => !state.albumList.includes(item)),
        )
      })
      return resp
    },
  },
})
