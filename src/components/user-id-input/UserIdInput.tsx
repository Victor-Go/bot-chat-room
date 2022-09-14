import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearMessage } from '../../reducers/chatRoom'
import { login } from '../../reducers/users'
import styles from './UserIdInput.module.scss'

type UserIdInputProps = {
  username: string
}

const mapStateToProps = (state: any) => ({
  username: state.users.username
})
const mapDispatchToProps = { login }

const UserIdInput: React.FC<UserIdInputProps> = () => {
  const [userId, setUserId] = useState('')
  const nav = useNavigate()
  const dispatch = useDispatch()

  const goToChatRoom = () => {
    if (userId.length > 0) {
      dispatch(clearMessage())
      dispatch(login(userId))
      nav('/chat-room')
    }
  }

  return (
    <div className={styles['username-input']}>
      <p>Enter your User ID</p>
      <div className={styles['username-input__container']}>
        <input
          autoFocus
          maxLength={15}
          value={userId}
          onChange={({ target }) => setUserId(target.value && !target.value[0].match(/[0-9\s_]/) ? target.value.replaceAll(' ', '_').replaceAll(/[^a-zA-Z0-9_]/gi, '') : '')}
          onKeyDown={({ key }) => { if (key === 'Enter') goToChatRoom() }}
        />
        <div onClick={goToChatRoom}>Go!</div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInput)