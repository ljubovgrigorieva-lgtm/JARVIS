import request from 'supertest'
import { app } from '../server.js'
import { db } from '../db/index.js'

beforeAll(async () => { await app.ready() })
afterAll(async () => {
  db.prepare("DELETE FROM bookings WHERE telegram_user_id = 999999").run()
  await app.close()
})

describe('POST /api/bookings', () => {
  test('creates booking with valid data', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]

    const res = await request(app.server)
      .post('/api/bookings')
      .set('x-telegram-init-data', 'bypass_test')
      .send({ serviceId: 1, date: dateStr, time: '14:00', firstName: 'Тест' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('status', 'confirmed')
  })

  test('returns 409 if slot already taken', async () => {
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
    const dateStr = dayAfterTomorrow.toISOString().split('T')[0]

    await request(app.server)
      .post('/api/bookings')
      .set('x-telegram-init-data', 'bypass_test')
      .send({ serviceId: 1, date: dateStr, time: '15:00', firstName: 'Тест' })

    const res = await request(app.server)
      .post('/api/bookings')
      .set('x-telegram-init-data', 'bypass_test')
      .send({ serviceId: 2, date: dateStr, time: '15:00', firstName: 'Тест2' })
    expect(res.status).toBe(409)
  })
})
