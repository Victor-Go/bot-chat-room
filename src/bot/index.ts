import { BOT_NAMES, BOT_ANSWERS, RANDOM_TALK } from './config'
import { User, UserStatus } from '../types/user';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

export const generateRandomBotStatus = (botList: User[]) => (
  botList.map(bot => ({
    ...bot,
    status: [UserStatus.ONLINE, UserStatus.AWAY, UserStatus.PLAYING][randomNumber(0, 2)]
  }))
)

export const getRandomTalk = (botList: User[]) => {
  const onlineBotIndex = botList.map((bot, index) => bot.status === UserStatus.ONLINE ? index : false);

  if (onlineBotIndex.length > 0) {
    const selectedBotIndex = randomNumber(0, onlineBotIndex.length - 1);
    const selectedTalkIndex = randomNumber(0, RANDOM_TALK.length - 1);
    const sender = botList[selectedBotIndex].username;
    const message = RANDOM_TALK[selectedTalkIndex];

    return {
      sender,
      message
    };
  }
}