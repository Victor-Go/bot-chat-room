export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getFormattedDate = (timeStamp: number) => {
  const date = new Date(timeStamp)
  const today = new Date().setHours(0, 0, 0, 0)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  const formattedTime = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)
  return today === new Date(timeStamp).setHours(0, 0, 0, 0) ? formattedTime : `${year}-${month + 1}-${day} ${formattedTime}`
}