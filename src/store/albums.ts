import { AlbumApi } from '@/api/album'
import { Album } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlbumsStore = defineStore('albums', () => {
  const data = ref<Album[]>()

  const fetchRecommendedAlbums = async () => {
    try {
      data.value = await AlbumApi.getRecommends()
    } catch (error) {
      console.warn(error)
    }
  }

  return {
    state: { data },
    actions: {
      fetchRecommendedAlbums,
    },
  }
})
