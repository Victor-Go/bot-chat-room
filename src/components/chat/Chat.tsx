import { PropsWithChildren, useState } from 'react'
import { getFormattedDate } from '../../utils/utils'
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
  const formattedDate = getFormattedDate(timeStamp)

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