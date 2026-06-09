import { db } from './index.js'
import './schema.js'

function seed() {
  const insertService = db.prepare(`
    INSERT OR IGNORE INTO services (id, category, name, description, price_from, duration_minutes, sort_order)
    VALUES (@id, @category, @name, @description, @price_from, @duration_minutes, @sort_order)
  `)

  const services = [
    { id: 1, category: 'Маникюр', name: 'Маникюр классический', description: 'Обработка ногтей и кутикулы, покрытие лаком', price_from: 1200, duration_minutes: 60, sort_order: 1 },
    { id: 2, category: 'Маникюр', name: 'Маникюр + гель-лак', description: 'Маникюр с покрытием гель-лаком, держится 3–4 недели', price_from: 2000, duration_minutes: 90, sort_order: 2 },
    { id: 3, category: 'Маникюр', name: 'Наращивание + дизайн', description: 'Наращивание на типсы или формы, любой дизайн', price_from: 3500, duration_minutes: 150, sort_order: 3 },
    { id: 4, category: 'Педикюр', name: 'Педикюр классический', description: 'Обработка стоп и ногтей на ногах', price_from: 1500, duration_minutes: 75, sort_order: 4 },
    { id: 5, category: 'Педикюр', name: 'Педикюр + гель-лак', description: 'Педикюр с покрытием гель-лаком', price_from: 2200, duration_minutes: 100, sort_order: 5 },
    { id: 6, category: 'Дизайн', name: 'Дизайн (за ноготь)', description: 'Роспись, стразы, слайдеры — любая сложность', price_from: 100, duration_minutes: 10, sort_order: 6 },
  ]

  const seedServices = db.transaction(() => {
    for (const s of services) insertService.run(s)
  })
  seedServices()

  const insertPhoto = db.prepare(`
    INSERT OR IGNORE INTO portfolio (id, image_url, service_id, sort_order)
    VALUES (@id, @image_url, @service_id, @sort_order)
  `)

  const photos = [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 2, sort_order: 1 },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1604654894611-df63bc536372?w=400', service_id: 3, sort_order: 2 },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 1, sort_order: 3 },
    { id: 4, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 2, sort_order: 4 },
    { id: 5, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 5, sort_order: 5 },
    { id: 6, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 3, sort_order: 6 },
    { id: 7, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 2, sort_order: 7 },
    { id: 8, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 6, sort_order: 8 },
    { id: 9, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400', service_id: 3, sort_order: 9 },
  ]

  const seedPhotos = db.transaction(() => {
    for (const p of photos) insertPhoto.run(p)
  })
  seedPhotos()

  console.log('✅ Seed complete: 6 services, 9 portfolio photos')
}

seed()
