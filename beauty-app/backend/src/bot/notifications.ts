import { bot } from './index.js'

interface BookingInfo {
  id: number
  first_name: string
  service_name: string
  price_from: number
  booking_date: string
  booking_time: string
  duration_minutes: number
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long'
  })
}

export async function sendConfirmation(userId: number, booking: BookingInfo) {
  const text = `✅ <b>Запись подтверждена!</b>

📋 <b>${booking.service_name}</b>
📅 ${formatDate(booking.booking_date)}, ${booking.booking_time}
⏱ ${booking.duration_minutes} минут
💰 от ${booking.price_from} ₽

Напомним за 24 ч и за 2 ч до визита 🔔`

  await bot.api.sendMessage(userId, text, { parse_mode: 'HTML' })

  const masterId = Number(process.env.MASTER_TELEGRAM_ID)
  if (masterId) {
    await bot.api.sendMessage(
      masterId,
      `🔔 Новая запись!\n👤 ${booking.first_name}\n📋 ${booking.service_name}\n📅 ${formatDate(booking.booking_date)}, ${booking.booking_time}`,
      { parse_mode: 'HTML' }
    )
  }
}

export async function sendReminder(userId: number, booking: BookingInfo, hoursAhead: number) {
  const text = hoursAhead === 24
    ? `🔔 Напоминаем: завтра в ${booking.booking_time} у тебя запись на <b>${booking.service_name}</b>. Ждём! 💅`
    : `🔔 Через 2 часа (в ${booking.booking_time}) у тебя запись на <b>${booking.service_name}</b>. До встречи! 💅`

  await bot.api.sendMessage(userId, text, { parse_mode: 'HTML' })
}
