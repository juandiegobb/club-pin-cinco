import { useState } from 'react'
import ChatWindow from './ChatWindow'

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      <button
        className="floating-chat"
        type="button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setIsOpen((current) => !current)}
      >
        ✉
      </button>
    </>
  )
}

export default FloatingChat
