// Calendario interactivo para elegir la fecha
// Navegación por mes y selección de día
import { useState } from 'react'
import styles from './ReservationCalendar.module.css'

// Nombres de días y meses en español
const DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// Devuelve los días del mes incluyendo vacíos al inicio para alinear con el día correcto
function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  // Ajuste: semana empieza en lunes (0=lun ... 6=dom)
  const offset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function ReservationCalendar({ selected, onChange }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const cells = buildCalendar(viewYear, viewMonth)

  // Ir al mes anterior
  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  // Ir al mes siguiente
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Verifica si un día es el seleccionado actualmente
  function isSelected(day) {
    if (!selected || !day) return false
    return (
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    )
  }

  // Verifica si un día ya pasó (no se puede seleccionar)
  function isPast(day) {
    if (!day) return false
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  return (
    <div className={styles.calendar}>
      {/* Encabezado con mes/año y flechas de navegación */}
      <div className={styles.header}>
        <button className={styles.arrow} onClick={prevMonth} type="button" aria-label="Mes anterior">‹</button>
        <span className={styles.monthLabel}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button className={styles.arrow} onClick={nextMonth} type="button" aria-label="Mes siguiente">›</button>
      </div>

      {/* Nombres de los días de la semana */}
      <div className={styles.grid}>
        {DAYS.map((d) => (
          <span key={d} className={styles.dayName}>{d}</span>
        ))}

        {/* Celdas de días */}
        {cells.map((day, i) => (
          <button
            key={i}
            className={`${styles.day} ${!day ? styles.dayEmpty : ''} ${isSelected(day) ? styles.daySelected : ''} ${isPast(day) ? styles.dayPast : ''}`}
            onClick={() => day && !isPast(day) && onChange(new Date(viewYear, viewMonth, day))}
            type="button"
            disabled={!day || isPast(day)}
            aria-label={day ? `${day} de ${MONTHS[viewMonth]}` : undefined}
          >
            {day || ''}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReservationCalendar