import { Service } from '../lib/api.ts'
import { hapticLight } from '../lib/telegram.ts'
import styles from './ServiceListItem.module.css'

interface Props {
  service: Service
  selected: boolean
  onToggle: (service: Service) => void
}

export function ServiceListItem({ service, selected, onToggle }: Props) {
  return (
    <button
      className={`${styles.item} ${selected ? styles.selected : ''}`}
      onClick={() => { hapticLight(); onToggle(service) }}
    >
      <div className={styles.info}>
        <span className={styles.name}>{service.name}</span>
        <span className={styles.meta}>⏱ {service.duration_minutes} мин · от {service.price_from} ₽</span>
        {service.description && <span className={styles.desc}>{service.description}</span>}
      </div>
      <div className={styles.toggle}>
        {selected ? '✓' : '+'}
      </div>
    </button>
  )
}
