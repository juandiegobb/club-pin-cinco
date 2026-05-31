import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import ReservationService from '../components/reservation/ReservationService/ReservationService'
import ReservationCalendar from '../components/reservation/ReservationCalendar/ReservationCalendar'
import ReservationSchedule from '../components/reservation/ReservationSchedule/ReservationSchedule'
import ReservationForm from '../components/reservation/ReservationForm/ReservationForm'
import styles from './Reservation.module.css'

function Reservation() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    service: 'Bolos',
    date: null,
    schedule: '',
    name: '',
    phone: '',
    people: '',
  })

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const springTransition = { type: 'spring', stiffness: 75, damping: 16 }

  return (
    <div className={styles.page}>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, scale: 0.9, y: -25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springTransition}
      >
        {t('reservationTitle')}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.1 }}
      >
        <ReservationService
          selected={form.service}
          onChange={(val) => handleChange('service', val)}
        />
      </motion.div>

      <div className={styles.row}>
        <motion.div
          className={styles.calendarCol}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.25 }}
        >
          <p className={styles.stepLabel}>{t('step2')}</p>
          <ReservationCalendar
            selected={form.date}
            onChange={(val) => handleChange('date', val)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          style={{ width: '100%' }}
        >
          {/* ← service agregado aquí */}
          <ReservationSchedule
            selected={form.schedule}
            onChange={(val) => handleChange('schedule', val)}
            service={form.service}
            date={form.date}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.45 }}
        className={styles.scheduleCol}
          >
        <ReservationForm
          service={form.service}
          date={form.date}
          schedule={form.schedule}
          name={form.name}
          phone={form.phone}
          people={form.people}
          onChange={handleChange}
        />
      </motion.div>

    </div>
  )
}

export default Reservation