import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import { useChat } from '../../../hooks/useChat'
import styles from './TurnToast.module.css'

function TurnToast() {
  const { t, language } = useLanguage()
  const { turnNotification, setTurnNotification } = useChat()

  if (!turnNotification) return null

  const { service, date, schedule, name, people } = turnNotification

  return (
    <div className={styles.toastContainer} role="alert" aria-live="assertive">
      <div className={styles.toast}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div>
              <h4 className={styles.title}>{t('toastTitle')}</h4>
              <p className={styles.subtitle}>{t('toastSubtitle')}</p>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setTurnNotification(null)}
            type="button"
            aria-label={language === 'es' ? 'Cerrar notificación' : 'Close notification'}
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t('labelClient')}</span>
            <span className={styles.value}>{name}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t('labelService')}</span>
            <span className={styles.value}>
              {service && service.toLowerCase() === 'bolos' ? t('bolosServiceTag') : t('billarServiceTag')}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t('labelDate')}</span>
            <span className={styles.value}>{date}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t('labelSchedule')}</span>
            <span className={styles.value}>{schedule}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>{t('labelPeople')}</span>
            <span className={styles.value}>{people}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.whatsappNote}>
            {t('toastBadge')}
          </p>
          <button
            className={styles.acceptBtn}
            onClick={() => setTurnNotification(null)}
            type="button"
          >
            {t('toastAcceptBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TurnToast
