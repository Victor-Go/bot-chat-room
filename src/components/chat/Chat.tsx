import './Chat.scss'

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
    <div className='chat'>
      <div className={'chat__title ' + (direction === MessageDirection.FROM_ME ? 'chat__title--right' : '')}>{senderName}</div>
      <p className={direction === MessageDirection.FROM_ME ? 'chat_from-me' : 'chat_from-others'}>{message}</p>
    </div>
  )
}

export default Chat