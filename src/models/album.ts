import { Image } from './media'

export interface Album {
  id: string
  authorId: string
  content: {
    image: Image
    plain: string
  }
  liked: boolean
  likedCount: number
  comments: string[]
  commentCount: number
  createdAt: Date
  updatedAt: Date
}
