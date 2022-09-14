import { connect, useSelector } from 'react-redux'
import { User, UserStatus } from '../../types/user'
import UserCard from '../user-card/UserCard'
import styles from './UserList.module.scss'

const mapStateToProps = () => ({
})
const mapDispatchToProps = {}

function UserList() {
  const users: User[] = [...(useSelector((state: any) => state.users)).userList]
  users.sort((a, b) => {
    const order = [UserStatus.ONLINE, UserStatus.AWAY, UserStatus.PLAYING]
    return order.indexOf(a.status) - order.indexOf(b.status)
  })

  return (
    <div className={styles['user-list']}>
      <div className={styles['user-list__title']}>Contacts</div>
      <div className={styles['user-list__list']}>
        {
          users.map((user, index) => (
            <UserCard key={index} userId={user.userId} username={user.username} avatarUrl={user.avatarUrl} status={user.status} />
          ))
        }
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)