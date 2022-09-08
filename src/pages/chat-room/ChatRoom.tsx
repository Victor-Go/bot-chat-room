import ChatBox from '../../components/chat-box/ChatBox'
import TitleBar from '../../components/title-bar/TitleBar'
import UserList from '../../components/user-list/UserList'
import './ChatRoom.scss'

function ChatRoom() {
  return (
    <div className='chat-room'>
      <TitleBar />
      <div className='chat-container'>
        <UserList />
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatRoom