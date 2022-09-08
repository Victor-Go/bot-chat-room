import { User } from '../../types/user'
import './UserCard.scss'

// https://robohash.org/HelloWorld.png

const UserCard: React.FC<User> = ({ userId, username, avatarUrl, status }) => {
  return (
    <div className='user-card'>
      <img src={avatarUrl} />
      <div className='user-card__info'>
        <div className='info'>
          <div className='info__name'>{username}</div>
          <div className='info__details'>
            <div className={'details__status-icon'}></div>
            <div className='details__status'>{status}</div>
            <div className='details__user-id'>@{userId}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard