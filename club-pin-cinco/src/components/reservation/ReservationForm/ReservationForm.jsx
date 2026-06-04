import { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import styles from './ReservationForm.module.css'
import { useChat } from '../../../hooks/useChat'

const WHATSAPP_NUMBER = '573202967582'
const STORAGE_KEY = 'pincinco_blocked_slots'
const BLOCK_MINUTES = 30

// Bloquea el horario por servicio y fecha — Bolos y Billar son independientes y específicos por fecha
function blockSlot(service, date, slot) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'
    const key = `${service}_${dateStr}_${slot}`
    data[key] = Date.now() + BLOCK_MINUTES * 60 * 1000
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    console.error('Error guardando bloqueo')
  }
}

function ReservationForm({ service, date, schedule, name, phone, people, onChange }) {
  const { t, language } = useLanguage()
  const { sendTurnRequest, isConnected } = useChat()
  const [validationError, setValidationError] = useState('')
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function buildWhatsAppMessage() {
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'

    if (language === 'es') {
      return encodeURIComponent(
        `Hola! Quiero apartar un turno:\n` +
        `• Servicio: ${service || 'No seleccionado'}\n` +
        `• Fecha: ${dateStr}\n` +
        `• Horario: ${schedule || 'No seleccionado'}\n` +
        `• Nombre: ${name}\n` +
        `• Celular: ${phone}\n` +
        `• Personas: ${people}`
      )
    } else {
      const displayService = service === 'Bolos' ? 'Bowling' : 'Billiards'
      return encodeURIComponent(
        `Hello! I want to book a turn:\n` +
        `• Service: ${displayService}\n` +
        `• Date: ${dateStr}\n` +
        `• Schedule: ${schedule || 'Not selected'}\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Guests: ${people}`
      )
    }
  }

  function handleSubmit() {
    setValidationError('')
    setSubmittedWithErrors(false)

    if (!name || !phone || !people) {
      setValidationError(t('alertCompleteFields'))
      setSubmittedWithErrors(true)
      return
    }
    if (!date) {
      setValidationError(t('alertSelectDate'))
      setSubmittedWithErrors(true)
      return
    }
    if (!schedule) {
      setValidationError(t('alertSelectSchedule'))
      setSubmittedWithErrors(true)
      return
    }

    setIsLoading(true)

    // 1. Bloquear horario por servicio y fecha al enviar
    blockSlot(service, date, schedule)

    // 2. Canal WhatsApp — comunicación directa con el establecimiento
    const msg = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')

    // 3. Canal WebSocket — registra el turno en el panel admin
    //    y dispara el mensaje automático de confirmación en el chat
    if (isConnected) {
      const dateStr = date
        ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : 'No seleccionada'

      sendTurnRequest({
        service,
        date: dateStr,
        schedule,
        name,
        phone,
        people,
      })
    }

    // Simula procesamiento y previene doble click veloz deshabilitando el botón por 1.5s
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step4')}</span>
          <input
            className={`${styles.input} ${submittedWithErrors && !name ? styles.inputError : ''}`}
            type="text"
            placeholder={t('placeholderName')}
            value={name}
            onChange={(e) => {
              const val = e.target.value
              // No permitir números ni caracteres comunes de inyección de código (<, >, /, \)
              const sanitized = val
                .replace(/[0-9]/g, '')
                .replace(/[<>\/\\]/g, '')
              
              if (sanitized.length <= 50) {
                onChange('name', sanitized)
              }
              // Quitar error si el usuario empieza a escribir de nuevo
              if (validationError && sanitized) {
                setValidationError('')
              }
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step5')}</span>
          <input
            className={`${styles.input} ${submittedWithErrors && !phone ? styles.inputError : ''}`}
            type="tel"
            placeholder={t('placeholderPhone')}
            value={phone}
            onChange={(e) => {
              const val = e.target.value
              // Permitir únicamente números enteros y limitar a un máximo de 10 dígitos
              const onlyNums = val.replace(/\D/g, '')
              if (onlyNums.length <= 10) {
                onChange('phone', onlyNums)
              }
              // Quitar error si el usuario empieza a escribir de nuevo
              if (validationError && onlyNums) {
                setValidationError('')
              }
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step6')}</span>
          <input
            className={`${styles.input} ${submittedWithErrors && !people ? styles.inputError : ''}`}
            type="number"
            placeholder={t('placeholderPeople')}
            min={1}
            max={20}
            value={people}
            onChange={(e) => {
              onChange('people', e.target.value)
              // Quitar error al cambiar
              if (validationError && e.target.value) {
                setValidationError('')
              }
            }}
          />
        </label>
      </div>

      <div className={styles.notice}>
        <span className={styles.noticeIcon}>⚠</span>
        <p className={styles.noticeText}>
          {t('warningNotice')}
        </p>
      </div>

      {validationError && (
        <div className={styles.errorContainer} role="alert">
          <span className={styles.errorIcon}>❌</span>
          <p className={styles.errorText}>{validationError}</p>
        </div>
      )}

      <button
        className={`${styles.button} ${isLoading ? styles.buttonLoading : ''}`}
        onClick={handleSubmit}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (language === 'es' ? 'Procesando...' : 'Processing...') : t('reserveBtn')}
      </button>

      <p className={styles.hint}>
        {t('whatsappBtnNote')}
      </p>
    </div>
  )
}

export default ReservationForm
