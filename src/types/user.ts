enum UserStatus {
  'ONLINE' = 'Online',
  'AWAY' = 'Away',
  'PLAYING' = 'Playing'
}

export { UserStatus }

export type User = {
  userId: string,
  username: string,
  avatarUrl: string,
  status: UserStatus
}