import { useState, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatWindow from '../ChatWindow/ChatWindow'
import { useLanguage } from '../../../context/LanguageContext'
import styles from './FloatingChat.module.css'

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef(null)
  const { language } = useLanguage()

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      btnRef.current?.focus()
    }, 0)
  }

  const getAriaLabel = () => {
    if (language === 'es') {
      return isOpen ? 'Cerrar chat' : 'Abrir chat'
    } else {
      return isOpen ? 'Close chat' : 'Open chat'
    }
  }

  return (
    <>
      {isOpen && <ChatWindow onClose={handleClose} />}
      <button
        ref={btnRef}
        className={styles.btn}
        type="button"
        aria-label={getAriaLabel()}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MessageCircle size={28} />
      </button>
    </>
  )
}

export default FloatingChat