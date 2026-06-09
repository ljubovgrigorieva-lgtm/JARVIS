import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, Booking } from '../lib/api.ts'
import { BookingCard } from '../components/BookingCard.tsx'
import { hideMainButton, hideBackButton } from '../lib/telegram.ts'
import styles from './MyBookings.module.css'

export function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    hideBackButton()
    hideMainButton()
    api.myBookings().then(setBookings).finally(() => setLoading(false))
  }, [])

  function handleBookAgain(booking: Booking) {
    navigate('/book', {
      state: {
        serviceId: booking.service_id,
        serviceName: booking.service_name,
        servicePrice: booking.price_from,
        serviceDuration: booking.duration_minutes
      }
    })
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>

  if (bookings.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📅</div>
        <p className={styles.emptyText}>Здесь появятся твои записи</p>
        <button
          className={styles.emptyBtn}
          onClick={() => navigate('/')}
        >
          Записаться
        </button>
      </div>
    )
  }

  const upcoming = bookings.filter(b => new Date(`${b.booking_date}T${b.booking_time}`) >= new Date())
  const past = bookings.filter(b => new Date(`${b.booking_date}T${b.booking_time}`) < new Date())

  return (
    <div className={styles.container}>
      {upcoming.length > 0 && (
        <>
          <h2 className={styles.section}>Предстоящие</h2>
          {upcoming.map(b => <BookingCard key={b.id} booking={b} onBookAgain={handleBookAgain} />)}
        </>
      )}
      {past.length > 0 && (
        <>
          <h2 className={styles.section}>История</h2>
          {past.map(b => <BookingCard key={b.id} booking={b} onBookAgain={handleBookAgain} />)}
        </>
      )}
    </div>
  )
}
