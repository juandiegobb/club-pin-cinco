import { useState } from 'react'
import ChatWindow from '../ChatWindow/ChatWindow'
import styles from './FloatingChat.module.css'

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      <button
        className={styles.btn}
        type="button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ✉
      </button>
    </>
  )
}

export default FloatingChat