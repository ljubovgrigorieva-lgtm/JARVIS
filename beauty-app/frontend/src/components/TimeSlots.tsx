import { TimeSlot } from '../lib/api.ts'
import { hapticLight } from '../lib/telegram.ts'
import styles from './TimeSlots.module.css'

interface Props {
  slots: TimeSlot[]
  selectedTime: string | null
  onSelectTime: (time: string) => void
}

export function TimeSlots({ slots, selectedTime, onSelectTime }: Props) {
  function handle(slot: TimeSlot) {
    if (!slot.available) return
    hapticLight()
    onSelectTime(slot.time)
  }

  return (
    <div className={styles.grid}>
      {slots.map(slot => (
        <button
          key={slot.time}
          className={`${styles.slot} ${!slot.available ? styles.taken : ''} ${selectedTime === slot.time ? styles.selected : ''}`}
          onClick={() => handle(slot)}
          disabled={!slot.available}
        >
          {slot.time}
        </button>
      ))}
    </div>
  )
}
