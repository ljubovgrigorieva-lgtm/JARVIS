import { FastifyInstance } from 'fastify'
import { db } from '../db/index.js'

export async function portfolioRoutes(app: FastifyInstance) {
  app.get('/api/portfolio', async () => {
    const rows = db.prepare(`
      SELECT
        p.id, p.image_url, p.sort_order,
        s.id   AS service_id,
        s.name AS service_name,
        s.price_from AS service_price_from,
        s.duration_minutes AS service_duration_minutes,
        s.description AS service_description
      FROM portfolio p
      LEFT JOIN services s ON p.service_id = s.id
      ORDER BY p.sort_order ASC
    `).all()
    return rows
  })
}
