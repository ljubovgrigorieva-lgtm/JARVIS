import type { Booking } from '../lib/api.ts'
import styles from './BookingCard.module.css'

interface Props {
  booking: Booking
  onBookAgain: (booking: Booking) => void
}

export function BookingCard({ booking, onBookAgain }: Props) {
  const dateLabel = new Date(booking.booking_date).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', weekday: 'short'
  })
  const isPast = new Date(`${booking.booking_date}T${booking.booking_time}`) < new Date()

  return (
    <div className={`${styles.card} ${isPast ? styles.past : styles.upcoming}`}>
      <div className={styles.top}>
        <div>
          <p className={styles.service}>{booking.service_name}</p>
          <p className={styles.datetime}>{dateLabel}, {booking.booking_time}</p>
          <p className={styles.price}>от {booking.price_from} ₽ · {booking.duration_minutes} мин</p>
        </div>
        <span className={`${styles.badge} ${isPast ? styles.badgePast : styles.badgeUpcoming}`}>
          {isPast ? 'Завершено' : 'Предстоит'}
        </span>
      </div>
      {isPast && (
        <button className={styles.bookAgain} onClick={() => onBookAgain(booking)}>
          Записаться снова →
        </button>
      )}
    </div>
  )
}
