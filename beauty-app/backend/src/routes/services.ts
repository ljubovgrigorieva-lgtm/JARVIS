import { FastifyInstance } from 'fastify'
import { db } from '../db/index.js'

export async function servicesRoutes(app: FastifyInstance) {
  app.get('/api/services', async () => {
    const rows = db.prepare(`
      SELECT id, category, name, description, price_from, duration_minutes, sort_order
      FROM services ORDER BY sort_order ASC
    `).all() as Array<{
      id: number; category: string; name: string
      description: string; price_from: number; duration_minutes: number; sort_order: number
    }>

    const map = new Map<string, typeof rows>()
    for (const row of rows) {
      if (!map.has(row.category)) map.set(row.category, [])
      map.get(row.category)!.push(row)
    }

    return {
      categories: [...map.entries()].map(([name, services]) => ({ name, services }))
    }
  })
}
