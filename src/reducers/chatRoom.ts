import { isBot } from '../bot'
import { ChatModel, MessageDirection } from '../components/chat/Chat'
import { Message } from '../types/message'

export const ON_NEW_MESSAGE = 'chats/ON_NEW_MESSAGE'
export const CLEAR_MESSAGE = 'chats/CLEAR_MESSAGE'

type ChatRoomState = {
  chats: ChatModel[]
}

const initialState: ChatRoomState = {
  chats: []
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_NEW_MESSAGE:
      return {
        ...state,
        chats: [...state.chats, action.chat]
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        chats: []
      }
    default: return state
  }
}

export const newMessage = (message: Message) => {
  const chat: ChatModel = {
    direction: isBot(message.fromId) ? MessageDirection.FROM_OTHERS : MessageDirection.FROM_ME,
    sender: message.fromId,
    timeStamp: message.timeStamp,
    message: message.message
  }

  return {
    chat,
    type: ON_NEW_MESSAGE,
  }
}

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
})