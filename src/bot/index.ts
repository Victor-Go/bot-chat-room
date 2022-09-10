import { BOT_NAMES, BOT_ANSWERS, RANDOM_TALK } from './config'
import { User, UserStatus } from '../types/user';
import { Message } from '../types/message';
import { store } from '../store';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const findMentioned = (message: string) => {
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

export const isBot = (userId: string) => {
  const botList: User[] = store.getState().users.userList
  return !!botList.find(bot => bot.userId === userId)
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
    .sort((a, b) => {
      const order = [UserStatus.ONLINE, UserStatus.AWAY, UserStatus.PLAYING]
      return order.indexOf(a.status) - order.indexOf(b.status)
    })
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
  const mentioned = findMentioned(message.message)

  if (users.find((bot: User) => mentioned.indexOf(bot.userId) < 0)) {
    return
  }
}