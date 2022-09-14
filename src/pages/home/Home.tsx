import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import TitleBar from '../../components/title-bar/TitleBar'
import UserIdInput from '../../components/user-id-input/UserIdInput'
import styles from './Home.module.scss'

type HomeProps = {
  username: string
}
const mapStateToProps = (state: any) => ({
  username: state.users.username
})
const mapDispatchToProps = {}
const Home: React.FC<HomeProps> = ({ username }) => {
  const nav = useNavigate()
  useEffect(() => {
    if (username) {
      nav('/chat-room')
    }
  }, [])

  return (
    <div className={styles.home}>
      {
        !username && (
          <>
            <TitleBar />
            <div className={styles['username-input-container']}>
              <UserIdInput />
            </div>
          </>
        )
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)