import { HttpStatic } from '..'
import { Album } from '@/models'

class AlbumInstance {
  get root() {
    return new HttpStatic('album')
  }

  getRecommends = async (): Promise<Album[]> => {
    // TODO: add pagination
    const resp = await this.root.entry('/recommends').get<Album[]>()
    return resp.data
  }
}

export const AlbumApi = new AlbumInstance()
