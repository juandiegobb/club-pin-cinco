import { useEffect, useState } from 'react'
import { useChat } from '../../../hooks/useChat'
import styles from './TurnToast.module.css'

function TurnToast() {
  const { turnNotification, setTurnNotification } = useChat()

  if (!turnNotification) return null

  const { service, date, schedule, name, people } = turnNotification

  return (
    <div className={styles.toastContainer} role="alert" aria-live="assertive">
      <div className={styles.toast}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div>
              <h4 className={styles.title}>¡Turno Apartado!</h4>
              <p className={styles.subtitle}>Recibirás una respuesta en breve</p>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setTurnNotification(null)}
            type="button"
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Cliente:</span>
            <span className={styles.value}>{name}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Servicio:</span>
            <span className={styles.value}>{service === 'bolos' ? '🎳 Bolos' : '🎱 Billar'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Fecha:</span>
            <span className={styles.value}>{date}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Horario:</span>
            <span className={styles.value}>{schedule}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Personas:</span>
            <span className={styles.value}>{people}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.whatsappNote}>
            🟢 Tu solicitud de turno está registrada de forma segura en nuestro sistema.
          </p>
          <button
            className={styles.acceptBtn}
            onClick={() => setTurnNotification(null)}
            type="button"
          >
            Entendido, ¡gracias!
          </button>
        </div>
      </div>
    </div>
  )
}

export default TurnToast
