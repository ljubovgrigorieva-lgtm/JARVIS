import { useState } from 'react'
import { hapticSelection } from '../lib/telegram.ts'
import styles from './Calendar.module.css'

interface Props {
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function Calendar({ selectedDate, onSelectDate }: Props) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDOW = (new Date(year, month, 1).getDay() + 6) % 7 // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthLabel = viewDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })

  const cells: (number | null)[] = [
    ...Array(firstDOW).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  function isPast(day: number) {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t
  }

  function handleSelect(day: number) {
    if (isPast(day)) return
    hapticSelection()
    onSelectDate(toDateStr(year, month, day))
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
        >‹</button>
        <span className={styles.monthLabel}>{monthLabel}</span>
        <button
          className={styles.navBtn}
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
        >›</button>
      </div>

      <div className={styles.dayLabels}>
        {DAY_LABELS.map(d => <span key={d} className={styles.dayLabel}>{d}</span>)}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const dateStr = toDateStr(year, month, day)
          const isSelected = dateStr === selectedDate
          const past = isPast(day)
          return (
            <button
              key={day}
              className={`${styles.day} ${isSelected ? styles.selected : ''} ${past ? styles.past : ''}`}
              onClick={() => handleSelect(day)}
              disabled={past}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
