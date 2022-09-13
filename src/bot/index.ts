import { BOT_NAMES, BOT_ANSWERS, RANDOM_TALK } from './config'
import { User, UserStatus } from '../types/user'
import { sprintf } from 'sprintf-js'
import { store } from '../store'
import { randomNumber } from '../utils/utils'

export const getMentioned = (message: string) => {
  const regex = /@(\w+)\s/g
  let execArray
  const results = []

  do {
    execArray = regex.exec(message)
    if (execArray) {
      results.push(execArray[1])
    }
  } while (execArray)
  return [...new Set(results)]
}

export const isCurrentUser = (senderId: string) => {
  const userId: string = store.getState().users.userId
  return userId === senderId
}

export const getBotUsername = (userId: string) => {
  const botList: User[] = store.getState().users.userList
  const bot = botList.find(bot => bot.userId === userId)
  return bot ? bot.username : 'unknown'
}

export const generateBot = () => (
  BOT_NAMES.map(bot => {
    const { username, userId } = bot
    return {
      username,
      userId,
      avatarUrl: `https://robohash.org/${userId.replaceAll('@', '')}.png`,
      status: UserStatus.ONLINE
    }
  })
)

export const generateRandomBotStatus = (userList: User[]) => (
  userList
    .map(user => ({
      ...user,
      status: [UserStatus.ONLINE, UserStatus.AWAY, UserStatus.PLAYING][randomNumber(0, 2)]
    }))
)

export const getAnswer = (answers: string[], ...args: string[]) => {
  return sprintf(answers[randomNumber(0, answers.length - 1)], ...args)
}

export const getStatusAnswer = (status: UserStatus, ...args: string[]) => {
  const answers = BOT_ANSWERS[status].map(({ message }) => message)
  return getAnswer(answers, ...args)
}

export const getRandomTalk = (...args: string[]) => {
  return getAnswer(RANDOM_TALK, ...args)
}