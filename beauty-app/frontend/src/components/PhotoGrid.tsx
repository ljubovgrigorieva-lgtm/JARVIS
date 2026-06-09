import { PortfolioItem } from '../lib/api.ts'
import styles from './PhotoGrid.module.css'

interface Props {
  items: PortfolioItem[]
  onPhotoTap: (item: PortfolioItem) => void
}

export function PhotoGrid({ items, onPhotoTap }: Props) {
  return (
    <div className={styles.grid}>
      {items.map(item => (
        <button
          key={item.id}
          className={styles.cell}
          onClick={() => onPhotoTap(item)}
          aria-label={item.service_name}
        >
          <img
            src={item.image_url}
            alt={item.service_name}
            loading="lazy"
            className={styles.photo}
          />
        </button>
      ))}
    </div>
  )
}
