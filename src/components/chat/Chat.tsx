import styles from './Chat.module.scss'

export enum MessageDirection {
  'FROM_ME',
  'FROM_OTHERS'
}

export type ChatModel = {
  direction: MessageDirection,
  senderName: string,
  timeStamp: number,
  message: string
}

const Chat: React.FC<Omit<ChatModel, 'timeStamp'>> = ({ direction, senderName, message }) => {
  return (
    <div className={styles.chat}>
      <div className={styles['chat__title'] + ' ' + (direction === MessageDirection.FROM_ME ? styles['chat__title--right'] : '')}>{senderName}</div>
      <p className={direction === MessageDirection.FROM_ME ? styles['chat_from-me'] : styles['chat_from-others']}>{message}</p>
    </div>
  )
}

export default Chat