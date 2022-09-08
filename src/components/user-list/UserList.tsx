import { User, UserStatus } from '../../types/user'
import UserCard from '../user-card/UserCard'
import './UserList.scss'

function UserList() {
  const users: User[] = [
    {
      userId: 'victor',
      username: 'Victor Yang',
      avatarUrl: 'https://robohash.org/HelloWorld.png',
      status: UserStatus.ONLINE
    }
  ]

  for (let i = 0; i < 100; i++) {
    users.push(users[0])
  }

  return (
    <div className='user-list'>
      <div className='user-list__title'>Contacts</div>
      <div className='user-list__list'>
        {
          users.map((user, index) => (
            <UserCard key={index} userId={user.userId} username={user.username} avatarUrl={user.avatarUrl} status={user.status} />
          ))
        }
      </div>
    </div>
  )
}

export default UserList