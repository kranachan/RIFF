export interface SignInSet {
  email?: string
  password?: string
}

export interface SignUpSet extends SignInSet {
  username?: string
  code?: string
}
