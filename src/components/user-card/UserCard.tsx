import { bindActionCreators as bind } from 'redux'
import { User, UserStatus } from '../../types/user'
import { onMention } from '../../reducers/chatRoom'
import styles from './UserCard.module.scss'
import { connect } from 'react-redux'

type UserCardProps = User & { onMention: any }
const mapStateToProps = () => ({
})
const mapDispatchToProps = (dispatch: any) => ({
  onMention: bind(onMention, dispatch),
})
const UserCard: React.FC<UserCardProps> = ({ userId, username, avatarUrl, status, onMention }) => {
  const statusClassName = styles['details__status-icon'] + ' ' + (status === UserStatus.ONLINE ? styles['details__status-icon--online'] : status === UserStatus.AWAY ? styles['details__status-icon--away'] : styles['details__status-icon--playing'])

  return (
    <div className={styles['user-card']} onClick={() => onMention(userId)}>
      <img src={avatarUrl} />
      <div className={styles['user-card__info']}>
        <div className={styles.info}>
          <div className={styles['info__name']}>{username}</div>
          <div className={styles['info__details']}>
            <div className={statusClassName}></div>
            <div className={styles['details__status']}>{status}</div>
            <div className={styles['details__user-id']}>@{userId}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)