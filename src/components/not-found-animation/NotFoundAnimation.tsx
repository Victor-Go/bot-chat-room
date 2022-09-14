import styles from './NotFoundAnimation.module.scss'

function NotFoundAnimation() {
  return (
    <div className={styles['not-found']}>
      <svg viewBox='-50 -50 100 100' strokeWidth='10'>
        <circle r='45'></circle>
        <circle r='45' strokeDasharray='282.7433388230814' strokeDashoffset='282.7433388230814px'></circle>
      </svg>
    </div>
  )
}

export default NotFoundAnimation