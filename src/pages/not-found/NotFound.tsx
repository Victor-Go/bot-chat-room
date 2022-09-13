import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.scss'
import NotFoundAnimation from '../../components/not-found-animation/NotFoundAnimation'

function NotFound() {
  const nav = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/')
    }, 4850)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="not-found-container">
      <NotFoundAnimation />
      <p className="not-found-container__text">Page not found, redirecting to homepage.</p>
    </div>
  )
}

export default NotFound