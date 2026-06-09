import { hapticLight } from '../lib/telegram.ts'
import styles from './CategoryTabs.module.css'

interface Props {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className={styles.scroll}>
      <div className={styles.tabs}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.tab} ${cat === active ? styles.active : ''}`}
            onClick={() => { hapticLight(); onChange(cat) }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
