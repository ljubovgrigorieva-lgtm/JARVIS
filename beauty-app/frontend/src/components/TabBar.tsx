import { NavLink } from 'react-router-dom'
import styles from './TabBar.module.css'

const tabs = [
  { path: '/', label: 'Работы', icon: '🖼' },
  { path: '/services', label: 'Услуги', icon: '✂️' },
  { path: '/bookings', label: 'Мои записи', icon: '📅' },
] as const

export function TabBar() {
  return (
    <nav className={styles.tabBar}>
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
