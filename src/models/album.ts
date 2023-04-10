export interface Album {
  id: string
  authorId: string
  content: {
    image: string
    plain: string
  }
  liked: boolean
  likedCount: number
  comments: string[]
  commentCount: number
  createdAt: Date
  updatedAt: Date
}
