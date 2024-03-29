export interface User {
  id: string
  username: string
  name: string
  avatar: string | null
  banner: string | null
  bio: string | null
  following?: boolean
  followedBy?: boolean
  followingCount: number
  followerCount: number
  albumCount: number
  createdAt: Date
}

export interface Self extends Omit<User, 'following' | 'followedBy'> {
  email: string
}

export interface SelfWithToken extends Self {
  token: string
}
