// Selector del servicio: Bolos o Billar
import styles from './ReservationService.module.css'

// Opciones disponibles para reservar
const services = ['Bolos', 'Billar']

function ReservationService({ selected, onChange }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>1. Aparta tu turno</p>

      {/* Botones de selección de servicio */}
      <div className={styles.options}>
        {services.map((service) => (
          <button
            key={service}
            className={`${styles.option} ${selected === service ? styles.optionActive : ''}`}
            onClick={() => onChange(service)}
            type="button"
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReservationService