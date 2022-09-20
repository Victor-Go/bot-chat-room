import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getMentioned, getRandomTalk, getStatusAnswer } from '../bot'
import events from '../components/events'
import { newMessage } from '../reducers/chatRoom'
import { refreshBotStatus } from '../reducers/users'
import { BotSettings } from '../settings/bot'
import { User, UserStatus } from '../types/user'
import { randomNumber } from '../utils/utils'

export default (botList: User[], userId: string) => {
  const isInitialRender = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    function randomTalk() {
      const onlineBotList = botList.filter(bot => bot.status === UserStatus.ONLINE)
      if (onlineBotList.length > 0) {
        const bot = onlineBotList[randomNumber(0, onlineBotList.length - 1)]
        dispatch(newMessage({
          fromId: bot.userId,
          message: getRandomTalk(userId)
        }))
      }
    }

    function handleUserMessage({ detail }: any) {
      const mentioned = getMentioned(detail.message)
      mentioned.forEach(botId => {
        const bot = botList.find(bot => bot.userId === botId)
        if (bot) {
          const status: UserStatus = bot.status
          setTimeout(() => {
            dispatch(newMessage({
              fromId: botId,
              message: getStatusAnswer(status, userId)
            }))
          }, (Math.random() + 0.5) * BotSettings.botResponseDelayInSeconds * 1000)
        }
      })
    }

    const randomTalkInterval = setInterval(randomTalk, BotSettings.randomTalkIntervalInSeconds * 1000)

    const refreshStatusInterval = setInterval(() => {
      dispatch(refreshBotStatus())
    }, BotSettings.refreshBotStatusIntervalInSeconds * 1000)

    randomTalk()

    document.addEventListener(events.chat.ON_USER_MESSAGE, handleUserMessage)

    return () => {
      clearInterval(randomTalkInterval)
      clearInterval(refreshStatusInterval)
      document.removeEventListener(events.chat.ON_USER_MESSAGE, handleUserMessage)
    }
  }, [])
}