import { getTelegramInitDataRaw } from './telegram.js'

const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-telegram-init-data': getTelegramInitDataRaw(),
      ...options?.headers
    }
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as any
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export interface PortfolioItem {
  id: number
  image_url: string
  sort_order: number
  service_id: number
  service_name: string
  service_price_from: number
  service_duration_minutes: number
  service_description: string
}

export interface Service {
  id: number
  category: string
  name: string
  description: string
  price_from: number
  duration_minutes: number
}

export interface ServiceCategory {
  name: string
  services: Service[]
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: number
  service_id: number
  service_name: string
  price_from: number
  duration_minutes: number
  booking_date: string
  booking_time: string
  status: string
  created_at: string
}

export const api = {
  portfolio: () => request<PortfolioItem[]>('/portfolio'),
  services: () => request<{ categories: ServiceCategory[] }>('/services'),
  availability: (date: string, serviceId: number) =>
    request<{ date: string; slots: TimeSlot[] }>(`/availability?date=${date}&serviceId=${serviceId}`),
  createBooking: (body: { serviceId: number; date: string; time: string; firstName: string }) =>
    request<Booking>('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  myBookings: () => request<Booking[]>('/bookings')
}
