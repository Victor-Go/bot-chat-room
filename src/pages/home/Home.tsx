import TitleBar from '../../components/title-bar/TitleBar'
import UserIdInput from '../../components/user-id-input/UserIdInput'
import './Home.scss'

function Home() {
  return (
    <div className='home'>
      <TitleBar />
      <div className='username-input-container'>
        <UserIdInput />
      </div>
    </div>
  )
}

export default Home