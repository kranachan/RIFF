export interface User {
  id: string
  email: string
  username: string
  name: string
  avatar?: string
  banner?: string
  createdAt: Date
  following: string[]
  follower: string[]
}
