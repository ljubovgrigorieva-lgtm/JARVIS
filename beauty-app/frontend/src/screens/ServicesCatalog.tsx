import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, Service, ServiceCategory } from '../lib/api.ts'
import { CategoryTabs } from '../components/CategoryTabs.tsx'
import { ServiceListItem } from '../components/ServiceListItem.tsx'
import { setMainButton, hideMainButton, hideBackButton } from '../lib/telegram.ts'
import styles from './ServicesCatalog.module.css'

export function ServicesCatalog() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [selected, setSelected] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    hideBackButton()
    api.services()
      .then(res => {
        setCategories(res.categories)
        if (res.categories[0]) setActiveCategory(res.categories[0].name)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selected) {
      setMainButton(`К записи · от ${selected.price_from} ₽`, () => {
        navigate('/book', {
          state: {
            serviceId: selected.id,
            serviceName: selected.name,
            servicePrice: selected.price_from,
            serviceDuration: selected.duration_minutes
          }
        })
      })
    } else {
      hideMainButton()
    }
  }, [selected, navigate])

  function toggleService(service: Service) {
    setSelected(prev => prev?.id === service.id ? null : service)
  }

  const currentServices = categories.find(c => c.name === activeCategory)?.services ?? []

  if (loading) return <div className={styles.loading}>Загрузка...</div>

  return (
    <div>
      <CategoryTabs
        categories={categories.map(c => c.name)}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <div className={styles.list}>
        {currentServices.map(service => (
          <ServiceListItem
            key={service.id}
            service={service}
            selected={selected?.id === service.id}
            onToggle={toggleService}
          />
        ))}
      </div>
    </div>
  )
}
