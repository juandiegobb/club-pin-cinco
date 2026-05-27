import { useState, useEffect } from 'react'
import styles from './ReservationSchedule.module.css'

const slots = [
  '1:00 p.m - 2:00 p.m',
  '2:00 p.m - 3:00 p.m',
  '3:00 p.m - 4:00 p.m',
  '4:00 p.m - 5:00 p.m',
]

const STORAGE_KEY = 'pincinco_blocked_slots'

function getBlockedSlots(service) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    const now = Date.now()
    const valid = {}
    Object.entries(data).forEach(([key, expiresAt]) => {
      // Solo los del servicio actual
      if (key.startsWith(service + '_') && expiresAt > now) {
        valid[key] = expiresAt
      }
    })
    return valid
  } catch {
    return {}
  }
}

function ReservationSchedule({ selected, onChange, service }) {
  const [blockedSlots, setBlockedSlots] = useState(() => getBlockedSlots(service))

  useEffect(() => {
    setBlockedSlots(getBlockedSlots(service))
    const interval = setInterval(() => {
      setBlockedSlots(getBlockedSlots(service))
    }, 10000)
    return () => clearInterval(interval)
  }, [service])

  function timeLeft(slot) {
    const key = `${service}_${slot}`
    if (!blockedSlots[key]) return null
    return Math.ceil((blockedSlots[key] - Date.now()) / 60000)
  }

  function handleSelect(slot) {
    const key = `${service}_${slot}`
    if (blockedSlots[key]) return
    onChange(slot)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>3. Elige tu horario</p>
      <div className={styles.list}>
        {slots.map((slot) => {
          const key = `${service}_${slot}`
          const isBlocked = !!blockedSlots[key]
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
              {isBlocked && (
                <span className={styles.slotBlockedTag}>
                  🔒 No disponible · {mins} min restantes
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ReservationSchedule