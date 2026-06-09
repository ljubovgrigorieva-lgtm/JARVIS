import { Routes, Route } from 'react-router-dom'
import { TabBar } from './components/TabBar.tsx'
import { Gallery } from './screens/Gallery.tsx'
import { ServicesCatalog } from './screens/ServicesCatalog.tsx'
import { MyBookings } from './screens/MyBookings.tsx'
import { DateTimePicker } from './screens/DateTimePicker.tsx'
import { Success } from './screens/Success.tsx'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/services" element={<ServicesCatalog />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/book" element={<DateTimePicker />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  )
}
