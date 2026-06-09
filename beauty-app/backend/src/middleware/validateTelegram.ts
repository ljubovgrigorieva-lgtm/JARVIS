import { createHmac } from 'crypto'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

export function verifyTelegramInitData(initData: string, botToken: string): TelegramUser {
  // Parse raw key=value pairs preserving percent-encoding (URLSearchParams would decode values)
  const rawPairs = initData.split('&').map(pair => {
    const eqIdx = pair.indexOf('=')
    if (eqIdx === -1) return { key: pair, rawValue: '', value: '' }
    const key = pair.slice(0, eqIdx)
    const rawValue = pair.slice(eqIdx + 1)
    return { key, rawValue, value: decodeURIComponent(rawValue) }
  })

  const hashPair = rawPairs.find(p => p.key === 'hash')
  if (!hashPair) throw new Error('Invalid initData signature')
  const hash = hashPair.rawValue

  const dataCheckString = rawPairs
    .filter(p => p.key !== 'hash')
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(p => `${p.key}=${p.rawValue}`)
    .join('\n')

  const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest()
  const expectedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  if (expectedHash !== hash) throw new Error('Invalid initData signature')

  const userPair = rawPairs.find(p => p.key === 'user')
  if (!userPair) throw new Error('Missing user in initData')

  return JSON.parse(userPair.value) as TelegramUser
}

// Fastify preHandler hook — attaches verified user to request
export async function telegramAuthHook(request: any, reply: any) {
  const initData = request.headers['x-telegram-init-data'] as string
  if (!initData) {
    reply.status(401).send({ error: 'Missing Telegram auth' })
    return
  }
  try {
    request.telegramUser = verifyTelegramInitData(initData, process.env.BOT_TOKEN!)
  } catch {
    reply.status(401).send({ error: 'Invalid Telegram auth' })
  }
}
