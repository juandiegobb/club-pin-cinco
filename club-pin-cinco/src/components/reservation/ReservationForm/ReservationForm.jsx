// Formulario con nombre, celular y cantidad de personas
// Al enviar redirige a WhatsApp con los datos
import styles from './ReservationForm.module.css'

// Número de WhatsApp del establecimiento (sin +)
const WHATSAPP_NUMBER = '573202967582'

function ReservationForm({ service, date, schedule, name, phone, people, onChange }) {

  // Construye el mensaje de WhatsApp con todos los datos del turno
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
    // Validación básica antes de abrir WhatsApp
    if (!name || !phone || !people) {
      alert('Por favor completa todos los campos.')
      return
    }
    const msg = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div className={styles.wrapper}>

      {/* Campos del formulario */}
      <div className={styles.fields}>

        {/* Campo nombre */}
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

        {/* Campo celular */}
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

        {/* Campo cantidad de personas */}
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

      {/* Aviso de disponibilidad */}
      <div className={styles.notice}>
        <span className={styles.noticeIcon}>⚠</span>
        <p className={styles.noticeText}>
          Tu turno será asignado según la disponibilidad del establecimiento.
          La hora seleccionada es aproximada y puede variar.
        </p>
      </div>

      {/* Botón principal */}
      <button className={styles.button} onClick={handleSubmit} type="button">
        Solicita tu turno
      </button>

      {/* Texto informativo debajo del botón */}
      <p className={styles.hint}>
        Te redirigimos a WhatsApp para confirmar tu solicitud
      </p>

    </div>
  )
}

export default ReservationForm