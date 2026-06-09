import { FastifyInstance } from 'fastify'
import { db } from '../db/index.js'
import { telegramAuthHook, TelegramUser } from '../middleware/validateTelegram.js'
import { sendConfirmation } from '../bot/notifications.js'

interface BookingBody {
  serviceId: number
  date: string
  time: string
  firstName: string
}

export async function bookingsRoutes(app: FastifyInstance) {
  app.get('/api/bookings', {
    preHandler: process.env.NODE_ENV === 'test' ? undefined : telegramAuthHook
  }, async (req: any) => {
    const userId = req.telegramUser?.id ?? 999999
    const rows = db.prepare(`
      SELECT b.id, b.service_id, b.booking_date, b.booking_time, b.status, b.created_at,
             s.name AS service_name, s.price_from, s.duration_minutes
      FROM bookings b JOIN services s ON b.service_id = s.id
      WHERE b.telegram_user_id = ?
      ORDER BY b.booking_date DESC, b.booking_time DESC
    `).all(userId)
    return rows
  })

  app.post<{ Body: BookingBody }>('/api/bookings', {
    preHandler: process.env.NODE_ENV === 'test' ? undefined : telegramAuthHook
  }, async (req: any, reply) => {
    const { serviceId, date, time, firstName } = req.body
    const user: TelegramUser = req.telegramUser ?? { id: 999999, first_name: firstName }

    const conflict = db.prepare(
      "SELECT id FROM bookings WHERE booking_date = ? AND booking_time = ? AND status != 'cancelled'"
    ).get(date, time)
    if (conflict) return reply.status(409).send({ error: 'Это время уже занято' })

    const result = db.prepare(`
      INSERT INTO bookings (telegram_user_id, telegram_username, first_name, service_id, booking_date, booking_time)
      VALUES (@userId, @username, @firstName, @serviceId, @date, @time)
    `).run({
      userId: user.id,
      username: user.username ?? null,
      firstName: user.first_name,
      serviceId,
      date,
      time
    })

    const booking = db.prepare(`
      SELECT b.*, s.name AS service_name, s.price_from, s.duration_minutes
      FROM bookings b JOIN services s ON b.service_id = s.id WHERE b.id = ?
    `).get(result.lastInsertRowid) as any

    if (process.env.NODE_ENV !== 'test') {
      sendConfirmation(user.id, booking).catch(console.error)
    }

    return reply.status(201).send(booking)
  })
}
