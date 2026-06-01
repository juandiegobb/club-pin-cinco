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
    if (!name || !phone || !people) {
      alert(t('alertCompleteFields'))
      return
    }
    if (!schedule) {
      alert(t('alertSelectSchedule'))
      return
    }
    if (!date) {
      alert(t('alertSelectDate'))
      return
    }

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
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step4')}</span>
          <input
            className={styles.input}
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
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step5')}</span>
          <input
            className={styles.input}
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
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('step6')}</span>
          <input
            className={styles.input}
            type="number"
            placeholder={t('placeholderPeople')}
            min={1}
            max={20}
            value={people}
            onChange={(e) => onChange('people', e.target.value)}
          />
        </label>
      </div>

      <div className={styles.notice}>
        <span className={styles.noticeIcon}>⚠</span>
        <p className={styles.noticeText}>
          {t('warningNotice')}
        </p>
      </div>

      <button className={styles.button} onClick={handleSubmit} type="button">
        {t('reserveBtn')}
      </button>

      <p className={styles.hint}>
        {t('whatsappBtnNote')}
      </p>
    </div>
  )
}

export default ReservationForm
