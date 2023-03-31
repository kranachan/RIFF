export interface User {
  id: string
  username: string
  name: string
  avatar?: string
  banner?: string
  createdAt: Date
  following: string[]
  follower: string[]
}

export interface Self extends User {
  email: string
}

export interface SelfWithToken extends Self {
  token: string
}
