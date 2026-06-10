import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../lib/api.ts'
import type { TimeSlot } from '../lib/api.ts'
import { Calendar } from '../components/Calendar.tsx'
import { TimeSlots } from '../components/TimeSlots.tsx'
import { setMainButton, showBackButton, hideBackButton, hideMainButton, enableClosingConfirmation, disableClosingConfirmation, getTelegramUser, hapticSuccess } from '../lib/telegram.ts'
import styles from './DateTimePicker.module.css'

interface BookState {
  serviceId: number
  serviceName: string
  servicePrice: number
  serviceDuration: number
}

export function DateTimePicker() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as BookState

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!state) return
    enableClosingConfirmation()
    showBackButton(() => navigate(-1))
    return () => {
      disableClosingConfirmation()
      hideBackButton()
      hideMainButton()
    }
  }, [navigate, state])

  useEffect(() => {
    if (!selectedDate || !state?.serviceId) return
    setSelectedTime(null)
    setLoadingSlots(true)
    api.availability(selectedDate, state.serviceId)
      .then(res => setSlots(res.slots))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, state?.serviceId])

  useEffect(() => {
    const ready = !!selectedDate && !!selectedTime && !submitting
    setMainButton(
      submitting ? 'Подтверждаем...' : 'Подтвердить запись',
      async () => {
        if (!selectedDate || !selectedTime || submitting) return
        setSubmitting(true)
        const user = getTelegramUser()
        try {
          const booking = await api.createBooking({
            serviceId: state.serviceId,
            date: selectedDate,
            time: selectedTime,
            firstName: (user as any)?.first_name ?? 'Клиент'
          })
          hapticSuccess()
          navigate('/success', { state: { booking, serviceName: state.serviceName } })
        } catch (e: any) {
          alert(e.message ?? 'Ошибка при записи')
          setSubmitting(false)
        }
      },
      ready
    )
  }, [selectedDate, selectedTime, submitting, state, navigate])

  useEffect(() => {
    if (!state) navigate('/')
  }, [state, navigate])

  if (!state) return null

  return (
    <div className={styles.container}>
      <div className={styles.recap}>
        <span className={styles.recapName}>{state.serviceName}</span>
        <span className={styles.recapMeta}>от {state.servicePrice} ₽ · {state.serviceDuration} мин</span>
      </div>

      <h2 className={styles.sectionTitle}>Выбери дату</h2>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {selectedDate && (
        <>
          <h2 className={styles.sectionTitle}>Выбери время</h2>
          {loadingSlots
            ? <p className={styles.hint}>Загружаем доступное время...</p>
            : slots.length === 0
              ? <p className={styles.hint}>Нет свободного времени в этот день</p>
              : <TimeSlots slots={slots} selectedTime={selectedTime} onSelectTime={setSelectedTime} />
          }
        </>
      )}
    </div>
  )
}
