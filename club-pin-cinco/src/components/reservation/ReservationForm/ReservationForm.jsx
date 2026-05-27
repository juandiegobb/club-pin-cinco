import styles from './ReservationForm.module.css'

const WHATSAPP_NUMBER = '573148877381'
const STORAGE_KEY = 'pincinco_blocked_slots'
const BLOCK_MINUTES = 10

// Bloquea el horario por servicio — Bolos y Billar son independientes
function blockSlot(service, slot) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    const key = `${service}_${slot}`
    data[key] = Date.now() + BLOCK_MINUTES * 60 * 1000
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    console.error('Error guardando bloqueo')
  }
}

function ReservationForm({ service, date, schedule, name, phone, people, onChange }) {

  function buildWhatsAppMessage() {
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'
    return encodeURIComponent(
      `Hola! Quiero apartar un turno:\n` +
      `• Servicio: ${service || 'No seleccionado'}\n` +
      `• Fecha: ${dateStr}\n` +
      `• Horario: ${schedule || 'No seleccionado'}\n` +
      `• Nombre: ${name}\n` +
      `• Celular: ${phone}\n` +
      `• Personas: ${people}`
    )
  }

  function handleSubmit() {
    if (!name || !phone || !people) {
      alert('Por favor completa todos los campos.')
      return
    }
    if (!schedule) {
      alert('Por favor selecciona un horario.')
      return
    }
    if (!date) {
      alert('Por favor selecciona una fecha.')
      return
    }
    // Bloquear horario por servicio al enviar
    blockSlot(service, schedule)
    const msg = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>4. Nombre completo</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Escribe tu nombre"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>5. Número de celular</span>
          <input
            className={styles.input}
            type="tel"
            placeholder="Ej. 320 240 7517"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>6. Cantidad de personas</span>
          <input
            className={styles.input}
            type="number"
            placeholder="Ej. 4"
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
          Tu turno será asignado según la disponibilidad del establecimiento.
          La hora seleccionada es aproximada y puede variar.
        </p>
      </div>

      <button className={styles.button} onClick={handleSubmit} type="button">
        Solicita tu turno
      </button>

      <p className={styles.hint}>
        Te redirigimos a WhatsApp para confirmar tu solicitud
      </p>
    </div>
  )
}

export default ReservationForm