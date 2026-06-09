import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Booking } from '../lib/api.ts'
import { setMainButton, hideBackButton, hapticSuccess, disableClosingConfirmation } from '../lib/telegram.ts'
import styles from './Success.module.css'

interface SuccessState {
  booking: Booking
  serviceName: string
}

export function Success() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as SuccessState

  useEffect(() => {
    hapticSuccess()
    disableClosingConfirmation()
    hideBackButton()
    setMainButton('На главную', () => navigate('/'))
  }, [navigate])

  if (!state) { navigate('/'); return null }

  const { booking } = state
  const dateLabel = new Date(booking.booking_date).toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

  return (
    <div className={styles.container}>
      <div className={styles.icon}>✅</div>
      <h1 className={styles.title}>Запись подтверждена!</h1>
      <p className={styles.subtitle}>Ждём тебя 💅</p>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Услуга</span>
          <span className={styles.value}>{booking.service_name}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={styles.label}>Дата</span>
          <span className={styles.value}>{dateLabel}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={styles.label}>Время</span>
          <span className={styles.value}>{booking.booking_time}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={styles.label}>Стоимость</span>
          <span className={styles.value}>от {booking.price_from} ₽</span>
        </div>
      </div>

      <p className={styles.reminder}>
        🔔 Напомним за 24 ч и за 2 ч до визита
      </p>
    </div>
  )
}
