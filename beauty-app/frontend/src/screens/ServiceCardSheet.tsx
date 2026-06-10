import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PortfolioItem } from '../lib/api.ts'
import { BottomSheet } from '../components/BottomSheet.tsx'
import { setMainButton, showBackButton, hapticLight, enableClosingConfirmation } from '../lib/telegram.ts'
import styles from './ServiceCardSheet.module.css'

interface Props {
  item: PortfolioItem
  onClose: () => void
}

export function ServiceCardSheet({ item, onClose }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    hapticLight()
    showBackButton(onClose)
    enableClosingConfirmation()
    setMainButton('Хочу так же', () => {
      navigate('/book', {
        state: {
          serviceId: item.service_id,
          serviceName: item.service_name,
          servicePrice: item.service_price_from,
          serviceDuration: item.service_duration_minutes
        }
      })
    })
  }, [item, navigate, onClose])

  return (
    <BottomSheet open onClose={onClose}>
      <img
        src={item.image_url}
        alt={item.service_name}
        className={styles.photo}
      />
      <div className={styles.body}>
        <h2 className={styles.title}>{item.service_name}</h2>
        <div className={styles.meta}>
          <span className={styles.price}>от {item.service_price_from} ₽</span>
          <span className={styles.dot}>·</span>
          <span className={styles.duration}>⏱ {item.service_duration_minutes} мин</span>
        </div>
        {item.service_description && (
          <p className={styles.description}>{item.service_description}</p>
        )}
      </div>
    </BottomSheet>
  )
}
