import { useState } from 'react'
import { motion } from 'framer-motion'
import ReservationService from '../components/reservation/ReservationService/ReservationService'
import ReservationCalendar from '../components/reservation/ReservationCalendar/ReservationCalendar'
import ReservationSchedule from '../components/reservation/ReservationSchedule/ReservationSchedule'
import ReservationForm from '../components/reservation/ReservationForm/ReservationForm'
import styles from './Reservation.module.css'

function Reservation() {
  // Estado global de la reserva — todo en un solo objeto
  const [form, setForm] = useState({
    service: 'Bolos',   // servicio seleccionado por defecto
    date: null,          // fecha elegida en el calendario
    schedule: '',        // horario elegido
    name: '',            // nombre del cliente
    phone: '',           // celular
    people: '',          // cantidad de personas
  })

  // Función genérica para actualizar cualquier campo del estado
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const springTransition = { type: 'spring', stiffness: 75, damping: 16 }

  return (
    <div className={styles.page}>

      {/* Título principal */}
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, scale: 0.9, y: -25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springTransition}
      >
        Aparta tu Turno
      </motion.h1>

      {/* Paso 1 — elegir servicio */}
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

      {/* Pasos 2 y 3 — calendario y horarios lado a lado */}
      <div className={styles.row}>
        <motion.div 
          className={styles.calendarCol}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.25 }}
        >
          <p className={styles.stepLabel}>2. Elige la fecha</p>
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
          <ReservationSchedule
            selected={form.schedule}
            onChange={(val) => handleChange('schedule', val)}
          />
        </motion.div>
      </div>

      {/* Pasos 4, 5, 6 — formulario y envío */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.45 }}
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
