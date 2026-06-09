import { useEffect } from 'react'
import styles from './BottomSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function BottomSheet({ open, onClose, children }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.sheet}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.handle} />
        {children}
      </div>
    </div>
  )
}
