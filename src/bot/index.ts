import { BOT_NAMES, BOT_ANSWERS, RANDOM_TALK } from './config'
import { User, UserStatus } from '../types/user';
import { Message } from '../types/message';
import { store } from '../store';
import { randomNumber } from '../utils/utils';

export const getMentioned = (message: string) => {
  const regex = /@(\w+)\s/g
  let execArray, results = []

  do {
    execArray = regex.exec(message);
    if (execArray) {
      results.push(execArray[1])
    }
  } while (execArray);
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
    const { username, userId } = bot;
    return {
      username,
      userId,
      avatarUrl: `https://robohash.org/${userId.replace('@', '')}.png`,
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

export const getRandomTalk = (userList: User[]) => {
  const onlineBotIndex = userList.map((bot, index) => bot.status === UserStatus.ONLINE ? index : false);

  if (onlineBotIndex.length > 0) {
    const selectedBotIndex = randomNumber(0, onlineBotIndex.length - 1);
    const selectedTalkIndex = randomNumber(0, RANDOM_TALK.length - 1);
    const sender = userList[selectedBotIndex].username;
    const message = RANDOM_TALK[selectedTalkIndex];

    return {
      sender,
      message
    };
  }
}

export const handleMessage = (message: Message) => {
  const users: User[] = store.getState().users.userList
  const mentioned = getMentioned(message.message)

  if (users.find((bot: User) => mentioned.indexOf(bot.userId) < 0)) {
    return
  }
}