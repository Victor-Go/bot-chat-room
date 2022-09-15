import { useRef } from 'react'

export default () => {
  const htmlElRef: any = useRef(null)
  const setBottom = () => {
    htmlElRef.current && (htmlElRef.current.scrollTop = htmlElRef.current.scrollHeight)
  }

  return [htmlElRef, setBottom]
}