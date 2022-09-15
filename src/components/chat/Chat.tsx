import { PropsWithChildren, useState } from 'react'
import styles from './Chat.module.scss'

export enum MessageDirection {
  'FROM_ME',
  'FROM_OTHERS'
}

export interface ChatModel {
  direction: MessageDirection,
  senderName: string,
  timeStamp: number,
  message: string
}

const Chat: React.FC<PropsWithChildren<ChatModel>> = ({ direction, senderName, timeStamp, message }) => {
  const date = new Date(timeStamp)
  const today = new Date().setHours(0, 0, 0, 0)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  const formattedTime = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)
  const formattedDate = today === new Date(timeStamp).setHours(0, 0, 0, 0) ? formattedTime : `${year}-${month + 1}-${day} ${formattedTime}`

  const [showTimeStamp, setShowTimeStamp] = useState(false)

  return (
    <div className={styles.chat}>
      <div className={styles['chat__title'] + ' ' + (direction === MessageDirection.FROM_ME && styles['chat__title--right'])}>{senderName}</div>
      <p
        className={direction === MessageDirection.FROM_ME ? styles['chat_from-me'] : styles['chat_from-others']}
        onClick={setShowTimeStamp.bind(this, !showTimeStamp)}
      >{message}</p>
      {
        showTimeStamp && (
          <div className={styles['chat__foot'] + ' ' + (direction === MessageDirection.FROM_ME && styles['chat__foot--right'])}>{formattedDate}</div>
        )}
    </div>
  )
}

export default Chat