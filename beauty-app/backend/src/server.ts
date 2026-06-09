import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

const app = Fastify({ logger: process.env.NODE_ENV !== 'test' })

app.register(cors, { origin: true })
app.get('/api/health', async () => ({ ok: true }))

const start = async () => {
  await app.listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })
}

if (process.env.NODE_ENV !== 'test') {
  start()
}

export { app }
