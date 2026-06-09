import { FastifyInstance } from 'fastify'
import { db } from '../db/index.js'

const WORK_START = 10
const WORK_END   = 20

function generateSlots(durationMinutes: number): string[] {
  const slots: string[] = []
  for (let h = WORK_START; h < WORK_END; h++) {
    for (const m of [0, 30]) {
      const endMinutes = h * 60 + m + durationMinutes
      if (endMinutes <= WORK_END * 60) {
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
  }
  return slots
}

export async function availabilityRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { date?: string; serviceId?: string } }>(
    '/api/availability',
    async (req, reply) => {
      const { date, serviceId } = req.query
      if (!date || !serviceId) {
        return reply.status(400).send({ error: 'date and serviceId are required' })
      }

      const service = db.prepare('SELECT duration_minutes FROM services WHERE id = ?')
        .get(Number(serviceId)) as { duration_minutes: number } | undefined
      if (!service) return reply.status(404).send({ error: 'Service not found' })

      const bookedSlots = (db.prepare(
        "SELECT booking_time FROM bookings WHERE booking_date = ? AND status != 'cancelled'"
      ).all(date) as Array<{ booking_time: string }>).map(r => r.booking_time)

      const allSlots = generateSlots(service.duration_minutes)

      return {
        date,
        slots: allSlots.map(time => ({
          time,
          available: !bookedSlots.includes(time)
        }))
      }
    }
  )
}
