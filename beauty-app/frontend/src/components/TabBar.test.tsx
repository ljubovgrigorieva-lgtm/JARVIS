import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TabBar } from './TabBar.tsx'

test('renders three tabs', () => {
  render(<MemoryRouter><TabBar /></MemoryRouter>)
  expect(screen.getByText('Работы')).toBeInTheDocument()
  expect(screen.getByText('Услуги')).toBeInTheDocument()
  expect(screen.getByText('Мои записи')).toBeInTheDocument()
})

test('highlights active tab', () => {
  render(<MemoryRouter initialEntries={['/services']}><TabBar /></MemoryRouter>)
  const serviceTab = screen.getByText('Услуги').closest('a')!
  expect(serviceTab.className).toMatch(/active/)
})
