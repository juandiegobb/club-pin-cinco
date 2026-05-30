import { useState, useEffect } from 'react'
import styles from './ReservationSchedule.module.css'

const slots = [
  '1:00 p.m - 2:00 p.m',
  '2:00 p.m - 3:00 p.m',
  '3:00 p.m - 4:00 p.m',
  '4:00 p.m - 5:00 p.m',
]

const STORAGE_KEY = 'pincinco_blocked_slots'

function getBlockedSlots(service, date) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    const now = Date.now()
    const valid = {}
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'

    Object.entries(data).forEach(([key, expiresAt]) => {
      // Clave es: service_dateStr_slot
      const prefix = `${service}_${dateStr}_`
      if (key.startsWith(prefix) && expiresAt > now) {
        valid[key] = expiresAt
      }
    })
    return valid
  } catch {
    return {}
  }
}

function ReservationSchedule({ selected, onChange, service, date }) {
  const [blockedSlots, setBlockedSlots] = useState(() => getBlockedSlots(service, date))
  const [approvedServerSlots, setApprovedServerSlots] = useState([]) // Slots aprobados en el back

  // Formatear fecha seleccionada a string igual al guardado en el backend
  const dateStr = date
    ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  // Cargar turnos aprobados desde la API REST del servidor
  useEffect(() => {
    if (!dateStr) {
      setApprovedServerSlots([])
      return
    }

    async function fetchApprovedTurns() {
      try {
        const res = await fetch('http://localhost:3001/api/turns')
        if (!res.ok) return
        const turns = await res.json()

        // Filtrar turnos del back que estén aprobados y coincidan con el servicio y la fecha
        const approved = turns.filter((turn) => {
          const isSameService = turn.service.toLowerCase() === service.toLowerCase()
          const isSameDate = turn.date.toLowerCase() === dateStr.toLowerCase()
          const isApproved = turn.status === 'approved'
          return isSameService && isSameDate && isApproved
        })

        // Guardar la lista de horarios (schedule) que están ocupados en el servidor
        setApprovedServerSlots(approved.map(t => t.schedule))
      } catch (err) {
        console.warn('[Schedule] Error fetching server blocked slots:', err.message)
      }
    }

    fetchApprovedTurns()

    // Encuesta cada 15 segundos para mantener actualizado si otro usuario agendó en tiempo real
    const interval = setInterval(fetchApprovedTurns, 15000)
    return () => clearInterval(interval)
  }, [service, dateStr])

  // Bloqueos de localStorage
  useEffect(() => {
    setBlockedSlots(getBlockedSlots(service, date))
    const interval = setInterval(() => {
      setBlockedSlots(getBlockedSlots(service, date))
    }, 10000)
    return () => clearInterval(interval)
  }, [service, date])

  function timeLeft(slot) {
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'
    const key = `${service}_${dateStr}_${slot}`
    if (!blockedSlots[key]) return null
    return Math.ceil((blockedSlots[key] - Date.now()) / 60000)
  }

  function handleSelect(slot) {
    const dateStr = date
      ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'No seleccionada'
    const key = `${service}_${dateStr}_${slot}`
    const isLocalBlocked = !!blockedSlots[key]
    const isServerBlocked = approvedServerSlots.includes(slot)
    if (isLocalBlocked || isServerBlocked) return
    onChange(slot)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>3. Elige tu horario</p>
      {!date ? (
        <p className={styles.selectDatePrompt}>⚠️ Por favor selecciona una fecha primero para ver los horarios disponibles.</p>
      ) : (
        <div className={styles.list}>
          {slots.map((slot) => {
            const dateStr = date
              ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              : 'No seleccionada'
            const key = `${service}_${dateStr}_${slot}`
            const isLocalBlocked = !!blockedSlots[key]
            const isServerBlocked = approvedServerSlots.includes(slot)
            const isBlocked = isLocalBlocked || isServerBlocked
            const isSelected = selected === slot
            const mins = timeLeft(slot)

            return (
              <button
                key={slot}
                className={`${styles.slot} ${isSelected ? styles.slotActive : ''} ${isBlocked ? styles.slotBlocked : ''}`}
                onClick={() => handleSelect(slot)}
                type="button"
                disabled={isBlocked}
              >
                <span className={styles.slotTime}>{slot}</span>
                {isServerBlocked && (
                  <span className={styles.slotBlockedTag}>
                    🔒 Ocupado · Reservado
                  </span>
                )}
                {isLocalBlocked && !isServerBlocked && (
                  <span className={styles.slotBlockedTag}>
                    🔒 Bloqueado temporalmente · {mins} min restantes
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ReservationSchedule