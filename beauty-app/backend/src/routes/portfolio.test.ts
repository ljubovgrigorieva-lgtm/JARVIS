import request from 'supertest'
import { app } from '../server.js'

beforeAll(async () => { await app.ready() })
afterAll(async () => { await app.close() })

describe('GET /api/portfolio', () => {
  test('returns array of portfolio items with service info', async () => {
    const res = await request(app.server).get('/api/portfolio')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    if (res.body.length > 0) {
      const item = res.body[0]
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('image_url')
      expect(item).toHaveProperty('service_name')
      expect(item).toHaveProperty('service_price_from')
      expect(item).toHaveProperty('service_duration_minutes')
    }
  })
})
