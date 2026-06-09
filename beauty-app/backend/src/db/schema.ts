import { db } from './index.js'

export function createSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      price_from INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      service_id INTEGER REFERENCES services(id),
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_user_id INTEGER NOT NULL,
      telegram_username TEXT,
      first_name TEXT NOT NULL,
      service_id INTEGER NOT NULL REFERENCES services(id),
      booking_date TEXT NOT NULL,
      booking_time TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      reminder_24h_sent INTEGER DEFAULT 0,
      reminder_2h_sent INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
    CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(telegram_user_id);
    CREATE INDEX IF NOT EXISTS idx_portfolio_service ON portfolio(service_id);
  `)
}

createSchema()
