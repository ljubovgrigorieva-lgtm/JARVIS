// Run: node update-photos.js
const Database = require('better-sqlite3')
const path = require('path')

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'data/beauty.db')
const db = new Database(dbPath)

const photos = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&fit=crop&q=80' },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&fit=crop&q=80' },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=400&fit=crop&q=80' },
  { id: 4, image_url: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?w=400&fit=crop&q=80' },
  { id: 5, image_url: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=400&fit=crop&q=80' },
  { id: 6, image_url: 'https://images.unsplash.com/photo-1630843599725-32ead7671867?w=400&fit=crop&q=80' },
  { id: 7, image_url: 'https://images.unsplash.com/photo-1690749138086-7422f71dc159?w=400&fit=crop&q=80' },
  { id: 8, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&fit=crop&q=80' },
  { id: 9, image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&fit=crop&q=80' },
]

const update = db.prepare('UPDATE portfolio SET image_url = ? WHERE id = ?')
const updateAll = db.transaction(() => {
  for (const p of photos) update.run(p.image_url, p.id)
})
updateAll()

const rows = db.prepare('SELECT id, image_url FROM portfolio ORDER BY id').all()
console.log('✅ Photos updated:')
rows.forEach(r => console.log(`  ${r.id}: ${r.image_url}`))
