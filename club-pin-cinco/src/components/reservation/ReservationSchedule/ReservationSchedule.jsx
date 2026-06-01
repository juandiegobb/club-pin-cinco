import { useState, useEffect } from 'react'
import { useChat } from '../../../hooks/useChat'
import styles from './ReservationSchedule.module.css'

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001'
  }
  return 'https://club-pin-cinco.onrender.com'
}
const API_URL = getApiUrl()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Horarios según el día de la semana
// 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SLOTS_BY_DAY = {
  // Lunes a jueves: 11am - 11pm
  1: ['11:00 a.m - 12:00 p.m', '12:00 p.m - 1:00 p.m', '1:00 p.m - 2:00 p.m', '2:00 p.m - 3:00 p.m', '3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m', '10:00 p.m - 11:00 p.m'],
  2: ['11:00 a.m - 12:00 p.m', '12:00 p.m - 1:00 p.m', '1:00 p.m - 2:00 p.m', '2:00 p.m - 3:00 p.m', '3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m', '10:00 p.m - 11:00 p.m'],
  3: ['11:00 a.m - 12:00 p.m', '12:00 p.m - 1:00 p.m', '1:00 p.m - 2:00 p.m', '2:00 p.m - 3:00 p.m', '3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m', '10:00 p.m - 11:00 p.m'],
  4: ['11:00 a.m - 12:00 p.m', '12:00 p.m - 1:00 p.m', '1:00 p.m - 2:00 p.m', '2:00 p.m - 3:00 p.m', '3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m', '10:00 p.m - 11:00 p.m'],
  // Viernes: 11am - 1am
  5: ['11:00 a.m - 12:00 p.m', '12:00 p.m - 1:00 p.m', '1:00 p.m - 2:00 p.m', '2:00 p.m - 3:00 p.m', '3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m', '10:00 p.m - 11:00 p.m', '11:00 p.m - 12:00 a.m', '12:00 a.m - 1:00 a.m'],
  // Sábado: 2:30pm - 2am
  6: ['2:30 p.m - 3:30 p.m', '3:30 p.m - 4:30 p.m', '4:30 p.m - 5:30 p.m', '5:30 p.m - 6:30 p.m', '6:30 p.m - 7:30 p.m', '7:30 p.m - 8:30 p.m', '8:30 p.m - 9:30 p.m', '9:30 p.m - 10:30 p.m', '10:30 p.m - 11:30 p.m', '11:30 p.m - 12:30 a.m', '12:30 a.m - 1:30 a.m'],
  // Domingo: 3pm - 10pm
  0: ['3:00 p.m - 4:00 p.m', '4:00 p.m - 5:00 p.m', '5:00 p.m - 6:00 p.m', '6:00 p.m - 7:00 p.m', '7:00 p.m - 8:00 p.m', '8:00 p.m - 9:00 p.m', '9:00 p.m - 10:00 p.m'],
}

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
  const { turns: wsTurns = [] } = useChat()
  const [blockedSlots, setBlockedSlots] = useState(() => getBlockedSlots(service, date))
  const [polledTurns, setPolledTurns] = useState([])

  const dateStr = date
    ? date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  // Obtener los slots del día seleccionado
  const dayOfWeek = date ? date.getDay() : null
  const slots = dayOfWeek !== null ? (SLOTS_BY_DAY[dayOfWeek] || []) : []

  // Cargar turnos desde el servidor vía HTTP (polling de respaldo)
  useEffect(() => {
    if (!dateStr) {
      setPolledTurns([])
      return
    }
    async function fetchTurns() {
      try {
        const res = await fetch(`${API_URL}/api/turns`)
        if (!res.ok) return
        const turnsData = await res.json()
        setPolledTurns(turnsData || [])
      } catch (err) {
        console.warn('[Schedule] Error polling server turns:', err.message)
      }
    }
    fetchTurns()
    const interval = setInterval(fetchTurns, 15000)
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

  // Mezclar ambas fuentes de datos (WebSocket tiempo real + HTTP de respaldo)
  const activeTurnsList = wsTurns.length > 0 ? wsTurns : polledTurns

  // Mapear los slots del servidor con su respectivo estado activo
  const serverSlotsMap = {}
  activeTurnsList.forEach((turn) => {
    const isSameService = turn.service.toLowerCase() === service.toLowerCase()
    const isSameDate = turn.date.toLowerCase() === dateStr.toLowerCase()
    const isActive = turn.status === 'pending' || turn.status === 'approved'
    if (isSameService && isSameDate && isActive) {
      serverSlotsMap[turn.schedule] = turn.status
    }
  })

  function timeLeft(slot) {
    const key = `${service}_${dateStr}_${slot}`
    if (!blockedSlots[key]) return null
    return Math.ceil((blockedSlots[key] - Date.now()) / 60000)
  }

  function handleSelect(slot) {
    const key = `${service}_${dateStr}_${slot}`
    if (blockedSlots[key] || serverSlotsMap[slot]) return
    onChange(slot)
  }

  // Si no hay fecha seleccionada
  if (!date) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.label}>3. Elige tu horario</p>
        <p className={styles.selectDatePrompt}>
          📅 Primero selecciona una fecha en el calendario para ver los horarios disponibles.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>3. Elige tu horario</p>

      {slots.length === 0 ? (
        <p className={styles.selectDatePrompt}>No hay horarios disponibles para este día.</p>
      ) : (
        <div className={styles.list}>
          {slots.map((slot) => {
            const key = `${service}_${dateStr}_${slot}`
            const isBlockedLocal = !!blockedSlots[key]
            const serverStatus = serverSlotsMap[slot]
            const isBlockedServer = !!serverStatus
            const isBlocked = isBlockedLocal || isBlockedServer
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
                {isBlockedLocal && mins && (
                  <span className={styles.slotBlockedTag}>
                    🔒 No disponible · {mins} min restantes
                  </span>
                )}
                {isBlockedServer && !isBlockedLocal && (
                  <span className={styles.slotBlockedTag}>
                    {serverStatus === 'approved' ? '🔒 Ocupado' : '🔒 Reservado (Pendiente)'}
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