import { useState, useEffect } from 'react'
import styles from './ReservationSchedule.module.css'

const slots = [
  '1:00 p.m - 2:00 p.m',
  '2:00 p.m - 3:00 p.m',
  '3:00 p.m - 4:00 p.m',
  '4:00 p.m - 5:00 p.m',
]

const STORAGE_KEY = 'pincinco_blocked_slots'

function getBlockedSlots() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    const now = Date.now()
    const valid = {}
    Object.entries(data).forEach(([slot, expiresAt]) => {
      if (expiresAt > now) valid[slot] = expiresAt
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
    return valid
  } catch {
    return {}
  }
}

function ReservationSchedule({ selected, onChange }) {
  const [blockedSlots, setBlockedSlots] = useState(() => getBlockedSlots())

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockedSlots(getBlockedSlots())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  function timeLeft(slot) {
    if (!blockedSlots[slot]) return null
    return Math.ceil((blockedSlots[slot] - Date.now()) / 60000)
  }

  function handleSelect(slot) {
    if (blockedSlots[slot]) return
    onChange(slot)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>3. Elige tu horario</p>
      <div className={styles.list}>
        {slots.map((slot) => {
          const isBlocked = !!blockedSlots[slot]
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
                  🔒 No disponible
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