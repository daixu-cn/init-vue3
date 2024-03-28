export interface UserInfo {
  userId: string
  userName: string
}

export interface State {
  info: UserInfo | null
  token: string | null
}
