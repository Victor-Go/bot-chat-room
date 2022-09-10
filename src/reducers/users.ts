import { generateBot, generateRandomBotStatus } from '../bot'

export const ON_USER_LOGIN = 'users/ON_USER_LOGIN'
export const ON_USER_LOGOUT = 'users/ON_USER_LOGOUT'
export const REFRESH_BOT = 'users/REFRESH_BOT'

const initialState = {
  userId: '',
  username: '',
  userList: generateRandomBotStatus(generateBot())
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_USER_LOGIN:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        userList: generateRandomBotStatus(generateBot())
      }
    case ON_USER_LOGOUT:
      return {
        ...state,
        userId: '',
        username: '',
        userList: []
      }
    case REFRESH_BOT:
      return {
        ...state,
        userList: generateRandomBotStatus(generateBot())
      }
    default: return state
  }
}

export const login = (userId: string) => {
  return {
    userId,
    username: userId,
    type: ON_USER_LOGIN
  }
}

export const logout = () => ({
  type: ON_USER_LOGOUT
})

export const refreshBot = () => ({
  type: REFRESH_BOT
})