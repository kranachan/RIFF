export interface User {
  id: string
  username: string
  name: string
  avatar?: string
  banner?: string
  bio?: string
  following?: boolean
  followedBy?: boolean
  followingCount: number
  followerCount: number
  createdAt: Date
}

export interface Self extends Omit<User, 'following' | 'followedBy'> {
  email: string
}

export interface SelfWithToken extends Self {
  token: string
}
