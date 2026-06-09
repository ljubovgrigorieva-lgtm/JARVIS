import request from 'supertest'
import { app } from '../server.js'

beforeAll(async () => { await app.ready() })
afterAll(async () => { await app.close() })

describe('GET /api/availability', () => {
  test('returns time slots for a given date', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]

    const res = await request(app.server)
      .get(`/api/availability?date=${dateStr}&serviceId=2`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('date', dateStr)
    expect(Array.isArray(res.body.slots)).toBe(true)
    if (res.body.slots.length > 0) {
      const slot = res.body.slots[0]
      expect(slot).toHaveProperty('time')
      expect(slot).toHaveProperty('available')
    }
  })

  test('returns 400 if date missing', async () => {
    const res = await request(app.server).get('/api/availability?serviceId=1')
    expect(res.status).toBe(400)
  })
})
