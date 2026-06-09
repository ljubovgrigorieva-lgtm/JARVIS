import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, PortfolioItem } from '../lib/api.ts'
import { MasterHeader } from '../components/MasterHeader.tsx'
import { PhotoGrid } from '../components/PhotoGrid.tsx'
import { ServiceCardSheet } from './ServiceCardSheet.tsx'
import { setMainButton, hideBackButton } from '../lib/telegram.ts'
import styles from './Gallery.module.css'

export function Gallery() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    hideBackButton()
    api.portfolio().then(setPortfolio).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selected) {
      setMainButton('Записаться', () => navigate('/services'))
    }
  }, [selected, navigate])

  const handlePhotoTap = useCallback((item: PortfolioItem) => {
    setSelected(item)
  }, [])

  if (loading) return <div className={styles.loading}>Загрузка...</div>

  return (
    <>
      <MasterHeader
        name="Мария Иванова"
        specialty="Мастер маникюра"
        rating={4.9}
        reviewCount={127}
        nextSlot="завтра в 10:00"
      />
      <PhotoGrid items={portfolio} onPhotoTap={handlePhotoTap} />
      {selected && (
        <ServiceCardSheet
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
