// Página de reserva — une todos los componentes
// El estado se maneja aquí y se pasa a cada componente
import { useState } from 'react'
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

  return (
    <div className={styles.page}>

      {/* Título principal */}
      <h1 className={styles.title}>Aparta tu Turno</h1>

      {/* Paso 1 — elegir servicio */}
      <ReservationService
        selected={form.service}
        onChange={(val) => handleChange('service', val)}
      />

      {/* Pasos 2 y 3 — calendario y horarios lado a lado */}
      <div className={styles.row}>
        <div className={styles.calendarCol}>
          <p className={styles.stepLabel}>2. Elige la fecha</p>
          <ReservationCalendar
            selected={form.date}
            onChange={(val) => handleChange('date', val)}
          />
        </div>

        <ReservationSchedule
          selected={form.schedule}
          onChange={(val) => handleChange('schedule', val)}
        />
      </div>

      {/* Pasos 4, 5, 6 — formulario y envío */}
      <ReservationForm
        service={form.service}
        date={form.date}
        schedule={form.schedule}
        name={form.name}
        phone={form.phone}
        people={form.people}
        onChange={handleChange}
      />

    </div>
  )
}

export default Reservation
