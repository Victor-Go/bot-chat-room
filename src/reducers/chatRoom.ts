import { getBotUsername, isCurrentUser } from '../bot'
import { ChatModel, MessageDirection } from '../components/chat/Chat'
import events from '../components/events'
import { Message } from '../types/message'
import { store } from '../store'

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
    case ON_NEW_MESSAGE: {
      const chats = [action.chat, ...state.chats]
      return {
        ...state,
        chats,
        messageInput: action.chat.direction === MessageDirection.FROM_ME ? '' : state.messageInput
      }
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
  if (!isCurrentUser(userId)) {
    return getBotUsername(userId)
  }
  return store.getState().users.username
}

export const newMessage = (message: Message) => {
  const chat: ChatModel = {
    direction: isCurrentUser(message.fromId) ? MessageDirection.FROM_ME : MessageDirection.FROM_OTHERS,
    senderName: getSenderName(message.fromId),
    timeStamp: message.timeStamp || Date.now(),
    message: message.message
  }

  if (chat.direction === MessageDirection.FROM_ME) {
    document.dispatchEvent(new CustomEvent(events.chat.ON_USER_MESSAGE, { detail: { message: message.message } }))
  }
  document.dispatchEvent(new CustomEvent(events.chat.ON_MESSAGE, { detail: { message: message.message } }))

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
  document.dispatchEvent(new CustomEvent(events.chat.ON_USER_MENTION, { detail: { userId } }))

  return ({
    type: ON_MENTION,
    userId
  })
}

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
})