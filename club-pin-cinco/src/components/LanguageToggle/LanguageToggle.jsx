import { useLanguage } from '../../context/LanguageContext'
import styles from './LanguageToggle.module.css'

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      className={styles.toggle}
      onClick={toggleLanguage}
      type="button"
      aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
    >
      <span className={`${styles.label} ${language === 'es' ? styles.active : ''}`}>
        ES
      </span>
      <div className={styles.switchTrack}>
        <div className={`${styles.switchKnob} ${language === 'en' ? styles.knobRight : ''}`} />
      </div>
      <span className={`${styles.label} ${language === 'en' ? styles.active : ''}`}>
        EN
      </span>
    </button>
  )
}

export default LanguageToggle
