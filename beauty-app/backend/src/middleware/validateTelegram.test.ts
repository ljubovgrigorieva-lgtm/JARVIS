import { createHmac } from 'crypto'
import { verifyTelegramInitData } from './validateTelegram.js'

const BOT_TOKEN = 'test_bot_token_12345'

function makeValidInitData(userId: number, firstName: string): string {
  const user = JSON.stringify({ id: userId, first_name: firstName, language_code: 'ru' })
  const dataCheckString = `user=${encodeURIComponent(user)}`
  const secretKey = createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest()
  const hash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
  return `user=${encodeURIComponent(user)}&hash=${hash}`
}

describe('verifyTelegramInitData', () => {
  test('accepts valid initData', () => {
    const initData = makeValidInitData(123456, 'Мария')
    const result = verifyTelegramInitData(initData, BOT_TOKEN)
    expect(result).toEqual({ id: 123456, first_name: 'Мария', language_code: 'ru' })
  })

  test('rejects tampered hash', () => {
    const initData = makeValidInitData(123456, 'Мария') + 'tampered'
    expect(() => verifyTelegramInitData(initData, BOT_TOKEN)).toThrow('Invalid initData signature')
  })

  test('rejects missing hash', () => {
    const initData = 'user=%7B%22id%22%3A123%7D'
    expect(() => verifyTelegramInitData(initData, BOT_TOKEN)).toThrow('Invalid initData signature')
  })
})
