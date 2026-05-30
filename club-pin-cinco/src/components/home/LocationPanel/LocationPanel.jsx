import { motion } from 'framer-motion'
import { useLanguage } from '../../../context/LanguageContext'
import styles from './LocationPanel.module.css'

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Club+Deportivo+Pin+Cinco+Tunja+Colombia'

function LocationPanel() {
  const { t, language } = useLanguage()
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 }

  return (
    <motion.section
      className={styles.location}
      aria-labelledby="home-location-title"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={springTransition}
    >
      <motion.h2
        id="home-location-title"
        className={styles.title}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
      >
        {t('locationTitle')}
      </motion.h2>

      {/* Enlace a Google Maps */}
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'es' ? 'Ver ubicación en Google Maps' : 'View location on Google Maps'}
        className={styles.mapLink}
      >
        <motion.div
          className={styles.map}
          aria-label={language === 'es' ? 'Mapa referencial de ubicación' : 'Reference map of location'}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          <span className={`${styles.road} ${styles.roadMain}`} />
          <span className={`${styles.road} ${styles.roadSide}`} />
          <span className={styles.pin} />
          <strong className={styles.label}>
            Club Deportivo Pin Cinco
          </strong>
          <span className={styles.mapHint}>
            {t('mapsLink')}
          </span>
        </motion.div>
      </a>

      <motion.p
        className={styles.address}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t('address')}
      </motion.p>
    </motion.section>
  )
}

export default LocationPanel