import styles from './Loading.module.scss'

export default function () {
  return (
    <div className={styles.loading}>
      <div className={styles['loading__container']}>
        <p>Loading...</p>
      </div>
    </div>
  )
}