import { generateBot, generateRandomBotStatus } from '../bot'

export const ON_USER_LOGIN = 'chat/ON_USER_LOGIN'
export const ON_USER_LOGOUT = 'chat/ON_USER_LOGOUT'
export const REFRESH_BOT = 'chat/REFRESH_BOT'

const initialState = {
  userId: '',
  username: '',
  botList: generateRandomBotStatus(generateBot())
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_USER_LOGIN:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        botList: generateRandomBotStatus(generateBot())
      }
    case ON_USER_LOGOUT:
      return {
        ...state,
        userId: '',
        username: '',
        botList: []
      }
    case REFRESH_BOT:
      return {
        ...state,
        botList: generateRandomBotStatus(generateBot())
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