import TitleBar from '../../components/title-bar/TitleBar'
import UserIdInput from '../../components/user-id-input/UserIdInput'
import styles from './Home.module.scss'

function Home() {
  return (
    <div className={styles.home}>
      <TitleBar />
      <div className={styles['username-input-container']}>
        <UserIdInput />
      </div>
    </div>
  )
}

export default Home