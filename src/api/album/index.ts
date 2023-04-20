import { HttpStatic } from '..'
import { Album } from '@/models'

class AlbumInstance {
  get root() {
    return new HttpStatic('album')
  }

  getAlbumById = async (id: string): Promise<Album> => {
    const resp = await this.root.entry(`/${id}`).get<Album>()
    return resp.data
  }

  getRecommends = async (): Promise<Album[]> => {
    // TODO: add pagination
    const resp = await this.root.entry('/recommends').get<Album[]>()
    return resp.data
  }
}

export const AlbumApi = new AlbumInstance()
