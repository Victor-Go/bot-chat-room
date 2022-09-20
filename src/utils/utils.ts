import timestamp from 'time-stamp'

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getFormattedDate = (timeStamp: number) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const time = new Date(timeStamp)
  return today === new Date(timeStamp).setHours(0, 0, 0, 0) ? timestamp('HH:mm:ss', time) : timestamp('YYYY-MM-DD HH:mm:ss', time)
}