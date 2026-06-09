import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

const app = Fastify({ logger: true })

app.register(cors, { origin: true })
app.get('/api/health', async () => ({ ok: true }))

const start = async () => {
  await app.listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })
}
start()

export { app }
