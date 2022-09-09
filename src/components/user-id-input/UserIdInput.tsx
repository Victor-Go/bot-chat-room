import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../reducers/users';
import './UserIdInput.scss'

const mapStateToProps = (state: any) => ({
  username: state.users.username
})
const mapDispatchToProps = { login }

function UserIdInput() {
  const [userId, setUserId] = useState('')
  const nav = useNavigate()
  const dispatch = useDispatch()

  const goToChatRoom = () => {
    if (userId.length > 0) {
      dispatch(login(userId))
      nav('/chat-room')
    }
  }

  return (
    <div className='username-input'>
      <p>Enter your User ID</p>
      <div className='username-input__container'>
        <input maxLength={15} value={userId} onChange={(e) => setUserId(e.target.value.trim())} />
        <div onClick={goToChatRoom}>Go!</div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInput)