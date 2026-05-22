import { useState } from 'react'
import ChatBubble from './ChatBubble'

function ChatWindow({ onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, author: 'club', text: 'Hola, somos Club Deportivo Pin Cinco.' },
  ])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!message.trim()) return

    setMessages((current) => [
      ...current,
      { id: Date.now(), author: 'guest', text: message.trim() },
    ])
    setMessage('')
  }

  return (
    <aside className="chat-window" aria-label="Chat de contacto">
      <div className="chat-window__header">
        <strong>Club Pin Cinco</strong>
        <button type="button" onClick={onClose} aria-label="Cerrar chat">
          ×
        </button>
      </div>

      <div className="chat-window__messages">
        {messages.map((item) => (
          <ChatBubble key={item.id} author={item.author}>
            {item.text}
          </ChatBubble>
        ))}
      </div>

      <form className="chat-window__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </aside>
  )
}

export default ChatWindow
