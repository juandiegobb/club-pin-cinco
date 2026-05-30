// Selector del servicio: Bolos o Billar
import { useLanguage } from '../../../context/LanguageContext'
import styles from './ReservationService.module.css'

// Opciones disponibles para reservar (valores internos)
const services = ['Bolos', 'Billar']

function ReservationService({ selected, onChange }) {
  const { t } = useLanguage()

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{t('step1')}</p>

      {/* Botones de selección de servicio */}
      <div className={styles.options}>
        {services.map((service) => (
          <button
            key={service}
            className={`${styles.option} ${selected === service ? styles.optionActive : ''}`}
            onClick={() => onChange(service)}
            type="button"
          >
            {service === 'Bolos' ? t('bolosLabel') : t('billarLabel')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReservationService