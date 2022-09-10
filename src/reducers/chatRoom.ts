import { getBotUsername, isBot } from '../bot'
import { ChatModel, MessageDirection } from '../components/chat/Chat'
import { Message } from '../types/message'

export const ON_NEW_MESSAGE = 'chats/ON_NEW_MESSAGE'
export const CLEAR_MESSAGE = 'chats/CLEAR_MESSAGE'

export const ON_INPUT_CHANGE = 'chats/ON_INPUT_CHANGE'
export const ON_MENTION = 'chats/ON_MENTION'

type ChatRoomState = {
  chats: ChatModel[],
  messageInput: string,
}

const initialState: ChatRoomState = {
  chats: [],
  messageInput: ''
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_NEW_MESSAGE:
      return {
        ...state,
        chats: [...state.chats, action.chat],
        messageInput: action.chat.direction === MessageDirection.FROM_ME ? '' : state.messageInput
      }
    case ON_INPUT_CHANGE:
      return {
        ...state,
        messageInput: action.input
      }
    case ON_MENTION:
      return {
        ...state,
        messageInput: `${state.messageInput}@${action.userId} `
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        chats: [],
        messageInput: ''
      }
    default:
      return state
  }
}

const getSenderName = (userId: string) => {
  const isBotUser = isBot(userId)
  if (isBotUser) {
    return getBotUsername(userId) || 'unknown'
  }
  return userId.replace('_', ' ')
}

export const newMessage = (message: Message) => {
  const chat: ChatModel = {
    direction: isBot(message.fromId) ? MessageDirection.FROM_OTHERS : MessageDirection.FROM_ME,
    sender: getSenderName(message.fromId),
    timeStamp: message.timeStamp || Date.now(),
    message: message.message
  }

  return {
    chat,
    type: ON_NEW_MESSAGE,
  }
}

export const onMessageInputChange = (input: string) =>
({
  type: ON_INPUT_CHANGE,
  input
})


export const onMention = (userId: string) => {
  return ({
    type: ON_MENTION,
    userId
  })
}

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
})