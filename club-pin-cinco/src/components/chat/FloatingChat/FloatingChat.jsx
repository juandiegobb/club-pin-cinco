import { useState, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatWindow from '../ChatWindow/ChatWindow'
import styles from './FloatingChat.module.css'

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef(null)

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      btnRef.current?.focus()
    }, 0)
  }

  return (
    <>
      {isOpen && <ChatWindow onClose={handleClose} />}
      <button
        ref={btnRef}
        className={styles.btn}
        type="button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MessageCircle size={28} />
      </button>
    </>
  )
}

export default FloatingChat