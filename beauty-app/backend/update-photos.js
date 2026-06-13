// Run: node update-photos.js
const Database = require('better-sqlite3')
const path = require('path')

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'data/beauty.db')
const db = new Database(dbPath)

const photos = [
  { id: 1, image_url: 'https://source.unsplash.com/gb6gtiTZKB8/400x400' },  // маникюр в салоне
  { id: 2, image_url: 'https://source.unsplash.com/Y14F-1vzVds/400x400' },  // розовый маникюр
  { id: 3, image_url: 'https://source.unsplash.com/KZKbGgQPCtU/400x400' },  // чёрный маникюр
  { id: 4, image_url: 'https://source.unsplash.com/vtQHwU4F13s/400x400' },  // педикюр
  { id: 5, image_url: 'https://source.unsplash.com/tXwBDZS2JxQ/400x400' },  // ногти с кольцом
  { id: 6, image_url: 'https://source.unsplash.com/DtoWpHt2_d8/400x400' },  // белый маникюр
  { id: 7, image_url: 'https://source.unsplash.com/SyCC0GQi5S4/400x400' },  // руки на белом
  { id: 8, image_url: 'https://source.unsplash.com/jRXxNpA6d_k/400x400' },  // маникюр крупным планом
  { id: 9, image_url: 'https://source.unsplash.com/zRkla85Xe2o/400x400' },  // маникюр
]

const update = db.prepare('UPDATE portfolio SET image_url = ? WHERE id = ?')
const updateAll = db.transaction(() => {
  for (const p of photos) update.run(p.image_url, p.id)
})
updateAll()

const rows = db.prepare('SELECT id, image_url FROM portfolio ORDER BY id').all()
console.log('✅ Photos updated:')
rows.forEach(r => console.log(`  ${r.id}: ${r.image_url}`))
