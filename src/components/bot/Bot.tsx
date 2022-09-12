import { useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import { BOT_ANSWERS, RANDOM_TALK } from "../../bot/config"
import { newMessage } from "../../reducers/chatRoom"
import { User, UserStatus } from "../../types/user"
import { randomNumber } from "../../utils/utils"
import { sprintf } from 'sprintf-js'
import { BotSettings } from "../../settings/bot"
import { refreshBotStatus } from "../../reducers/users"

type BotProps = {
  botList: User[],
  username: string
}
const mapStateToProps = (state: any) => ({
  botList: state.users.userList,
  username: state.users.username
})
const mapDispatchToProps = {
}
const Bot: React.FC<BotProps> = ({
  botList,
  username
}) => {
  const dispatch = useDispatch()
  const isInitialRender = useRef(true);

  function randomTalk() {
    const onlineBotList = botList.filter(bot => bot.status === UserStatus.ONLINE)
    if (onlineBotList.length > 0) {
      const bot = onlineBotList[randomNumber(0, onlineBotList.length - 1)]
      const answers = RANDOM_TALK
      const message = sprintf(answers[randomNumber(0, answers.length - 1)], username)
      dispatch(newMessage({
        fromId: bot.userId,
        message
      }))
    }
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const randomTalkInterval = setInterval(randomTalk, BotSettings.randomTalkIntervalInSeconds * 1000)

    const refreshStatusInterval = setInterval(() => {
      dispatch(refreshBotStatus())
    }, BotSettings.refreshBotStatusIntervalInSeconds * 1000)

    randomTalk()

    return () => {
      clearInterval(randomTalkInterval)
      clearInterval(refreshStatusInterval)
    }
  }, [])

  return (
    <></>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Bot)