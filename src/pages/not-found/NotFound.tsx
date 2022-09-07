import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundAnimation from "../../components/not-found-animation/NotFoundAnimation";

function NotFound() {
  const nav = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <NotFoundAnimation />
      <p>Page not found, redirecting to homepage.</p>
    </div>
  )
}

export default NotFound