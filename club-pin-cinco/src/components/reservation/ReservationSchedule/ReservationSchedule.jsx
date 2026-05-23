// Lista de horarios disponibles para seleccionar
import styles from './ReservationSchedule.module.css'

// Horarios fijos del establecimiento
const slots = [
  '1:00 p.m - 2:00 p.m',
  '2:00 p.m - 3:00 p.m',
  '3:00 p.m - 4:00 p.m',
  '4:00 p.m - 5:00 p.m',
]

function ReservationSchedule({ selected, onChange }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>3. Elige tu horario</p>

      {/* Lista de botones de horario */}
      <div className={styles.list}>
        {slots.map((slot) => (
          <button
            key={slot}
            className={`${styles.slot} ${selected === slot ? styles.slotActive : ''}`}
            onClick={() => onChange(slot)}
            type="button"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReservationSchedule