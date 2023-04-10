import { Album } from '@/models/album'
import { createHeadersWithToken } from '@/utils'
import { HttpStatic } from '..'

class AlbumInstance {
  get root() {
    return new HttpStatic('album')
  }

  create = async (
    token: string,
    authorId: string,
    content: {
      image: string
      plain: string
    },
  ): Promise<Album> => {
    const headers = createHeadersWithToken(token)
    const resp = await this.root.entry('/create').post<Album>(
      {
        authorId,
        content,
      },
      { headers },
    )
    return resp.data
  }

  upload = async (token: string, formData: FormData): Promise<string[]> => {
    const headers = createHeadersWithToken(token, {
      'Content-Type': 'multipart/form-data;',
    })
    const resp = await this.root
      .entry('/upload')
      .post<string[]>(formData, { headers })
    return resp.data
  }
}

export const AlbumApi = new AlbumInstance()
