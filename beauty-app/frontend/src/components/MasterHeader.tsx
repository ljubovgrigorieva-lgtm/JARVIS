import styles from './MasterHeader.module.css'

interface Props {
  name: string
  specialty: string
  rating: number
  reviewCount: number
  avatarUrl?: string
  nextSlot?: string
}

export function MasterHeader({ name, specialty, rating, reviewCount, avatarUrl, nextSlot }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <div className={styles.avatar}>
          {avatarUrl
            ? <img src={avatarUrl} alt={name} />
            : <span>{name[0]}</span>}
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.specialty}>{specialty}</p>
          <p className={styles.rating}>⭐ {rating.toFixed(1)} · {reviewCount} отзывов</p>
        </div>
      </div>
      {nextSlot && (
        <p className={styles.nextSlot}>🗓 Ближайшая запись: {nextSlot}</p>
      )}
    </header>
  )
}
