import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import './db/schema.js'
import { portfolioRoutes } from './routes/portfolio.js'
import { servicesRoutes } from './routes/services.js'
import { availabilityRoutes } from './routes/availability.js'
import { bookingsRoutes } from './routes/bookings.js'

const app = Fastify({ logger: process.env.NODE_ENV !== 'test' })

app.register(cors, { origin: true })
app.get('/api/health', async () => ({ ok: true }))
app.register(portfolioRoutes)
app.register(servicesRoutes)
app.register(availabilityRoutes)
app.register(bookingsRoutes)

const start = async () => {
  await app.listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })
}

if (process.env.NODE_ENV !== 'test') {
  start()
}

export { app }
