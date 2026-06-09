import request from 'supertest'
import { app } from '../server.js'

beforeAll(async () => { await app.ready() })
afterAll(async () => { await app.close() })

describe('GET /api/services', () => {
  test('returns services grouped by category', async () => {
    const res = await request(app.server).get('/api/services')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('categories')
    expect(Array.isArray(res.body.categories)).toBe(true)
    if (res.body.categories.length > 0) {
      const cat = res.body.categories[0]
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('services')
      expect(Array.isArray(cat.services)).toBe(true)
    }
  })
})
