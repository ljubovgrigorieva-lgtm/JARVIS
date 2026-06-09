import { Bot } from 'grammy'
import 'dotenv/config'

export const bot = new Bot(process.env.BOT_TOKEN ?? 'placeholder_token')

bot.command('start', ctx => ctx.reply('Открой мой каталог 💅', {
  reply_markup: {
    inline_keyboard: [[{
      text: '💅 Открыть каталог',
      web_app: { url: process.env.FRONTEND_URL ?? 'https://example.com' }
    }]]
  }
}))
